import {Component, OnInit} from '@angular/core';
import {UserService} from "../../Service/user.service";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../Models/user";
import {PostService} from "../../Service/post.service";
import {Post} from "../../Models/post";
import {NgForOf, NgIf} from "@angular/common";
import {BulkOfPostsComponent} from "../bulk-of-posts/bulk-of-posts.component";
import {SocialMediaService} from "../../Service/social-media.service";
import {SocialMedia} from "../../Models/socialMedia";
import {SocialMediaLinksComponent} from "../social-media-links/social-media-links.component";


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NgForOf,
    BulkOfPostsComponent,
    NgIf,
    SocialMediaLinksComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{
  public user: User;
  private username:string | null;
  public posts: Post[];
  public socialMedias: SocialMedia[];

  public constructor (private userService: UserService,
                      private route: ActivatedRoute,
                      private postService: PostService,
                      private socialMediaService: SocialMediaService
  ) {
  }

  public ngOnInit(): void {
    this.getUserId();
    this.getUser();
    this.getPostsByUsername();
    this.getSocialMediaByUsername();
  }

  public getUser():void{
    if (this.username) {
      this.userService.getUserByUsername(this.username).subscribe(
        (data: User) => {
          this.user = data;
        }
      );
    }
  }

  public getUserId():void{
    this.route.queryParamMap.subscribe(params => {
      this.username = params.get('username');
    })
  }

  public getPostsByUsername():void{
    if (this.username) {
      this.postService.getPostsByUser(this.username).subscribe(
        (data: Post[]) => {
          this.posts = data;
        }
      );
    }
  }

  public getSocialMediaByUsername():void{
    if (this.username) {
      this.socialMediaService.getSocialMediaByUser(this.username).subscribe(
        (data: SocialMedia[]) => {
          this.socialMedias = data;
        }
      );
    }
  }
}
