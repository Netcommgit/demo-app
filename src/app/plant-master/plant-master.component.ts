import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RibbonComponent } from '../ribbon/ribbon.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlantService } from '../services/plant.service';
import { Plant } from '../models/plant';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-plant-master',
  imports: [ CommonModule
    , ReactiveFormsModule
  ],
  templateUrl: './plant-master.component.html',
  styleUrl: './plant-master.component.scss'
})
export class PlantMasterComponent implements OnInit {
  plantForm!: FormGroup;
  isSubmitting: boolean = false;
  toastMessage: string = '';
  toastType: 'success' | 'error' = 'success';
  showToast: boolean = false;
  plant: any;
  isEditMode:boolean = false;


  constructor(private fb: FormBuilder, private plantService: PlantService, private router: Router) { }

  ngOnInit(): void {
    debugger

    this.plant = history.state.plant;
    this.isEditMode =  history.state.isEditMode;
    
    if (!this.plant && this.isEditMode) {
      this.goToPlantList();
      return;
    }

    this.initializeForm();

  }
  initializeForm(): void {
    this.plantForm = this.fb.group({
      plantId: [this.plant?.plantId || 0, [Validators.required]],
      plantName: [this.plant?.plantName || '', [Validators.required]],
      sapCode: [this.plant?.sapCode || ''],
      status: [this.plant?.status ?? true, [Validators.requiredTrue]],
      plantDescription: [this.plant?.plantDescription || '']
    });
  }

  onSubmit() {
    if (this.plantForm.invalid) {
      this.plantForm.markAllAsTouched();

      const firstInvalid = document.querySelector('.ng-invalid');
      if (firstInvalid) {
        (firstInvalid as HTMLElement).focus();
      }
      return;
    }

    this.isSubmitting = true;
    const plantData = this.plantForm.value;

    this.plantService.savePlant(plantData).subscribe({
      next: () => {

        this.isSubmitting = false;
        this.toastType = 'success';
        this.toastMessage = 'Plant saved successfully!';
        this.showToast = true;
        this.plantForm.reset({
          plantId: 0,
          status: true,
        });

        setTimeout(() => (this.showToast = false), 3000);
      },
      error: () => {
        this.isSubmitting = false;
        this.toastType = 'error';
        this.toastMessage = 'Failed to save plant.';
        this.showToast = true;
        setTimeout(() => (this.showToast = false), 3000);
      }
    });
  }

  goToPlantList(): void {
    this.router.navigate(['/plant-list'])
  }

}
