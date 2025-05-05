import { Component } from '@angular/core';
import { RibbonComponent } from '../ribbon/ribbon.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { LoginService } from '../loginservice/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RibbonComponent, FooterComponent, HeaderComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  images = [
    'https://rms.officenet.in/images/Banner/132_certificate-gptw.jpg',
    'https://rms.officenet.in/images/Banner/132_certificate-gptw.jpg',
    'https://rms.officenet.in/images/Banner/132_certificate-gptw.jpg'
  ];
  currentIndex = 0;

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }
  constructor(private loginService: LoginService, private router: Router) { }

  login() {
    const x = {
      refreshToken: 'Mkcib1QPsCiti0oILSbS/6Lz6b6bUR92rEmw4H1w61r+u5oPrVuq5NH6/7WLbtggeFagLT1aCEKWfJmDC7LcJQ=='
    }
    // this.loginService.refresh(x).subscribe({
    //   next: (response) => {
    //     if (response.id !== null && response.id !== undefined && response.id !== '') {
    //       localStorage.setItem('token', response.access_token); 
    //       this.router.navigate(['/home1']); 
    //     }
    //   },
    //   error: (error) => {
    //     console.error('Login failed:', error);
    //   }
    // });
  }
}
