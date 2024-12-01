import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {FormsModule} from "@angular/forms";
import {PostService} from "../../Service/post.service";
import {User} from "../../Models/user";
import {Submission} from "../../Models/submission";
import {ActivatedRoute} from "@angular/router";
import {SubmissionService} from "../../Service/submission.service";
import {RubricService} from "../../Service/rubric.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-make-post',
  standalone: true,
  templateUrl: './make-post.component.html',
  imports: [
    NgForOf,
    MatIcon,
    FormsModule,
    NgIf
  ],
  styleUrl: './make-post.component.scss'
})
export class MakePostComponent implements OnInit{
  public numberOfParagraphs: number[] = [1];
  public paragraphTexts: string[] = [''];
  public submissionId: string | null;
  public submission: Submission;
  public pdfUrl: any = null;
  public pdfBlob: any = null;

  constructor(private postService: PostService,
              private route: ActivatedRoute,
              private submissionService: SubmissionService,
              private sanitizer: DomSanitizer
  ) {
  }

  public ngOnInit():void {
    this.getSubmissionId();
    this.getSubmissionWithId();
  }

  public addParagraph(): void {
    this.numberOfParagraphs.push(this.numberOfParagraphs.length + 1);
    this.paragraphTexts.push('');
  }

  public removeParagraph(): void {
    if (this.numberOfParagraphs.length > 1) {
      this.numberOfParagraphs.pop();
      this.paragraphTexts.pop();
    }
  }

  private getSubmissionId():void{
    this.route.queryParamMap.subscribe(params => {
      this.submissionId = params.get('submissionId');
    })
  }

  private getSubmissionWithId():void{
    if (this.submissionId) {
      this.submissionService.getSubmissionById(this.submissionId).subscribe(
          (data: Submission) => {
            this.submission = data;
            this.getSubmissionPDF();
          }
      )
    }
  }

  private getSubmissionPDF(): void {
    this.submissionService.getSubmissionPDFById(this.submission.id).subscribe(
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

  public submitPost(): void {
    const concatenatedText = this.paragraphTexts.join('\n\n');
    const postObject = {
      title: this.submission.story_title,
      text: concatenatedText,
      prefferedDestination: this.submission.prefferd_destination,
      imageUrl: "https://escapewelt.com/image/catalog/products/v.3/QuestTower/Landing/01.jpg",
      user: this.submission.user_id
    }

    this.postService.addPost(postObject).subscribe(
        response => {
          confirm("Post Added!")
          this.paragraphTexts = [""];
          while (this.numberOfParagraphs.length > 1){
            this.removeParagraph();
          }
        }
    )
  }
}

