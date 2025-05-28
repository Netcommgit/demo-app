import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private apiUrl: string;
  constructor() {
    this.apiUrl = 'https://localhost:7097/api/';
    //this.apiUrl = 'http://192.168.0.156:81/api/';

   }

   getApiUrl():string{
    return this.apiUrl
   }
}
