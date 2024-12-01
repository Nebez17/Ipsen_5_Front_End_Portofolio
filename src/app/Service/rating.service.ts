import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Rating} from "../Models/rating";

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  private apiServerUrl = environment.apiBaseUrl + "/rating";

  constructor(private http: HttpClient) {}

  public getRatingsByPostId(postId: string): Observable<Rating[]> {
    return this.http.get<Rating[]>(`${this.apiServerUrl}/${postId}`);
  }

  public placeRating(rating:any) {
    return this.http.post(`${this.apiServerUrl}`, rating, { responseType: 'text' });
  }
}
