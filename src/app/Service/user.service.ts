import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient, HttpHeaders, provideHttpClient} from "@angular/common/http";
import {User} from "../Models/user";
import {Observable, catchError, throwError} from "rxjs";
import {IsUserLoggedInService} from "./isUserLoggedIn.service";
import {Reaction} from "../Models/reaction";
import {Post} from "../Models/post";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiServerUrl: string = environment.apiBaseUrl + "/users";
  token: string | null = null
  info: any = {}

  constructor(private http: HttpClient) {
  }

  public getInfoFromToken ():void {
    this.token = IsUserLoggedInService.getToken()
    if (this.token != null) {
      const temp = atob(this.token.split('.')[1]);
      this.info = JSON.parse(temp)
    }
  }
  public getUserByMailWithJWT(): any {
    this.getInfoFromToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    const mail = this.info.email;
    return this.http.get(`${this.apiServerUrl}/mail/${mail}`, { headers })
      .pipe(
        catchError((error: any) => {
          console.error('Error details:', error.message);
          return throwError(error);
        })
      );
  }

  public editUserById(user: User): any {
    return this.http.put(`${this.apiServerUrl}/${user.id}`, user);
  }

  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiServerUrl}`)
  }

  public getUserByUsername(username: string): any {
    return this.http.get<User>(`${this.apiServerUrl}/username/${username}`)
  }
  public getUserByMail(email: string): any {
    return this.http.get<User>(`${this.apiServerUrl}/mail/${email}`)
  }

  public setRoleUser(user: User, roleId: string){
    return this.http.put<User>(`${this.apiServerUrl}/role/${roleId}`, user)
  }
}
