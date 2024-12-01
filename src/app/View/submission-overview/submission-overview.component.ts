import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {Submission} from "../../Models/submission";
import {SubmissionService} from "../../Service/submission.service";
import {CheckRightsService} from "../../Service/check-rights.service";
import {User} from "../../Models/user";
import {UserService} from "../../Service/user.service";

@Component({
  selector: 'app-submission-overview',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './submission-overview.component.html',
  styleUrl: './submission-overview.component.scss'
})
export class SubmissionOverviewComponent implements OnInit {
  public submissions: Submission[];
  public isUserReviewer: boolean = false;
  constructor(public dialog: MatDialog,
              private submissionService: SubmissionService,
              private checkRightsService: CheckRightsService,
              private userService: UserService
  ) { }
  public ngOnInit(): void {
    this.getAllSubmission();
    this.getUserFromDB();
  }

  private checkRight(user: User, right: string):void{
    this.checkRightsService.doesUserHaveRightReturn(user.role.id, right).subscribe(
      (canSee: boolean) => {
        if (canSee){
          this.isUserReviewer = canSee;
        }
        else {
          this.submissions = this.submissions.filter(submission => submission.user_id.id === user.id);
        }
      },
      (error: any) => {
        this.submissions = this.submissions.filter(submission => submission.user_id.id === user.id);
      }
    )
  }

  private getUserFromDB():void {
    this.userService.getUserByMailWithJWT().subscribe(
      (response: any) => {
        this.checkRight(response, "REVIEW_SUBMISSIONS")
      }
    );
  }

  private getAllSubmission():void{
    this.submissionService.getSubmissions().subscribe(
      (data: Submission[]) => {
        this.submissions = data;
      }
    )
  }
}
