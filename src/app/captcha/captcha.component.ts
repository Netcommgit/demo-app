import {Component } from '@angular/core';
import {ElementRef, ViewChild, AfterViewInit, } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-captcha',
  imports: [MatIconModule],
  templateUrl: './captcha.component.html',
  styleUrl: './captcha.component.css'
})
export class CaptchaComponent implements AfterViewInit {
  @ViewChild('captchaCanvas') canvas!: ElementRef<HTMLCanvasElement>;  
  captchaText: string = '';
  ngAfterViewInit(): void {
    this.generateCaptcha();
    //throw new Error('Method not implemented.');
  }

  generateCaptcha() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#!&^*$%';
    this.captchaText = Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    
    const canvas: HTMLCanvasElement = this.canvas.nativeElement;
    const ctx = canvas.getContext('2d');
  
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      ctx.fillStyle = '#FFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
  
      for (let i = 0; i < 5; i++) {
        ctx.strokeStyle = this.getRandomColor();
        ctx.lineWidth = Math.random() * 2 + 1;
        ctx.beginPath();
        ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.stroke();
      }
  
      // Add random dots
      for (let i = 0; i < 30; i++) {
        ctx.fillStyle = this.getRandomColor();
        ctx.beginPath();
        ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 3, 0, Math.PI * 2);
        ctx.fill();
      }
  
      // Set CAPTCHA text style
      ctx.font = '20px Arial';
      ctx.fillStyle = '#000';
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
  
      // Add slight rotation to text
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((Math.random() - 0.5) * 0.2);
      ctx.fillText(this.captchaText, 0, 0);
      ctx.restore();
    }
  }
  
  // Helper function to generate random colors
  private getRandomColor(): string {
    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
  }

}
