import {Component, Input, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Criteria} from "../../Models/criteria";
import {FeedbackPerElementService} from "../../Service/feedback-per-element.service";
import {ActivatedRoute} from "@angular/router";
import {FeedbackPerElement} from "../../Models/feedbackPerElement";
import {MatButton} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-rubric-element',
  templateUrl: './rubric-element.component.html',
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    NgForOf,
    FormsModule,
    MatButton,
    MatIconModule
  ],
  styleUrl: './rubric-element.component.scss'
})
export class RubricElementComponent implements OnInit {
  @Input() criteria: Criteria;
  @Input() isUserReviewer: boolean;
  public reactionsPerElement: string;
  public reactionText: string;
  public isOpen: boolean = false;
  public selectedValue: number;
  private submissionId: string | null;
  private feedbackPerElement: FeedbackPerElement;
  public feedbackAlreadyDone: boolean = false;
  public feedbackAlreadyDoneButton: boolean = false;
  public noTextProvided: boolean = false;
  public noRatingProvided: boolean = false;
  public editMode: boolean = false;

  constructor(private feedbackPerElementService: FeedbackPerElementService,
              private route: ActivatedRoute,) {
  }

  public ngOnInit(): void {
    this.getSubmissionId();
    this.getFeedbackPerElement()
  }

  private getFeedbackPerElement(): void {
    if (this.submissionId) {
      this.feedbackPerElementService.getFeedbackPerElementBySubmissionIdAndCriteriaId(this.submissionId, this.criteria.id).subscribe(
        (data: FeedbackPerElement) => {
          if (data) {
            this.selectedValue = data.grade;
            this.reactionsPerElement = data.feedback;
            this.feedbackPerElement = data;
            this.feedbackAlreadyDone = true;
            this.feedbackAlreadyDoneButton = true;
          }
        }
      )
    }
  }

  private getSubmissionId(): void {
    this.route.queryParamMap.subscribe(params => {
      this.submissionId = params.get('submissionId');
    })
  }

  public toggle(): void {
    this.isOpen = !this.isOpen;
  }

  public addFeedbackPerElement(): void {
    if (this.reactionText && this.selectedValue !== null && this.selectedValue !== undefined) {
      const newFeedbackPerElement = {
        submissionId: this.submissionId,
        criteriaId: this.criteria.id,
        grade: this.selectedValue,
        feedback: this.reactionText
      }
      this.feedbackPerElementService.addFeedbackPerElement(newFeedbackPerElement).subscribe(
        response => {
          this.reactionsPerElement = this.reactionText;
          this.feedbackAlreadyDone = true;
          this.feedbackAlreadyDoneButton = true;
        },
      )
    } else {
      if (!this.reactionText) {
        this.noTextProvided = true;
      }
      if (this.selectedValue == null || this.selectedValue == undefined) {
        this.noRatingProvided = true;
      }
    }
  }

  public onTextChange(): void {
    this.noTextProvided = !this.reactionText;
  }

  public onRatingChange(value: number): void {
    this.selectedValue = value;
    this.noRatingProvided = false;
  }

  public editFeedback(): void {
    if (this.editMode) {
      if (this.reactionText && this.selectedValue !== null && this.selectedValue !== undefined) {
        const newFeedbackPerElement = {
          submissionId: this.submissionId,
          criteriaId: this.criteria.id,
          grade: this.selectedValue,
          feedback: this.reactionText
        }
        this.feedbackPerElementService.editFeedbackPerElement(newFeedbackPerElement).subscribe(
          response => {
            this.editMode = !this.editMode
            this.feedbackAlreadyDone = !this.feedbackAlreadyDone;
            this.reactionsPerElement = this.reactionText;
          })
      }
      else {
        return
      }
    }
    if (!this.editMode) {
      this.reactionText = this.reactionsPerElement;
      this.feedbackAlreadyDone = !this.feedbackAlreadyDone;
      this.editMode = !this.editMode
    }
  }
}
