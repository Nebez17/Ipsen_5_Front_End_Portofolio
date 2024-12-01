import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {FeedbackPerElement} from "../Models/feedbackPerElement";

@Injectable({
  providedIn: 'root'
})
export class FeedbackPerElementService {
  private apiServerUrl = environment.apiBaseUrl + "/feedbackperelement";

  constructor(private http: HttpClient) {}

  public getFeedbackPerElementBySubmissionIdAndCriteriaId(submissionId: string, criteriaId: string): Observable<FeedbackPerElement> {
    return this.http.get<FeedbackPerElement>(`${this.apiServerUrl}/${submissionId}/${criteriaId}`);
  }

  public getFeedbackPerElementBySubmissionId(submissionId: string): Observable<FeedbackPerElement[]> {
    return this.http.get<FeedbackPerElement[]>(`${this.apiServerUrl}/${submissionId}`);
  }


  public addFeedbackPerElement(feedbackPerElement:any) {
    return this.http.post(`${this.apiServerUrl}`, feedbackPerElement, { responseType: 'text' });
  }

  public editFeedbackPerElement(feedbackPerElement: any){
    return this.http.put(`${this.apiServerUrl}/${feedbackPerElement.submissionId}/${feedbackPerElement.criteriaId}`,
      feedbackPerElement, { responseType: 'text' });
  }
}
