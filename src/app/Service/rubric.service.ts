import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Criteria} from "../Models/criteria";

@Injectable({
  providedIn: 'root'
})
export class RubricService {

  private apiServerUrl = environment.apiBaseUrl + "/rubric";

  constructor(private http: HttpClient) {}

  public getCriteriaByRubricId(rubricId: string): Observable<Criteria[]> {
    return this.http.get<Criteria[]>(`${this.apiServerUrl}/${rubricId}/criteria`);
  }
}
