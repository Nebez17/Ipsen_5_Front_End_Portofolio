import {Component, Input, OnInit} from '@angular/core';
import {CommonModule, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {InputValidationService} from "../../Service/inputValidation.service";
import {IsUserLoggedInService} from "../../Service/isUserLoggedIn.service"
import {User} from "../../Models/user";
import {UserService} from "../../Service/user.service";
import {SubmissionService} from "../../Service/submission.service";
import {firstValueFrom, Observable} from "rxjs";
import {Submission} from "../../Models/submission";
import { NgxPayPalModule, IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { environment } from '../../environment/environment';


@Component({
  selector: 'app-submit-content',
  standalone: true,
  imports: [
    NgIf,
    CommonModule,
    ReactiveFormsModule,
    RouterLinkActive,
    RouterLink,
    FormsModule,
    NgxPayPalModule,
  ],
  templateUrl: './submit-content.component.html',
  styleUrl: './submit-content.component.scss'
})
export class SubmitContentComponent implements OnInit{
  public user: User = {} as User;
  public text: string = '';
  public extraFeedback: boolean = true;
  @Input() public submissionObj: any = {
    "username": "",
    "name": "",
    "email": "",
    "online_profiles": "",
    "title": "",
  }
  public name: string;
  public email: string;
  public online_profiles: string;
  public story_title: string = "";
  public type: string = "Text";
  public wordCount: number;
  public genre: string = 'Romance';
  public additional_notes: string;
  public preffered_destination: string = "No Destination";
  public platform_presence: boolean = false;
  public express_experience: boolean = false;
  public totalprice: number = 5;
  public selectedFile: File | null = null;
  selectedFileName: string | null = null;

  public consentGiven: boolean = false

  public payPalConfig ? : IPayPalConfig;

  constructor(private router: Router, private inputValidationService:InputValidationService, public isUserLoggedInService: IsUserLoggedInService,
              private userService: UserService, private submitService: SubmissionService) {

  }

  public onOnline_profilesChange() {
    this.online_profiles = this.submissionObj.online_profiles;
  }




  public ngOnInit(): void {
    this.initConfig();

    this.userService.getUserByMailWithJWT().subscribe(
      (data: User) => {
        this.user = data;
        this.name = this.user.first_name;
        this.email = this.user.email;
      }
    );

    }

  public updateTotalPrice() {
    this.totalprice = 0;
    if (this.extraFeedback) {
      this.totalprice += 5;
    }
    if (this.express_experience) {
      this.totalprice += 5;
    }
  }

  public onExpressExperienceChange(event: any) {
    this.express_experience = event.target.value === 'Yes, I want an express experience.';
    this.updateTotalPrice();
  }
  public handleFeedbackSelection(event: any) {
    this.extraFeedback = event.target.value === "true";
    this.updateTotalPrice()
  }
  public onPlatformPresenceChange(event: any) {
    this.platform_presence = event.target.value === 'Yes, I consent.';
  }
  public isValidTextInput(textInput: string): boolean{
    if (textInput.trim() != '') {
      return this.inputValidationService.isValidTextInput(textInput);
    }
    return false;
  }

  public isValidEmail(email: string): boolean {
    if (email.trim() != '') {
    return this.inputValidationService.isValidEmail(email);
    }
    return true;
  }

  public async createSubmission(): Promise<void> {
    const createdSubmissionObserver: Observable<Submission> = this.sendSubmissionToBackend();
    const createdSubmission: Submission = await firstValueFrom(createdSubmissionObserver);
    await this.sendFileToBackend(createdSubmission.id);
    this.router.navigate(['/submissions']);
  }
  public onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
      this.selectedFileName = this.selectedFile.name;
    } else {
      this.selectedFileName = null;
    }
  }
  public sendFileToBackend(submissionId: string):void{
    if (!this.selectedFile) {
      return
    }
    this.submitService.uploadSubmissionrPdf(this.selectedFile, submissionId).subscribe(
      () => {
        this.selectedFile;
      }
    );
  }
  public sendSubmissionToBackend(): Observable<Submission> {
    const newSubmission = {
      name: this.name,
      email: this.email,
      online_profiles: this.online_profiles,
      story_title: this.story_title,
      type: this.type,
      wordCount: this.wordCount,
      genre: this.genre,
      additional_notes: this.additional_notes,
      prefferd_destination: this.preffered_destination,
      platform_presence: this.platform_presence,
      extra_feedback: this.extraFeedback,
      express_experience: this.express_experience,
      story_Details: this.additional_notes,
      statusID: {
        "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
      },
      user_id: {
        id: this.user.id,
      },
    }
    return this.submitService.placeSubmission(newSubmission)
  }

  public submissionValidityCheck(): boolean {
    if (
      this.isValidTextInput(this.user.username) &&
      this.isValidTextInput(this.name) &&
      this.isValidEmail(this.email) &&
      this.isValidTextInput(this.submissionObj.online_profiles) &&
      this.isValidTextInput(this.story_title) &&
      this.consentGiven &&
      this.selectedFile
    ) {
      return true
    } else {
      return false
    }
  }

  private initConfig(): void {
    this.payPalConfig = {
        currency: 'EUR',
        clientId: environment.paypall_client_id,
        createOrderOnClient: (data) => < ICreateOrderRequest > {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'EUR',
                    value: this.totalprice.toString(),
                    breakdown: {
                        item_total: {
                            currency_code: 'EUR',
                            value: this.totalprice.toString()
                        }
                    }
                },
                items: [{
                    name: 'Story submission',
                    quantity: '1',
                    category: 'DIGITAL_GOODS',
                    unit_amount: {
                        currency_code: 'EUR',
                        value: this.totalprice.toString(),
                    },
                }]
            }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        onApprove: (data, actions) => {
            actions.order.get().then((details: any) => {
            });

        },
        onClientAuthorization: (data) => {

            this.createSubmission();
        },
        onCancel: (data, actions) => {

        },
        onError: err => {

        },
        onClick: (data, actions) => {

        }
    };
}

}
