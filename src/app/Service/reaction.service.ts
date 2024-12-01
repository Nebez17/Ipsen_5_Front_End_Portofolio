import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "../Models/post";
import {Reaction} from "../Models/reaction";

@Injectable({
  providedIn: 'root'
})
export class ReactionService {

  private apiServerUrl = environment.apiBaseUrl + "/reaction";

  constructor(private http: HttpClient) {}

  public getReactionsByPostId(postId: string): Observable<Reaction[]> {
    return this.http.get<Reaction[]>(`${this.apiServerUrl}/post/${postId}`);
  }

  public placeReaction(reaction:any): Observable<string> {
    return this.http.post(`${this.apiServerUrl}`, reaction, { responseType: 'text' });
  }

  public editReaction(id:string, reaction:any): Observable<string> {
    return this.http.put(`${this.apiServerUrl}/${id}`, reaction, { responseType: 'text' });
  }

  public deleteReaction(id:string): Observable<string> {
    return this.http.delete(`${this.apiServerUrl}/${id}`, { responseType: 'text' });
  }
}
