import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, FormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { } from '../services/survey.service';
import { Survey } from '../models/survey';
import { NewSurveyService } from '../services/new-survey.service';
import { DdlServicesService } from '../services/ddl-services.service';
@Component({
  selector: 'app-new-survey',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule],
  templateUrl: './new-survey.component.html',
  styleUrl: './new-survey.component.scss'
})
export class NewSurveyComponent {

  toastMessage: string = '';
  toastType: 'success' | 'error' = 'success';
  showToast: boolean = false;
  locations: any;
  departments: any;

  surveyForm!: FormGroup;

  // locations = ['New York', 'London', 'Tokyo'];
  //departments = ['HR', 'IT', 'Finance'];

  constructor(
    private fb: FormBuilder,
    private surveyService: NewSurveyService,
    private ddlServicesService: DdlServicesService
  ) {
    this.initForm();
  }

  ngOnInit() {
    this.ddlPlant();
    this.ddlDepartment();
  }

  private initForm(): void {
    this.surveyForm = this.fb.group({
      surveyId: [0],
      surveyName: ['', Validators.required],
      startDate: [''],
      endDate: [''],
      userInstructions: [''],
      confirmationMessage: [''],
      displayMode: [true], // 'single' or 'multiple'
      audience: ['all'], // 'all' or 'custom'
      location: [''],
      department: ['']
    });
  }




  isFieldInvalid(field: string): boolean {
    const control = this.surveyForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  goBack(): void {

  }


  saveSurvey(): void {
    if (this.surveyForm.invalid) {
      this.surveyForm.markAllAsTouched();
      return;
    }

    const formValue = this.surveyForm.value;

    const survey: Survey = {
      surveyId: formValue.surveyId,
      surveyName: formValue.surveyName,
      surveyStart: formValue.startDate ? new Date(formValue.startDate) : null,
      surveyEnd: formValue.endDate ? new Date(formValue.endDate) : null,
      surveyInstruction: formValue.userInstructions,
      surveyConfirmation: formValue.confirmationMessage,
      surveyView: this.surveyForm.value.displayMode, // already boolean
      authView: formValue.audience === 'all' ? 0 : 1,
      plantId: 1, // Assign this dynamically based on logged in user or selected plant
      isExcel: false,
      surveyStatus: true,
      archieve: false,
    };


    if (survey.surveyId && survey.surveyId > 0) {
      this.surveyService.saveSurvey(survey).subscribe({
        next: () => {
          this.toastType = 'success';
          this.toastMessage = 'Plant saved successfully!';
          this.showToast = true;
          setTimeout(() => (this.showToast = false), 1000);
        },
        error: err => console.log("Some error occured")

      });
    } else {
      this.surveyService.saveSurvey(survey).subscribe({
        next: () => {
          this.toastType = 'success';
          this.toastMessage = 'Plant saved successfully!';
          this.showToast = true;
          setTimeout(() => (this.showToast = false), 1000);
        },
        error: err => console.log("Some error occured")
      });
    }
  }

  ddlDepartment() {
    this.ddlServicesService.getDepartmentsList().subscribe(data => {
      this.departments = data
      debugger;
      this.surveyForm.get('department')?.setValue(data[0]); // Optional: set first as default
    });
  }

  ddlPlant() {
    this.ddlServicesService.getPlantList().subscribe(data => {
      this.locations = data;
      this.surveyForm.get('location')?.setValue(data[0])
    });
  }
}
