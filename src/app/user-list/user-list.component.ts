import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { RibbonComponent } from '../ribbon/ribbon.component';
import { CommonModule } from '@angular/common';
import { UserListService } from '../shared/services/userList.services';
@Component({
  selector: 'app-user-list',
  imports: [FooterComponent,HeaderComponent,RibbonComponent,
    CommonModule
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  users: any[] = [];
  constructor(private userList:UserListService){}


  ngOnInit(): void {
    debugger
    this.userList.getUserList().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        console.error('Failed to load users', err);
      }
    });
  }
}
