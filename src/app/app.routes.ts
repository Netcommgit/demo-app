import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MypageComponent } from './mypage/mypage.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserListComponent } from './user-list/user-list.component';
//import { authGuard } from './shared/auth.guard';
export const routes: Routes = [

    {
        path:'',
        component:LoginComponent
    },
    {
        path:'home1',
        component:HomeComponent
    },
    {
        path:'mypage',
        component:MypageComponent
    },
    {
        path:'user-Reg',
        component:UserRegistrationComponent
    },
    {
        path:'user-list',
        component:UserListComponent
    }
];
