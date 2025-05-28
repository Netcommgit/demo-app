import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { throwError,Observable } from 'rxjs';
import { Department } from '../models/department';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DdlServicesService {

  private apiUrl: string;
  constructor(private httpClient: HttpClient, private configService: ConfigService) {
    this.apiUrl = configService.getApiUrl();
  }

  getDepartmentsList(): Observable<Department[]> {
    return this.httpClient.get<Department[]>(this.apiUrl + 'Department/GetDepartment');
  }

   getPlantList(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiUrl + 'PlantMaster/GetPlantList');
  }

  getUserList(): Observable<any[]> {
  return this.httpClient.get<any[]>(this.apiUrl + 'GetAllUser').pipe(
    catchError(error => {
      console.error('Error in getUserList:', error);
      // You can transform the error here or rethrow it
      return throwError(() => error);
    })
  );
}
}
