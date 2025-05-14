import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RibbonComponent } from '../ribbon/ribbon.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlantService } from '../services/plant.service';
import { Plant } from '../models/plant';

@Component({
  selector: 'app-plant-master',
  imports: [HeaderComponent, RibbonComponent, FooterComponent, CommonModule
    , ReactiveFormsModule
  ],
  templateUrl: './plant-master.component.html',
  styleUrl: './plant-master.component.css'
})
export class PlantMasterComponent implements OnInit {
  plantForm!: FormGroup;
  isSubmitting: boolean = false;
  toastMessage: string = '';
  showToast: boolean = false;


  constructor(private fb: FormBuilder, private plantService: PlantService) { }

  ngOnInit(): void {
    this.plantForm = this.fb.group({
      plantId: [0, [Validators.required]],
      plantName: ['', [Validators.required]],
      sapCode: [''],
      status: [true, [Validators.requiredTrue]],
      plantDescription: ['']
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
      this.toastMessage = 'Failed to save plant.';
      this.showToast = true;
      setTimeout(() => (this.showToast = false), 3000);
    }
  });
}


}
