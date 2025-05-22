import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RibbonComponent } from '../ribbon/ribbon.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, Validator, FormBuilder, FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { SurveyService } from '../services/survey.service';

@Component({
  selector: 'app-add-survey',
  standalone: true,
  imports: [HeaderComponent, CommonModule, FooterComponent, RibbonComponent, MatFormFieldModule, ReactiveFormsModule
    , FormsModule],
  templateUrl: './add-survey.component.html',
  styleUrl: './add-survey.component.scss'
})
export class AddSurveyComponent {

  constructor(private fb: FormBuilder, private http: HttpClient, private surveyService: SurveyService) { }

  surveyForm!: FormGroup;

  selectedUserList: string[] = [];

  ngOnInit(): void {
    this.surveyForm = this.fb.group({
      surveyName: [''],
      startDate: [''],
      endDate: [''],
      userInstructions: [''],
      confirmationMessage: [''],
      displayType: ['SinglePage'],
      authType: ['AllEmployee'],
      location: [''],
      department: [''],
      selectedUsers: [[]],
      questionText: [''],
      optionType: ['Radio'],
      boxTypeOptions: [[]],
      newOption: ['']
    });
  }

  moveSelectedItem(
    sourceSelect: HTMLSelectElement,
    targetSelect: HTMLSelectElement
  ): void {
    const selectedOption = sourceSelect.selectedOptions[0];
    if (selectedOption) {
      const value = selectedOption.value;

      const exists = Array.from(targetSelect.options).some(
        (opt) => opt.value === value
      );

      if (!exists) {
        const newOption = new Option(value, value);
        targetSelect.add(newOption);
        sourceSelect.remove(sourceSelect.selectedIndex);
      }
    }
  }

  newOption: string = '';
  boxTypeOptions: string[] = [];

  addOption(): void {
    debugger
    const trimmedOption = this.surveyForm.get('newOption')?.value?.trim();

    if (trimmedOption && !this.boxTypeOptions.includes(trimmedOption)) {

      this.boxTypeOptions.push(trimmedOption);

      this.surveyForm.get('newOption')?.reset();

      Swal.fire({
        title: 'Option Added',
        text: 'The option was successfully added.',
        icon: 'success',
        showConfirmButton: false,
        timer: 1000,
      });
    }
    else {
      Swal.fire({
        title: 'Invalid Option',
        text: 'Please enter a valid, non-duplicate option.',
        icon: 'warning',
        showConfirmButton: true,
      });
    }
  }

  selectedOption: string = '';
  deleteOptions() {
    const index = this.boxTypeOptions.indexOf(this.selectedOption);
    if (index !== -1) {
      this.boxTypeOptions.splice(index, 1);
      this.selectedOption = ''; // Clear selection
      Swal.fire({
        title: 'Option removed',
        text: 'Seleted option removed',
        icon: 'success',
        showConfirmButton: false,
        timer: 500,
        timerProgressBar: true
      });
    }
    else {
      Swal.fire({
        title: 'Option not deleted',
        text: 'Please select an option to delete',
        icon: 'warning',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true
      });
    }
  }

  moveOptionUp() {
    const index = this.boxTypeOptions.indexOf(this.selectedOption);
    if (index > 0) {
      [this.boxTypeOptions[index - 1], this.boxTypeOptions[index]] =
        [this.boxTypeOptions[index], this.boxTypeOptions[index - 1]];
    }
  }

  moveOptionDown() {
    const index = this.boxTypeOptions.indexOf(this.selectedOption);
    if (index !== -1 && index < this.boxTypeOptions.length - 1) {
      [this.boxTypeOptions[index], this.boxTypeOptions[index + 1]] =
        [this.boxTypeOptions[index + 1], this.boxTypeOptions[index]];
    }
  }

  formatDate(date: string): string {
    if (!date) return ''; 
    const d = new Date(date);
    return d.toISOString().split('T')[0];  
  }

  submitSurvey() {
    debugger
    const surveyData = {
      surveyName: this.surveyForm.value.surveyName,
      surveyStart: this.formatDate(this.surveyForm.value.startDate),
      surveyEnd: this.formatDate(this.surveyForm.value.endDate),
      surveyInstruction: this.surveyForm.value.userInstructions,
      surveyConfirmation: this.surveyForm.value.confirmationMessage,
      surveyView: this.surveyForm.value.displayType,
      authView: this.surveyForm.value.authType,
      PlantId: this.surveyForm.value.location,
      department: this.surveyForm.value.department,
      selectedUsers: this.selectedUserList, // Capture from the dual list box
      question: {
        questionText: this.surveyForm.value.questionText,
        optionType: this.surveyForm.value.optionType,
        options: this.boxTypeOptions
      }
    };

    this.surveyService.saveSurvey(surveyData).subscribe({
      next: () => Swal.fire('Saved!', 'Survey saved successfully.', 'success'),
      error: (err) => console.error(err)
    });
  }

}






