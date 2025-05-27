import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, FormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Survey } from '../models/survey';
import { NewSurveyService } from '../services/new-survey.service';
import { DdlServicesService } from '../services/ddl-services.service';
import { DdlUser } from '../models/ddl-user';
import { QuestionDetails } from '../models/survey';
import { UserDropdown } from '../models/survey';
@Component({
  selector: 'app-new-survey',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, FormsModule],
  templateUrl: './new-survey.component.html',
  styleUrl: './new-survey.component.scss'
})
export class NewSurveyComponent implements OnInit {

  toastMessage: string = '';
  toastType: 'success' | 'error' = 'success';
  showToast: boolean = false;
  locations: any;
  departments: any;
  availableUsers: DdlUser[] = [];
  selectedUsers: DdlUser[] = [];
  includeQuestions: boolean = false;

  selectedAvailableUsers: DdlUser[] = [];
  selectedSelectedUsers: DdlUser[] = [];

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
    this.ddlUser();
  }

  private initForm(): void {
    // this.surveyForm = this.fb.group({
    //   surveyId: [0],
    //   surveyName: ['', Validators.required],
    //   startDate: [''],
    //   endDate: [''],
    //   userInstructions: [''],
    //   confirmationMessage: [''],
    //   displayMode: [true], 
    //   audience: ['all'],
    //   location: [''],
    //   department: [''],
    //   userDropDown: this.buildUserDropDown(),
    //   //questionDetails: this.fb.array([this.buildQuestionDetails()]),
    //     ...(includeQuestions ? { questionDetails: this.fb.array([]) } : {})
    // });

    const formConfig: { [key: string]: any } = {
      surveyId: [0],
      surveyName: ['', Validators.required],
      startDate: [''],
      endDate: [''],
      userInstructions: [''],
      confirmationMessage: [''],
      displayMode: [true],
      audience: ['all'],
      location: [''],
      department: [''],
      userDropDown: this.buildUserDropDown()
    };

    // Add questionDetails only if required
    if (this.includeQuestions) {
      formConfig['questionDetails'] = this.fb.array([]); // or use: [this.buildQuestionDetails()]
    }

    this.surveyForm = this.fb.group(formConfig);

  }


  private buildUserDropDown(): FormGroup {
    return this.fb.group({
      userList: [[]],
      selectedUserList: [[]]
    });
  }

  private buildQuestionDetails(): FormGroup {
    return this.fb.group({
      questionText: ['', Validators.required],
      optionType: ['1'],
      newOption: ['']

    });
  }




  saveSurvey(): void {
    debugger
    if (this.surveyForm.invalid) {
      this.surveyForm.markAllAsTouched();

      Object.keys(this.surveyForm.controls).forEach(key => {
        const control = this.surveyForm.get(key);
        if (control?.invalid) {
          console.error(`Invalid control: ${key}`, control.errors);
        }
      });

      const formData = this.surveyForm.value;
      console.log(formData);

      const questionData = this.surveyForm.get('questionDetails')?.value;
      console.log('Question Data:', questionData);

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
      surveyView: this.surveyForm.value.displayMode, 
      authView: formValue.audience === 'all' ? 0 : 1,
      plantId: 1,
      isExcel: false,
      surveyStatus: true,
      archieve: false,
      questionDetails: formValue.questionDetails,
      userDropDown: formValue.userDropDown
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







  isFieldInvalid(field: string): boolean {
    const control = this.surveyForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  goBack(): void {

  }



  ddlDepartment() {
    this.ddlServicesService.getDepartmentsList().subscribe(data => {
      this.departments = data
      this.surveyForm.get('department')?.setValue(data[0]); // Optional: set first as default
    });
  }

  ddlPlant() {
    this.ddlServicesService.getPlantList().subscribe(data => {
      this.locations = data;
      this.surveyForm.get('location')?.setValue(data[0])
    });
  }

  ddlUser() {
    this.ddlServicesService.getUserList().subscribe(data => {
      this.availableUsers = data;
      this.selectedUsers = [];
      this.surveyForm.get('questionDetails.userList')?.setValue([]);
    });
  }

  moveToSelected() {
    const selectedUserIds: string[] = this.surveyForm.get('userDropDown.userList')?.value || [];
    debugger
    // Get user objects for selected IDs from availableUsers
    const usersToMove = this.availableUsers.filter(user => selectedUserIds.includes(user.id));

    // Add new users to selectedUsers (avoid duplicates)
    this.selectedUsers = [
      ...this.selectedUsers,
      ...usersToMove.filter(u => !this.selectedUsers.some(su => su.id === u.id))
    ];

    // Remove moved users from availableUsers
    this.availableUsers = this.availableUsers.filter(user => !selectedUserIds.includes(user.id));

    // Clear left dropdown selection
    this.surveyForm.get('userDropDown.userList')?.setValue([]);
  }


  moveToAvailable() {
    const selectedIds: string[] = this.surveyForm.get('userDropDown.selectedUserList')?.value || [];

    // Find users to move back
    const usersToMoveBack = this.selectedUsers.filter(u => selectedIds.includes(u.id));

    // Add back to availableUsers (avoiding duplicates)
    this.availableUsers = [
      ...this.availableUsers,
      ...usersToMoveBack.filter(u => !this.availableUsers.some(au => au.id === u.id))
    ];

    // Remove from selectedUsers
    this.selectedUsers = this.selectedUsers.filter(u => !selectedIds.includes(u.id));

    // Clear selectedUserList selection
    this.surveyForm.get('userDropDown.selectedUserList')?.setValue([]);

    // Update selectedUserList in the form (in case you’re using it elsewhere)
    this.surveyForm.get('userDropDown.selectedUserList')?.setValue(this.selectedUsers.map(u => u.id));
  }


}
