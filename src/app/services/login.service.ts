import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})


export class LoginService {
    private apiUrl = 'https://localhost:7097/api/'; // Replace with actual API URL
    //https://localhost:7097/api/login
    constructor(private http: HttpClient) { }

    login(userData: any): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<any>(this.apiUrl + 'login', userData, { headers });
    }
}