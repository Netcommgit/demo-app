import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class UserRegistrationService{
    private apiUrl = 'https://localhost:7097/api/';
    constructor(private http: HttpClient) {}

    registerUser(request: UserRegisterRequest): Observable<any> {
      return this.http.post(this.apiUrl+'register', request);
    }
}


export interface UserRegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    mobileNum:string;
    password: string;
    gender: string;
    DOB:Date;
  }