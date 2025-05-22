import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl: string;
  constructor(private httpClient: HttpClient, private configService: ConfigService) {
    this.apiUrl = configService.getApiUrl();
  }

  registerUser(request: User): Observable<any> {
    return this.httpClient.post(this.apiUrl + 'register', request);
  }

   getUserList(): Observable<any[]>{
            return this.httpClient.get<any[]>(this.apiUrl+'GetAllUser')
    }
}
