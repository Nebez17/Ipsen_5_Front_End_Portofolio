import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Role} from "../Models/role";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private apiServerUrl = environment.apiBaseUrl + "/role";

  constructor(private http: HttpClient) {}

  public getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.apiServerUrl}`);
  }

  public getRoleByName(name: string):Observable<Role> {
    return this.http.get<Role>(`${this.apiServerUrl}/${name}`);
  }

  public addRole(role: any) {
    return this.http.post(`${this.apiServerUrl}`, role);
  }

  public editRole(role: Role) {
    return this.http.put(`${this.apiServerUrl}/${role.id}`, role, {responseType: "text"});
  }

  public deleteRole(role: Role) {
    return this.http.delete(`${this.apiServerUrl}/${role.id}`);
  }
}
