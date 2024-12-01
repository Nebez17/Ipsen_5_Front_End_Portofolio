import {Component, Input, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {User} from "../../../Models/user";
import {SocialMediaService} from "../../../Service/social-media.service";
import {UserService} from "../../../Service/user.service";
import {SocialMedia} from "../../../Models/socialMedia";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-add-social-media',
  standalone: true,
  templateUrl: './add-social-media.component.html',
  imports: [
    NgIf,
    FormsModule
  ],
  styleUrl: './add-social-media.component.scss'
})
export class AddSocialMediaComponent implements OnInit{
  @Input() socialMediaIcon: string;
  @Input() socialMediaType: string;
  @Input() category: string = "";
  public user: User;
  public socialMediaAdded: boolean = false;
  public socialMedia: SocialMedia;
  public socialMediaLink: string = "";

  constructor(private socialMediaService: SocialMediaService,
              private userService: UserService) {
  }

  public ngOnInit():void {
    this.getUserFromDB();
  }

  private getUserFromDB() :void {
    this.userService.getUserByMailWithJWT().subscribe(
      (response: any) => {
        this.user = response;
        this.getSocialMediaByUser();
      },
      (error: any) => {
      }
    );
  }

  private getSocialMediaByUser(): void{
    this.socialMediaService.getSocialMediaByUserAndCategory(this.user.username, this.category).subscribe(
      response => {
        if (response) {
          if (response.user) {
            this.socialMedia = response;
            this.socialMediaAdded = true;
            this.socialMediaLink = response.socialMediaLink;
          }
        }
      }
    )
  }

  public addSocialMedia():void {
    const socialMedia = {
      socialMediaCategory: this.category,
      socialMediaLink: this.socialMediaLink,
      user: {
        id: this.user.id
      }
    }
    this.socialMediaService.addSocialMedia(socialMedia).subscribe(
      response => {
        confirm("You have added your social media!")
      }
    )
  }

  public updateSocialMedia():void {
    const newSocialMedia = {
      socialMediaCategory: this.socialMedia.socialMediaCategory,
      socialMediaLink: this.socialMediaLink,
      user: {
        id: this.socialMedia.user.id
      }
    }
    this.socialMediaService.updateSocialMedia(this.socialMedia.id, newSocialMedia).subscribe(
      response => {
        confirm("You have updated your social media!")
      }
    )
  }
}
