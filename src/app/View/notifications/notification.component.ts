import {Component, Input, OnInit} from "@angular/core";
import {UserNotification} from "../../Models/notification";
import {NotificationService} from "../../Service/notification.service";
import {User} from "../../Models/user";
import {IsUserLoggedInService} from "../../Service/isUserLoggedIn.service";
import {NgForOf, NgIf} from "@angular/common";
import {UserService} from "../../Service/user.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-notification',
  standalone: true,
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',

  imports: [
    NgIf,
    NgForOf
  ]
})

export class NotificationComponent implements OnInit{
  public notifications: UserNotification[] = [];
  public user: User;

  constructor(private notificationService: NotificationService, private userService: UserService) {
  }
  ngOnInit() {
    this.getUserFromDB();
  }

  private getUserFromDB():void {
    this.userService.getUserByMailWithJWT().subscribe(
      (response: any) => {
        this.user = response;
        this.getUnreadNotifications(this.user.id)
      }
    );
  }

  private getUnreadNotifications(userId: string): void {
    this.notificationService.getUnreadNotificationsByUserId(userId).subscribe({
      next: (notifications: UserNotification[]) => {
        this.notifications = notifications;
        this.reverseNotifications();
      },
      error: (error: any) => {
        console.error('Error fetching notifications', error);
      }
    });
  }

  private reverseNotifications(): void {
    this.notifications = this.notifications.reverse();
  }

  public markNotificationAsRead(notification: UserNotification): void {
    this.notificationService.markAsRead(notification.id).subscribe({
      next: (message: String) => {
        this.notifications = this.notifications.filter(n => n.id !== notification.id);
      },
      error: (error: any) => {
        console.error('Error marking notification as read', error);
      }
    });
  }

}
