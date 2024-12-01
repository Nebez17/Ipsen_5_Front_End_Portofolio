import {Component, Input} from '@angular/core';
import {Post} from "../../Models/post";
import {StarsComponent} from "../stars/stars.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-post',
  standalone: true,
  templateUrl: './post.component.html',
  imports: [
    StarsComponent,
    RouterLink
  ],
  styleUrl: './post.component.scss'
})
export class PostComponent {
  @Input() post: Post;
}
