import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RibbonComponent } from '../ribbon/ribbon.component';
import { FooterComponent } from '../footer/footer.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-department',
  imports: [HeaderComponent, RibbonComponent, FooterComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './department.component.html',
  styleUrl: './department.component.css'
})
export class DepartmentComponent {
  departmentForm!: FormGroup;
  isSubmitting = false;
  showToast = false;
  toastMessage = '';
  constructor(private fb: FormBuilder) {
    this.initiliazeDocumentform();
  }

  initiliazeDocumentform(): void {
    this.departmentForm = this.fb.group({
      deptName: ['', Validators.required],
      modifyDate: [new Date().toISOString().substring(0, 10), Validators.required], 
      status: [false,Validators.required],
      archive: [false,Validators.required],
      sapCode: [''],
      groupID: [null, Validators.required],
    });
  }

  onSubmit(): void {

  }

  goBack():void{
    
  }
}
