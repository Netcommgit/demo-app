import { Injectable } from '@angular/core';
import { Survey } from '../models/survey';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class NewSurveyService {
  private apiUrl: any;

  constructor(private configService: ConfigService, private httpClient: HttpClient) {
    this.apiUrl = configService.getApiUrl();
  }

  saveSurvey(survey: Survey): Observable<any> {
    return this.httpClient.post(this.apiUrl + 'SurveyDetails/Save', survey)
  }
}
