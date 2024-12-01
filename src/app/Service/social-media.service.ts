import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SocialMedia} from "../Models/socialMedia";
import {User} from "../Models/user";

@Injectable({
  providedIn: 'root'
})
export class SocialMediaService {

  private apiServerUrl: string = environment.apiBaseUrl + "/social-media";

  constructor(private http: HttpClient) {
  }

  public getSocialMediaByUser(username: string): Observable<SocialMedia[]> {
    return this.http.get<SocialMedia[]>(`${this.apiServerUrl}/user/${username}`);
  }

  public getSocialMediaByUserAndCategory(username: string, category: string): Observable<SocialMedia> {
    return this.http.get<SocialMedia>(`${this.apiServerUrl}/user/${username}/category/${category}`);
  }

  public addSocialMedia(socialMedia: any): Observable<SocialMedia> {
    return this.http.post<SocialMedia>(`${this.apiServerUrl}`, socialMedia);
  }

  public updateSocialMedia(id: string, socialMedia: any): Observable<SocialMedia> {
    return this.http.put<SocialMedia>(`${this.apiServerUrl}/${id}`, socialMedia);
  }
}
