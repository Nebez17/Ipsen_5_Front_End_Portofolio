import {Component, OnInit} from '@angular/core';
import {CommentComponent} from "../comment/comment.component";
import {NgForOf, NgIf} from "@angular/common";
import {StarsComponent} from "../stars/stars.component";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Post} from "../../Models/post";
import {PostService} from "../../Service/post.service";
import {ReactionService} from "../../Service/reaction.service";
import {Reaction} from "../../Models/reaction";
import {FormsModule} from "@angular/forms";
import {UserService} from "../../Service/user.service";
import {User} from "../../Models/user";
import {IsUserLoggedInService} from "../../Service/isUserLoggedIn.service";
import {RatingService} from "../../Service/rating.service";
import {Rating} from "../../Models/rating";
import {SocialMediaLinksComponent} from "../social-media-links/social-media-links.component";
import {SocialMedia} from "../../Models/socialMedia";
import {SocialMediaService} from "../../Service/social-media.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "./confirmDialog/confirm-dialog.component";

@Component({
  selector: 'app-article-screen',
  standalone: true,
    imports: [
        CommentComponent,
        NgForOf,
        NgIf,
        StarsComponent,
        FormsModule,
        RouterLink,
        SocialMediaLinksComponent,
    ],
  templateUrl: './article-screen.component.html',
  styleUrl: './article-screen.component.scss'
})
export class ArticleScreenComponent implements OnInit{
  public stars: { filled: boolean }[] = [];
  public post: Post;
  public reactions: any[];
  private postId:string | null;
  public reactionText: string;
  public user: User;
  public isLoggedIn: boolean = false;
  private rating: number;
  public ratingSet: boolean = false;
  public ratings: any[];
  public socialMedias: SocialMedia[];
  public doesUserHaveSocialMedia: boolean = false;

  constructor(private postService: PostService,
              private route: ActivatedRoute,
              private reactionService: ReactionService,
              private userService: UserService,
              private isUserLoggedInService: IsUserLoggedInService,
              private ratingService: RatingService,
              private socialMediaService: SocialMediaService,
              private router: Router,
              private dialog: MatDialog)
  {  }
  public ngOnInit(): void {
    this.initStars();
    this.getPostId();
    if (this.postId) {
      this.postService.getPostById(this.postId).subscribe(
        (data: Post) => {
          this.post = data;
        }
      );
      this.isLoggedIn = this.isUserLoggedInService.isLoggedIn();
      this.getReactions();
      this.getRatings();
      this.getUser();
    }
  }

  private getReactions(): void{
    if (this.postId) {
      this.reactionService.getReactionsByPostId(this.postId).subscribe(
        (data: Reaction[]) => {
          this.reactions = data;
        }
      )
    }
  }

  private getRatings(): void{
    if (this.postId) {
      this.ratingService.getRatingsByPostId(this.postId).subscribe(
        (data: Rating[]) => {
          this.ratings = data;
        }
      )
    }
  }

  private getUser(): void {
    if (this.isLoggedIn) {
      this.userService.getUserByMailWithJWT().subscribe(
        (response: User) => {
          this.user = response;
          this.getSocialMediaByUsername();
        }
      );
    }
  }


  private initStars():void {
    const numberOfStars:number = 5;
    for (let i = 0; i < numberOfStars; i++) {
      this.stars.push({ filled: false });
    }
  }

  public highlightStars(starNumber: number):void {
    if (!this.ratingSet) {
      this.stars.forEach((star, index) => {
        star.filled = index < starNumber;
      });
    }
  }

  public setRating(starNumber: number):void {
    this.rating = starNumber;
    this.ratingSet = true;
    this.highlightStars(starNumber);
    this.sendRatingToBackend();
  }


  private sendRatingToBackend():void {
    const newRating = {
      grade: this.rating,
      post_id: {
        id: this.postId
      },
      user_id: {
        id: this.user.id,
      }
    }
    this.ratingService.placeRating(newRating).subscribe(
      response => {
      },
    )
  }

  public resetStars():void {
    if (!this.ratingSet) {
      this.stars.forEach(star => {
        star.filled = false;
      });
    }
  }
  public formatPostText(text: string): string {
    if (!text) return '';
    return text.replace(/\n/g, '<br>').replace(/ {2}/g, '&nbsp;&nbsp;');
  }

  public getPostId():void{
    this.route.queryParamMap.subscribe(params => {
      this.postId = params.get('postId');
    })
  }
  public placeReaction():void {
    const standardReaction = {
      text: this.reactionText,
      user_id: this.user,
      post_id: {
        id: this.postId
      }
    }
    this.reactionService.placeReaction(standardReaction).subscribe(
      response => {
        this.getReactions();
        this.reactionText = '';
      },
    )
  }

  public getSocialMediaByUsername():void{
    if (this.post.user.username) {
      this.socialMediaService.getSocialMediaByUser(this.post.user.username).subscribe(
        (data: SocialMedia[]) => {
          this.socialMedias = data;
          if (data.length >0) {
            this.doesUserHaveSocialMedia = true;
          }
        }
      );
    }
  }

  public handleReactionDeleted(reactionId: string): void {
    this.reactions = this.reactions.filter(reaction => reaction.id !== reactionId);
  }

  public deletePost(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.postService.deletePost(this.post.id).subscribe(
          response => {
            this.router.navigate(['/']);
          },
        );
      }
    });
  }
}
