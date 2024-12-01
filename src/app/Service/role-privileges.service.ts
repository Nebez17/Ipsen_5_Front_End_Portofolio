import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RolePrivileges} from "../Models/rolePrivileges";
import {Role} from "../Models/role";

@Injectable({
  providedIn: 'root'
})
export class RolePrivilegesService {

  private apiServerUrl = environment.apiBaseUrl + "/rolepriviliges";

  constructor(private http: HttpClient) {}

  public getRolePrivilegesByRoleId(roleId: string): Observable<RolePrivileges[]> {
    return this.http.get<RolePrivileges[]>(`${this.apiServerUrl}/${roleId}`);
  }
  public getAllRolePrivileges(): Observable<RolePrivileges[]> {
    return this.http.get<RolePrivileges[]>(`${this.apiServerUrl}`);
  }

  public doesCombinationRoleRightsExist(role: string, rights: string): Observable<RolePrivileges> {
    return this.http.get<RolePrivileges>(`${this.apiServerUrl}/${role}/${rights}`);
  }

  public postRolePrivilege(rolePrivilege:any) {
    return this.http.post(`${this.apiServerUrl}`, rolePrivilege, {responseType: "text"})
  }

  public deleteRolePrivilege(role: Role, right: string) {
    return this.http.delete(`${this.apiServerUrl}/${role.id}/${right}`, {responseType: "text"})
  }
}
