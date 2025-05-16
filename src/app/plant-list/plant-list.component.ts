import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RibbonComponent } from '../ribbon/ribbon.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-plant-list',
  imports: [HeaderComponent,FooterComponent,RibbonComponent,CommonModule],
  templateUrl: './plant-list.component.html',
  styleUrl: './plant-list.component.css'
})
export class PlantListComponent {

}
