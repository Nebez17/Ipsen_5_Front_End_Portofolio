import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../Models/user";
import {UserNotification} from "../Models/notification";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private apiServerUrl = environment.apiBaseUrl + "/notification";

  constructor(private http: HttpClient) {}

  public getUnreadNotificationsByUserId(userId: string): Observable<UserNotification[]> {
    return this.http.get<UserNotification[]>(`${this.apiServerUrl}/${userId}`);
  }

  public createNotification(notification: UserNotification): Observable<UserNotification> {
    return this.http.post<UserNotification>(`${this.apiServerUrl}/create`, notification);
  }

  public createNotificationForRole(message: String, role: String): Observable<String> {
    return this.http.post<String>(`${this.apiServerUrl}/createForRole/${role}`, { message });
  }

  public markAsRead(notificationId: number): Observable<String> {
    return this.http.put<String>(`${this.apiServerUrl}/markAsRead/${notificationId}`, { id: notificationId });
  }

}
