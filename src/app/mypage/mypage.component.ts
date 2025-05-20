import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RibbonComponent } from '../ribbon/ribbon.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-mypage',
  imports: [RibbonComponent,HeaderComponent,FooterComponent,CommonModule],
  templateUrl: './mypage.component.html',
  styleUrl: './mypage.component.css'
})
export class MypageComponent {
  isActive: boolean = true;
  
  constructor(private router:Router){}

  navigateToUserReg(): void {
    this.router.navigate(['/user-Reg']);
  }

  navigateToUserList(): void{
    this.router.navigate(['/user-list']);
  }
  naigateToSurvey():void{
    this.router.navigate(['user-survey']);
  }
  naigateToPlant():void{
    this.router.navigate(['add-plant']);
  }
  naigateToDepartment():void{
    this.router.navigate(['department']);
  }
}
