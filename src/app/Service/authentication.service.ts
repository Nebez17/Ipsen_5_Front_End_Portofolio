import { Injectable } from '@angular/core';
import { environment } from "../environment/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiServerUrl = environment.apiBaseUrl + "/auth";

  constructor(private http: HttpClient) {}

  public loginUser(loginObj: any) {
    return this.http.post(`${this.apiServerUrl}/login`, loginObj);
  }

  public registerUser(registerObj: any) {
    let newRegisterObj:any = {
      "username": registerObj.username,
      "first_name": registerObj.first_name,
      "last_name": registerObj.last_name,
      "email": registerObj.email,
      "password": registerObj.password,
      "donation_link": "https://www.paypal.com"
    };
    return this.http.post(`${this.apiServerUrl}/register`, newRegisterObj);
  }
}
