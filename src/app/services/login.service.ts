import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { ConfigService } from "./config.service";


@Injectable({
    providedIn: 'root'
})


export class LoginService {
    private apiUrl:string;
    constructor(private http: HttpClient, private configService :ConfigService) { 
        this.apiUrl = this.configService.getApiUrl();
    }

    login(userData: any): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<any>(this.apiUrl + 'login', userData, { headers });
    }
}