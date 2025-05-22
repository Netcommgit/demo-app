import { Component } from '@angular/core';
import { CaptchaComponent } from "../captcha/captcha.component";
import { RouterModule,RouterLinkActive,Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginService } from '../services/login.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
// import { BrowserModule } from '@angular/platform-browser';
// import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-login',
  imports: [CaptchaComponent,RouterModule,RouterLinkActive,CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  user = {
    email: '', 
    password: '' 
  };;

  constructor(
    private loginService: LoginService,
    private authService:AuthService,
    private router :Router
  ) {}

  login() {
    if (!this.user.email || !this.user.password) {
      console.error('Username and Password are required!');
      return;
    }

    this.loginService.login(this.user).subscribe({
      next: (response) => {
        if (response.id !== null && response.id !== undefined && response.id !== '') {
          const token =  response.access_token;
          this.authService.saveToken(token);
          //localStorage.setItem('token', response.access_token); 
          this.router.navigate(['/home1']); 
        }
      },
      error: (error) => {
        debugger;
        console.error('Login failed:', error);
      }
    });
  }
}
