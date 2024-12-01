import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "./user.service";
import {IsUserLoggedInService} from "./isUserLoggedIn.service";
import {RolePrivilegesService} from "./role-privileges.service";
import {catchError, map, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CheckRightsService {

  constructor(private router: Router,
              private userService: UserService,
              private rolePrivilegeService: RolePrivilegesService) {}


  private doesUserHaveRight(roleId: string, right: string):void {
    this.rolePrivilegeService.doesCombinationRoleRightsExist(roleId, right).subscribe(
      (response: any) => {
        return true;
      },
      (error: any) => {
        return this.noAccess();
      }
    )
  }

  public getUserRole(right: string): void{
    this.userService.getUserByMailWithJWT().subscribe(
      (response: any) => {
        this.doesUserHaveRight(response.role.id, right);
      },
      (error: any) => {
        this.noAccess();
      }
    );
  }

  public noAccess():boolean{
    this.router.navigate(['/home']);
    return false;
  }

  public doesUserHaveRightReturn(roleId: string, right: string): Observable<boolean> {
    return this.rolePrivilegeService.doesCombinationRoleRightsExist(roleId, right).pipe(
      map((response: any) => {
        return true;
      }),
      catchError((error: any) => {
        return of(false);
      })
    );
  }
}
