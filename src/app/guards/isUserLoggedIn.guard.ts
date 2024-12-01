import {inject, Injectable} from '@angular/core';
import {CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {UserService} from "../Service/user.service";
import {User} from "../Models/user";
import {IsUserLoggedInService} from "../Service/isUserLoggedIn.service";

@Injectable({
  providedIn: 'root'
})

 class IsUserLoggedInGuard {
  private user: User;
  constructor(private router: Router,
              private userService: UserService,
              private isUserLoggedInService: IsUserLoggedInService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.isUserLoggedInService.hasToken()){
      return this.userService.getUserByMailWithJWT().subscribe(
        (response: any) => {
          this.user = response;
          return true;
        },
        (error: any) => {
          console.error('Error:', error);
          return this.noAcces();
        }
      );
    }
    else {
      return this.noAcces();
    }
  }

  private noAcces():boolean{
    this.router.navigate(['/home']);
    return false;
  }
}

export const isUserLoggedInGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(IsUserLoggedInGuard).canActivate(route, state);
}

