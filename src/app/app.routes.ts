import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [

    {
        path:'',
        component:LoginComponent
    },
    {
        path:'home1',
        component:HomeComponent
    }
];
