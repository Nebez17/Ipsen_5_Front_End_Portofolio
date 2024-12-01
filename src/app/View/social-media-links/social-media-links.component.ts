import {Component, Input} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {SocialMedia} from "../../Models/socialMedia";

@Component({
  selector: 'app-social-media-links',
  standalone: true,
  templateUrl: './social-media-links.component.html',
  imports: [
    NgForOf,
    NgIf,
    NgClass
  ],
  styleUrl: './social-media-links.component.scss'
})
export class SocialMediaLinksComponent {
  @Input() socialMedias: SocialMedia[];
  @Input() iconSizeTwitter: string;
  @Input() iconSizeGeneral: string;
}
