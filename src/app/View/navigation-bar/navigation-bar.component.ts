import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {IsUserLoggedInService} from "../../Service/isUserLoggedIn.service";
import {Observable, Subscription} from "rxjs";
import {CommonModule} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import { UserService } from '../../Service/user.service';
import {FormsModule} from "@angular/forms";
import {User} from "../../Models/user";
import {CheckRightsService} from "../../Service/check-rights.service";
import {NotificationService} from "../../Service/notification.service";
import {UserNotification} from "../../Models/notification";

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule,
    MatIcon,
    FormsModule
  ],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss'
})
export class NavigationBarComponent implements OnInit, OnDestroy {
  public isLoggedIn: boolean;
  private loginSubscription: Subscription;
  user: User | null;
  public isDropdownOpen: boolean;
  public canSeeSubmission: boolean;
  public canSeeRoles: boolean;
  public canSeeRolesPerUser: boolean;
  public notifications: UserNotification[] = [];

  constructor(private isUserLoggedInService: IsUserLoggedInService,
              private userService: UserService,
              private router: Router,
              private checkRightsService: CheckRightsService,
              private notificationService: NotificationService,
  ) {}

  public ngOnInit(): void {
    this.setUser()
    this.loginSubscription = this.isUserLoggedInService.isLoggedInObservable.subscribe(status => {
      this.isLoggedIn = status;
      if (this.isUserLoggedInService.isLoggedIn()){
        this.getUserFromDB();
      }
    });
  }

  private getUnreadNotifications(userId: string): void {
    this.notificationService.getUnreadNotificationsByUserId(userId).subscribe({
      next: (notifications: UserNotification[]) => {
        this.notifications = notifications;
      },
      error: (error: any) => {
        console.error('Error fetching notifications', error);
      }
    });
  }

  public setUser(){
    return this.isUserLoggedInService.currentUser.subscribe((user)=>{
      this.user = user;
      if (user) {
        this.canUserGoToThisPage(user);
      }
    })
  }

  private canUserGoToThisPage(user: User):void{
    this.checkRightsService.doesUserHaveRightReturn(user.role.id, "GUARD_SUBMISSIONS").subscribe(
      (canSee: boolean) => {
        this.canSeeSubmission = canSee;
      }
    )
    this.checkRightsService.doesUserHaveRightReturn(user.role.id, "GUARD_USER_ROLES").subscribe(
      (canSee: boolean) => {
        this.canSeeRolesPerUser = canSee;
      }
    )
    this.checkRightsService.doesUserHaveRightReturn(user.role.id, "GUARD_ROLES").subscribe(
      (canSee: boolean) => {
        this.canSeeRoles = canSee;
      }
    )
  }

  public onSearch(searchTerm: string):void {
    if (searchTerm) {
      this.router.navigate(['/search-results'], { queryParams: { q: searchTerm } });
    }
  }

  public ngOnDestroy(): void {
    this.loginSubscription.unsubscribe();
  }

  public toggleDropdown(): void {
    if(this.isDropdownOpen) {
      this.isDropdownOpen = false
    } else {
      this.isDropdownOpen = true
    }
  }

  private getUserFromDB():void {
    this.userService.getUserByMailWithJWT().subscribe(
      (response: any) => {
        this.user = response;
        this.getUnreadNotifications(this.user!.id)
        this.canUserGoToThisPage(response)
      }
    );
  }

  public signOut ():void {
    this.isUserLoggedInService.clearToken()
  }

}
