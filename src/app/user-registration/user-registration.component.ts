import { Component,OnInit } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from '../header/header.component';
import { RibbonComponent } from "../ribbon/ribbon.component";
import { CommonModule } from '@angular/common';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';

//import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { UserService } from '../services/user.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; // for native JS Date
import Swal from 'sweetalert2';


@Component({
  selector: 'app-user-registration',
  imports: [FooterComponent, HeaderComponent, RibbonComponent,CommonModule,
    MatFormFieldModule,MatInputModule,MatButtonModule,ReactiveFormsModule,MatSelectModule,MatGridListModule
  ,MatDatepickerModule,MatNativeDateModule],
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.scss'
})
export class UserRegistrationComponent implements OnInit {

  registrationForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private userService:UserService
  ) {}
 

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      mobileNum: ['', Validators.pattern(/^\d{10}$/)],
      DOB:['']

    });
  }

  onSubmit(): void {
    
    if (this.registrationForm.valid) {
      const request = this.registrationForm.value;
  
      this.userService.registerUser(request).subscribe({
        next: (response) => {
          if(response.id != null && response.id != ""){
            debugger
            Swal.fire({
              title: 'User Registration Successful!',
              text: response.empCode,
              icon: 'success',
              showConfirmButton: false,
              timer: 2000, // Auto-close after 2 seconds
              timerProgressBar: true
            });
            // .then((result) => {
            //   if (result.isConfirmed) {
            //     Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
            //   }
            // });

          }
        },
        error: (err) => {
          console.error('Error during registration:', err);
        }
      });
    }
  }
}
