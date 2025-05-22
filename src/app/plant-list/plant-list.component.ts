import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RibbonComponent } from '../ribbon/ribbon.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PlantService } from '../services/plant.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-plant-list',
  imports: [HeaderComponent, FooterComponent, RibbonComponent, CommonModule],
  templateUrl: './plant-list.component.html',
  styleUrl: './plant-list.component.css'
})
export class PlantListComponent {
  plants: any[] = [];


  constructor(private router: Router, private plantService: PlantService, private toastr: ToastrService) { }




  ngOnInit(): void {
    this.getPlandData();
  }

  getPlandData(): void {
    this.plantService.getPlantList().subscribe({
      next: data => {
        this.plants = data
      },
      error: (err) => {
        this.toastr.error(err+'Some error Occured', 'error',{
          timeOut:1000
        });
        console.error('Failed to load Plants Data', err);
      }
    })
  }

  addNewPlant(): void {
    this.router.navigate(['/add-plant'])
  }

  editPlant(plant: any) {
    this.router.navigate(['/add-plant'], {
      state: {
        plant: plant,
        isEditMode: true
      }
    });
  }

  deletePlant(plantId: number): void {
    this.plantService.deletePlantData(plantId).subscribe({
      next: () => {
        this.toastr.success('Deleted successfully!', 'Delete',{
          timeOut:1000
        });
        this.getPlandData();
      },
      error: (error) => {
        this.toastr.error('Failed to delete plant. Please try again later.', 'Error',{
          timeOut:1000
        });
      }
    });
  }

}
