import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RibbonComponent } from '../ribbon/ribbon.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';


@Component({
  selector: 'app-survey',
  imports: [HeaderComponent,RibbonComponent,FooterComponent,CommonModule],
  templateUrl: './survey.component.html',
  styleUrl: './survey.component.css'
})
export class SurveyComponent {
  
}
