import {Component, OnInit} from '@angular/core';
import {SubmissionService} from "../../Service/submission.service";
import {ActivatedRoute} from "@angular/router";
import {Submission} from "../../Models/submission";
import {RubricElementComponent} from "../rubric-element/rubric-element.component";
import {NgForOf, NgIf} from "@angular/common";
import {RubricService} from "../../Service/rubric.service";
import {Criteria} from "../../Models/criteria";
import {DomSanitizer} from "@angular/platform-browser";
import {RubricsComponent} from "../rubrics/rubrics.component";
@Component({
  selector: 'app-feedback-with-text',
  standalone: true,
  templateUrl: './feedback-with-text.component.html',
  imports: [
    RubricElementComponent,
    NgForOf,
    NgIf,
    RubricsComponent
  ],
  styleUrl: './feedback-with-text.component.scss'
})
export class FeedbackWithTextComponent implements OnInit{
  private submissionId: string | null;
  public submission: Submission;
  public allCriteria: Criteria[];
  public pdfUrl: any = null;
  public pdfBlob: any = null;
  public isUserReviewer: boolean;

  constructor(private route: ActivatedRoute,
              private submissionService: SubmissionService,
              private rubricService: RubricService,
              private sanitizer: DomSanitizer
  ) { }

  public ngOnInit() :void{
    this.getSubmissionId();
    this.getSubmissionWithId();
    this.getSubmissionPDF()
  }

  private getSubmissionId():void{
    this.route.queryParamMap.subscribe(params => {
      this.submissionId = params.get('submissionId');
      const stringIsUserReview = params.get('isUserReviewer')
      this.isUserReviewer = stringIsUserReview === "true"
    })
  }

  private getSubmissionWithId():void{
    if (this.submissionId) {
      this.submissionService.getSubmissionById(this.submissionId).subscribe(
        (data: Submission) => {
          this.submission = data;
          this.getCriteriaWithRubricId(this.submission.rubric.id)
        }
      )
    }
  }

  private getCriteriaWithRubricId(rubricId: string):void{
    this.rubricService.getCriteriaByRubricId(rubricId).subscribe(
      (data: Criteria[]) => {
        this.allCriteria = data;
      }
    )
  }
  private getSubmissionPDF(): void {
    this.submissionService.getSubmissionPDFById(this.submissionId).subscribe(
      (pdfBlob: ArrayBuffer): void => {
        const blob = new Blob([pdfBlob], { type: 'application/pdf' });
        this.pdfBlob = blob;

        if (this.pdfUrl) {
          URL.revokeObjectURL(this.pdfUrl as string);
        }
        this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob));
      }
    );
  }

}
