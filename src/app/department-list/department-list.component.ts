import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { RibbonComponent } from '../ribbon/ribbon.component';
import { FooterComponent } from '../footer/footer.component';
import { HttpClient } from '@angular/common/http';
import { DepartmentService } from '../services/department.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-department-list',
  imports: [CommonModule],
  templateUrl: './department-list.component.html',
  styleUrl: './department-list.component.scss'
})
export class DepartmentListComponent {
  departments: any[] =[];
  constructor(private httpClient: HttpClient, private departmentService: DepartmentService,private router:Router, private toastr:ToastrService) { }

  ngOnInit(){
    this.getDepartmentListData();
  }

  getDepartmentListData():void{
    this.departmentService.getDepartmentsList().subscribe({
      next:data =>{
        debugger
        this.departments = data
      },
      error:(err)=>{
        this.toastr.error(err+'Some error Occured', 'error',{
          timeOut:1000
        });
        console.error('Failed to load Plants Data', err);
      }
    });
  }
  editDepartment(any: number): void {

  }
  deleteDepartment(any: number): void {

  }


  addNewDepartment():void{
    this.router.navigate(['/department'])
  }
}
