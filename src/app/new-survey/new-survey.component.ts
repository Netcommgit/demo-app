import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, FormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClient } from '@angular/common/http';
import { } from '../services/survey.service';
import { Survey } from '../models/survey';
import { NewSurveyService } from '../services/new-survey.service';
import { ToastrService } from 'ngx-toastr';
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


  surveyForm!: FormGroup;

  locations = ['New York', 'London', 'Tokyo'];
  departments = ['HR', 'IT', 'Finance'];

  constructor(
    private fb: FormBuilder,
    private surveyService: NewSurveyService,
    private toastr: ToastrService
  ) {
    this.initForm();
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
        error: err => this.toastr.error('Failed to update survey.')

      });
    } else {
      this.surveyService.saveSurvey(survey).subscribe({
        next: () => {
          this.toastType = 'success';
          this.toastMessage = 'Plant saved successfully!';
          this.showToast = true;
          setTimeout(() => (this.showToast = false), 1000);
        },
        error: err => this.toastr.error('Failed to create survey.')
      });
    }
  }
}
