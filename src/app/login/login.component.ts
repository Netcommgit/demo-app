import { Component } from '@angular/core';
import { CaptchaComponent } from "../captcha/captcha.component";
import { RouterModule,RouterLinkActive, } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CaptchaComponent,RouterModule,RouterLinkActive,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
