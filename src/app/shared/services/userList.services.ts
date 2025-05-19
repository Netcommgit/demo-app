import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { ConfigService } from "../../services/config.service";

@Injectable({
    providedIn: 'root'
})

export class UserListService{
    private apiUrl : string;
    constructor (private http: HttpClient, private configService:ConfigService) {
      this.apiUrl =   this.configService.getApiUrl();
    }

    getUserList(): Observable<any[]>{
            return this.http.get<any[]>(this.apiUrl+'GetAllUser')
    }
}

