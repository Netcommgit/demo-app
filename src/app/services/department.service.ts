import { Injectable } from '@angular/core';
import { Department } from '../models/department';
import { HttpClient } from '@angular/common/http'
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private apiUrl: string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.apiUrl = this.configService.getApiUrl();
  }

  getDepartmentsList(): Observable<Department[]> {
    return this.http.get<Department[]>(this.apiUrl+'Department/GetDepartment');
  }

  getDepartmentById(id: number): Observable<Department> {
    return this.http.get<Department>(`${this.apiUrl}/${id}`);
  }

  addDepartment(department: Department): Observable<Department> {
    return this.http.post<Department>(this.apiUrl + 'Department/SaveDepartmentData', department);
    // if (department.deptID == 0 || department.deptID == null) {
    //   return this.http.post<Department>(this.apiUrl + 'Department/SaveDepartmentData', department);
    // }
    // else{
    //   return this.http.put<Department>(this.apiUrl + 'Department/UpdateDepartment', department);
    // }

  }

  updateDepartment(id: number, department: Department): Observable<void> {
    return this.http.put<void>(`${this.apiUrl+'Department/UpdateDepartment'}/${id}`, department);
  }

  deleteDepartment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
