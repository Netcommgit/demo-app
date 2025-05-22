import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MypageComponent } from './mypage/mypage.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserListComponent } from './user-list/user-list.component';
import { SurveyComponent } from './survey/survey.component';
import { AddSurveyComponent } from './add-survey/add-survey.component';
import { PlantMasterComponent } from './plant-master/plant-master.component';
import { PlantListComponent } from './plant-list/plant-list.component';
import { DepartmentComponent } from './department/department.component';
import { DepartmentListComponent } from './department-list/department-list.component';
//import { authGuard } from './shared/auth.guard';
export const routes: Routes = [

    {
        path:'',
        component:LoginComponent,
        title:'Login'
    },
    {
        path:'user-login',
        component:LoginComponent,
        title:'Login'
    },
    {
        path:'home1',
        component:HomeComponent,
        title:'Home'
    },
    {
        path:'mypage',
        component:MypageComponent,
        title:'My Page'
    },
    {
        path:'user-Reg',
        component:UserRegistrationComponent,
        title:'User Registation'
    },
    {
        path:'user-list',
        component:UserListComponent,
        title:'User List'
    },
    {
        path:'user-survey',
        component:SurveyComponent,
        title:'User Survey'
    },
    {
        path:'add-Survey',
        component:AddSurveyComponent,
        title:'Add Survey'
    },
    {
        path:'add-plant',
        component:PlantMasterComponent,
        title:'Add Plant'
    },
    {
        path:'plant-list',
        component:PlantListComponent,
        title:'Plant List'
    },
    {
        path:'department',
        component:DepartmentComponent,
        title:'Department'
    },
    {
        path:'department-list',
        component:DepartmentListComponent,
        title:'Department List'
    }
];
