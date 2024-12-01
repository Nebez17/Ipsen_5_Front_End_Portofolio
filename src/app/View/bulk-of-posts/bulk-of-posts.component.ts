import {Component, Input} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {PostComponent} from "../post/post.component";
import {Post} from "../../Models/post";
import {NotificationService} from "../../Service/notification.service";
import {UserNotification} from "../../Models/notification";

@Component({
  selector: 'app-bulk-of-posts',
  standalone: true,
  templateUrl: './bulk-of-posts.component.html',
  imports: [
    NgForOf,
    PostComponent,
    NgIf
  ],
  styleUrl: './bulk-of-posts.component.scss'
})
export class BulkOfPostsComponent {
  @Input() posts: Post[];
  @Input() isProfileScreen: boolean = false;
  public isDropdownOpen: boolean[] = [];

  constructor(private notificationService: NotificationService) {
  }

  public ngOnInit() {
    this.isDropdownOpen = this.posts ? this.posts.map(() => false) : [];
  }

  public toggleDropdown(index: number) {
    this.isDropdownOpen[index] = !this.isDropdownOpen[index];
  }

  public requestDeletion(post: Post) {
    const message = `${post.user.username} requested deletion for post titled ${post.title}.`;
    this.notificationService.createNotificationForRole(message, "Admin").subscribe({
    });
  }
}
