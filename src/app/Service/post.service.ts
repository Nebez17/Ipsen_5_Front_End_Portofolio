import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "../Models/post";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiServerUrl = environment.apiBaseUrl + "/post";

  constructor(private http: HttpClient) {}

  public getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiServerUrl}`);
  }

  public getPostsByPrefferedDestination(prefferedDestination: any): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiServerUrl}/destination/${prefferedDestination}`);
  }

  public getPostsByUser(username: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiServerUrl}/user/${username}`);
  }

  public getPostById(postId: string):Observable<Post>  {
    return this.http.get<Post>(`${this.apiServerUrl}/${postId}`);
  }

  public searchPostsByTitle(query: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiServerUrl}/search/` + query);
  }

  public addPost(post: any):Observable<string>{
    return this.http.post(`${this.apiServerUrl}`, post, { responseType: 'text' });
  }

  public deletePost(postId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/${postId}`);
  }
}
