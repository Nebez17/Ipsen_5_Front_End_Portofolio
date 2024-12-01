import {inject, Injectable} from '@angular/core';
import {CanActivateFn} from '@angular/router';
import {IsUserLoggedInService} from "../Service/isUserLoggedIn.service";
import {CheckRightsService} from "../Service/check-rights.service";

@Injectable({
  providedIn: 'root'
})

class CanUserEditUsersGuard {
  constructor(private checkRightsService: CheckRightsService,
              private isUserLoggedInService: IsUserLoggedInService,
  ) {}

  canActivate(): any {
    if (this.isUserLoggedInService.hasToken()){
      this.checkRightsService.getUserRole("GUARD_USER_ROLES");
    }
    else {
      return this.checkRightsService.noAccess();
    }
  }
}

export const canUserEditUsers: CanActivateFn = (): boolean => {
  return inject(CanUserEditUsersGuard).canActivate();
}

