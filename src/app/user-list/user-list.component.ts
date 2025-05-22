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

  globalSearch: string = '';
  filteredUsers: any[] = [];
  paginatedUsers: any[] = [];  // Users to display per page

  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 0;
  pageSizeOptions: number[] = [5, 10, 25, 50];

  constructor(private userService: UserService) { }


  ngOnInit(): void {
    this.getUserList();
  }

  getUserList() {
    this.userService.getUserList().subscribe({
      next: (data) => {
        this.users = data;
        this.filteredUsers = [...this.users];
        // this is for pagination start here
        this.currentPage = 1;
        this.updatePagination();
        //this is for pagination end here
      },
      error: (err) => {
        console.error('Failed to load users', err);
      }
    });
  }

  editUser(user: any) {
    console.log(user)
  }
  deleteUser(userId: number) {
    // After delete from backend, refresh the list
    this.userService.deleteUser(userId).subscribe(() => {
      this.users = this.users.filter(user => user.id !== userId);
      this.updatePagination();
    });
  }

  // for pagination start here 


  fetchUsers() {
    this.users = [];

    this.updatePagination();
  }

  // updatePagination() {
  //   debugger
  //   const startIndex = (this.currentPage - 1) * this.pageSize;
  //   const endIndex = startIndex + this.pageSize;

  //   this.paginatedUsers = this.users.slice(startIndex, endIndex);
  //   this.totalPages = Math.ceil(this.users.length / this.pageSize);
  // }
  updatePagination() {
  const startIndex = (this.currentPage - 1) * this.pageSize;
  const endIndex = startIndex + this.pageSize;

  this.paginatedUsers = this.filteredUsers.slice(startIndex, endIndex);
  this.totalPages = Math.ceil(this.filteredUsers.length / this.pageSize);
}

  onPageSizeChange() {
    this.currentPage = 1;
    this.updatePagination();
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }


  applyGlobalFilter() {
    const search = this.globalSearch.toLowerCase();

    this.filteredUsers = this.users.filter(user => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      const empCode = user.empCode?.toLowerCase();
      const status = user.status ? 'active' : 'inactive';

      return (
        fullName.includes(search) ||
        empCode.includes(search) ||
        status.includes(search)
      );
    });

    this.currentPage = 1;
    this.updatePagination();
  }

  // for pagination end here 


}
