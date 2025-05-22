import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RibbonComponent } from '../ribbon/ribbon.component';
import { FooterComponent } from '../footer/footer.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Department } from '../models/department';
import { DepartmentService } from '../services/department.service';
import { Router } from '@angular/router';

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
  toastType: 'success' | 'error' = 'success';
  toastMessage = '';
  constructor(private fb: FormBuilder, private departmentService: DepartmentService, private router: Router) {
    this.initiliazeDocumentform();
  }

  initiliazeDocumentform(): void {
    this.departmentForm = this.fb.group({
      deptID: [0],
      deptName: ['', Validators.required],
      // modifyDate: [new Date().toISOString().substring(0, 10), Validators.required],
      status: [false, Validators.required],
      archive: [false, Validators.required],
      sapCode: [''],
      groupID: [null, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.departmentForm.invalid) {
      this.departmentForm.markAllAsTouched();

      const firstInvalid = document.querySelector('.ng-invalid');
      if (firstInvalid) {
        (firstInvalid as HTMLElement).focus();
      }
      return;
    }
    this.isSubmitting = true;
    const departmentData = this.departmentForm.value;
    if (departmentData.deptID == null || departmentData.deptID == 0) {
      this.departmentService.addDepartment(departmentData).subscribe({
        next: () => {

          this.isSubmitting = false;
          this.toastType = 'success';
          this.toastMessage = 'Department saved successfully!';
          this.showToast = true;
          this.departmentForm.reset({
            plantId: 0,
            status: true,
          });

          setTimeout(() => (this.showToast = false), 3000);
        },
        error: () => {
          this.isSubmitting = false;
          this.toastType = 'error';
          this.toastMessage = 'Failed to save department.';
          this.showToast = true;
          setTimeout(() => (this.showToast = false), 3000);
        }
      });
    }
    else {
      this.departmentService.updateDepartment(departmentData.deptID, departmentData).subscribe({
        next: () => {

          this.isSubmitting = false;
          this.toastType = 'success';
          this.toastMessage = 'Department updated successfully!';
          this.showToast = true;
          this.departmentForm.reset({
            plantId: 0,
            status: true,
          });

          setTimeout(() => (this.showToast = false), 3000);
        },
        error: () => {
          this.isSubmitting = false;
          this.toastType = 'error';
          this.toastMessage = 'Failed to update .';
          this.showToast = true;
          setTimeout(() => (this.showToast = false), 3000);
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/department-list']);
  }
}
