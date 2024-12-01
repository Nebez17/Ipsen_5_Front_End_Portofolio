import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Criteria } from '../Models/criteria';

import {environment} from "../environment/environment";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CriteriaService {

  private apiServerUrl = environment.apiBaseUrl + "/criteria";
  constructor(private http: HttpClient) {}
  

  public getCriteriaById(criteriaId: string): Observable<Criteria> {
    return this.http.get<Criteria>(`${this.apiServerUrl}/${criteriaId}`);
  }
}
