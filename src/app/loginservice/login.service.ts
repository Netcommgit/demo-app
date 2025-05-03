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
    
        return this.http.post<any>(this.apiUrl+'login', userData, { headers });
      } 

      
       refresh(userData: any): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' ,
            'authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYXNoaXNoZ3VwdGEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImQzMWIwMmMyLTYzOWMtNGE0Ni04MzU4LWZiY2VmM2Y5ZGIzYSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImFzaGlzaEBnbWFpbC5jb20iLCJGaXJzdE5hbWUiOiJBc2hpc2giLCJMYXN0TmFtZSI6Ikd1cHRhIiwiR2VuZGVyIjoibWFsZSIsImV4cCI6MTc0NDc4OTgwOCwiaXNzIjoiTmV0Y29tbSIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjUwNTIvIn0.rCk0DlefVgIki1fRonuSqzPIqMKNU8Y5A8MnlvJP234'
        });
    
        return this.http.post<any>(this.apiUrl+'refresh-token', userData, { headers });
      }
}