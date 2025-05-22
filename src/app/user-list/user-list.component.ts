import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { RibbonComponent } from '../ribbon/ribbon.component';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-user-list',
  imports: [FooterComponent, HeaderComponent, RibbonComponent,
    CommonModule, ReactiveFormsModule, FormsModule
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  users: any[] = [];

  //  pageSizeOptions = [5, 10, 25];
  // pageSize: number = 5;

  // currentPage: number = 1;
  // totalPages: number = 1;

  // pagedUsers: User[] = [];

  constructor(private userService: UserService) { }


  ngOnInit(): void {
    this.getUserList();
    // this.filteredData = [...this.users];
    // this.updatePagination();
  }

  getUserList() {
    this.userService.getUserList().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        console.error('Failed to load users', err);
      }
    });
  }

  editUser(user: any) {
    console.log(user)
  }
  deleteUser(userID: string) {
    console.log(userID)
  }

  // for pagination start here 

  

  // filterUsers() {
  //   const term = this.searchTerm.toLowerCase();
  //   this.filteredData = this.users.filter(user =>
  //     Object.values(user).some(val =>
  //       String(val).toLowerCase().includes(term)
  //     )
  //   );
  //   this.currentPage = 1;
  //   this.updatePagination();
  // }

  // updatePagination() {
  //   this.totalPages = Math.ceil(this.filteredData.length / this.pageSize);
  //   const start = (this.currentPage - 1) * this.pageSize;
  //   const end = start + this.pageSize;
  //   this.paginatedData = this.filteredData.slice(start, end);
  // }

  // previousPage() {
  //   if (this.currentPage > 1) {
  //     this.currentPage--;
  //     this.updatePagination();
  //   }
  // }

  // nextPage() {
  //   if (this.currentPage < this.totalPages) {
  //     this.currentPage++;
  //     this.updatePagination();
  //   }
  // }

  // onPageSizeChange() {
  //   this.currentPage = 1;
  //   this.updatePagination();
  // }


  // for pagination end here 


}
