import {inject, Injectable} from '@angular/core';
import {CanActivateFn} from '@angular/router';
import {IsUserLoggedInService} from "../Service/isUserLoggedIn.service";
import {CheckRightsService} from "../Service/check-rights.service";

@Injectable({
  providedIn: 'root'
})

class CanUserSeeSubmissionsGuard {
  constructor(private checkRightsService: CheckRightsService,
              private isUserLoggedInService: IsUserLoggedInService,
  ) {}

  canActivate(): any {
    if (this.isUserLoggedInService.hasToken()){
      this.checkRightsService.getUserRole("GUARD_SUBMISSIONS");
    }
    else {
      return this.checkRightsService.noAccess();
    }
  }
}

export const canUserSeeSubmissions: CanActivateFn = (): boolean => {
  return inject(CanUserSeeSubmissionsGuard).canActivate();
}

