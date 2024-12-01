import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Reaction} from "../Models/reaction";
import {Submission} from "../Models/submission";
import {Post} from "../Models/post";

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {

  private apiServerUrl = environment.apiBaseUrl + "/submission";

  constructor(private http: HttpClient) {}

  public getSubmissions(): Observable<Submission[]> {
    return this.http.get<Submission[]>(`${this.apiServerUrl}`);
  }
  public getSubmissionById(submissionId: string): Observable<Submission> {
    return this.http.get<Submission>(`${this.apiServerUrl}/${submissionId}`);
  }
  public getSubmissionPDFById(submissionId: any): any {
    // @ts-ignore
    return this.http.get<Submission>(`${this.apiServerUrl}/${submissionId}/pdf`,{ responseType: 'arraybuffer' });
  }
  public placeSubmission(submission:any): Observable<Submission> {
    return this.http.post<Submission>(`${this.apiServerUrl}`, submission, );
  }
  public uploadSubmissionrPdf(file: File, submissionId: string): Observable<void> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<void>(`${this.apiServerUrl}/${submissionId}/pdf`, formData);
  }


  public getSubmissionsByUserId(userID: string): Observable<Submission[]> {
    return this.http.get<Submission[]>(`${this.apiServerUrl}/user/${userID}`);
  }
}
