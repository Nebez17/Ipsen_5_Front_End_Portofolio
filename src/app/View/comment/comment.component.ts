import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Reaction} from "../../Models/reaction";
import {MatIcon} from "@angular/material/icon";
import {ReactionService} from "../../Service/reaction.service";
import {UserService} from "../../Service/user.service";
import {User} from "../../Models/user";
import {IsUserLoggedInService} from "../../Service/isUserLoggedIn.service";
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Post} from "../../Models/post";

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [
    MatIcon,
    NgIf,
    FormsModule
  ],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent implements OnInit{
  @Input() reaction: Reaction;
  @Input() post: Post;
  @Output() reactionDeleted = new EventEmitter<string>();
  public user: User;
  public isLoggedIn: boolean = false;
  public editing: boolean = false;
  public editText: string;

  constructor(private reactionService: ReactionService,
              private userService: UserService,
              private isUserLoggedInService: IsUserLoggedInService) {
  }

  public ngOnInit():void {
    this.editText = this.reaction.text;
    if(this.isUserLoggedInService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.userService.getUserByMailWithJWT().subscribe((data: User) => {
          this.user = data;
        }
      )
    }
  }

  public deleteReaction():void {
    if (confirm('Are you sure you want to delete this reaction?')){
      this.reactionService.deleteReaction(this.reaction.id).subscribe((data: string) => {
        this.reactionDeleted.emit(this.reaction.id);
      })
    }
  }

  public editMode():void {
    this.editing = !this.editing;
  }

  public editReaction():void {
    const standardReaction = {
      text: this.editText,
      user_id: {
        id: this.user.id,
      },
      post_id: {
        id: this.post.id
      }
    }

    this.reactionService.editReaction(this.reaction.id, standardReaction).subscribe(
      response => {
        this.reaction.text = this.editText;
        this.editMode();
      }
    )
  }
}
