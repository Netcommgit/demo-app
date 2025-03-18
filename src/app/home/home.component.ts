import { Component } from '@angular/core';
import { RibbonComponent } from '../ribbon/ribbon.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RibbonComponent,FooterComponent,HeaderComponent,CommonModule],
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

}
