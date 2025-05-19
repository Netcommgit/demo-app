import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RibbonComponent } from '../ribbon/ribbon.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PlantService } from '../services/plant.service';

@Component({
  selector: 'app-plant-list',
  imports: [HeaderComponent, FooterComponent, RibbonComponent, CommonModule],
  templateUrl: './plant-list.component.html',
  styleUrl: './plant-list.component.css'
})
export class PlantListComponent {
  plants: any[] = [];


  constructor(private router: Router, private plantService: PlantService) { }




  ngOnInit(): void {
    this.plantService.getPlantList().subscribe({
      next: data => {
        this.plants = data
      },
      error: (err) => {
        console.error('Failed to load Plants Data', err);
      }
    })
  }

  addNewPlant(): void {
    this.router.navigate(['/add-plant'])
  }

  editPlant(plant: any) {
    this.router.navigate(['/add-plant'], {
      state: { plant: plant, 
         isEditMode: true
      }
    });
  }

  deletePlant(plant: any): void {
    console.log(plant);
  }

}
