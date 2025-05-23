import { TestBed } from '@angular/core/testing';

import { NewSurveyService } from './new-survey.service';

describe('NewSurveyService', () => {
  let service: NewSurveyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewSurveyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
