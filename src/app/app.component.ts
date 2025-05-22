import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RouterModule,RouterLinkActive, } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { RibbonComponent } from './ribbon/ribbon.component';
import { FooterComponent } from './footer/footer.component';
import { Router,NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterModule,CommonModule
    ,HeaderComponent,RibbonComponent,FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isLoginPage: boolean = false;
  title = 'demo-app';

    constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Adjust this according to your actual login path
        // this.isLoginPage = event.urlAfterRedirects.includes('/login');
         this.isLoginPage = event.urlAfterRedirects === '/';
      }
    });
  }
}
