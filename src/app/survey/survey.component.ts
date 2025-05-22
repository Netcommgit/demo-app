import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RibbonComponent } from '../ribbon/ribbon.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { Router } from '@angular/router';
// import {AddSurveyComponent}  from '../add-survey/add-survey.component'

@Component({
  selector: 'app-survey',
  imports: [HeaderComponent,RibbonComponent,FooterComponent,CommonModule],
  templateUrl: './survey.component.html',
  styleUrl: './survey.component.scss'
})
export class SurveyComponent {
   
    constructor(private router:Router){}
    
    addSurveyPage():void{
      this.router.navigate(['/add-Survey']);
    }
}
