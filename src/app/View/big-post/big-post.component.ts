import {Component, Input} from '@angular/core';
import {Post} from "../../Models/post";
import {NgIf} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {StarsComponent} from "../stars/stars.component";

@Component({
  selector: 'app-big-post',
  standalone: true,
  templateUrl: './big-post.component.html',
  imports: [
    NgIf,
    RouterLinkActive,
    StarsComponent,
    RouterLink
  ],
  styleUrl: './big-post.component.scss'
})
export class BigPostComponent {
  @Input() bigPost: Post;
}
