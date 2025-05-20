import { Injectable } from '@angular/core';
import { Plant } from '../models/plant';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PlantService {

  private apiUrl: string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.apiUrl = this.configService.getApiUrl();
  }


  savePlant(plant: Plant): Observable<any> {
    return this.http.post(this.apiUrl + 'PlantMaster/Save', plant);
  }

  getPlantList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'PlantMaster/GetPlantList')
  }

  deletePlantData(plantId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}PlantMaster/DeletePlant/${plantId}`);
  }

}
