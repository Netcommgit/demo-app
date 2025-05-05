import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})

export class UserListService{
    private apiUrl = 'https://localhost:7097/api/';
    constructor (private http: HttpClient) {}
    
    getUserList(): Observable<any[]>{
            return this.http.get<any[]>(this.apiUrl+'GetAllUser')
    }
}

