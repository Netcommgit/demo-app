import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

    private apiUrl = 'https://localhost:7097/api/SurveyDetails/';

  constructor(private http :HttpClient) { }

  saveSurvey(surveyData: any): Observable<any>{
    debugger
    return this.http.post(this.apiUrl+'Save',surveyData)
  }
}
