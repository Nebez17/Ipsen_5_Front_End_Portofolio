import { Component } from '@angular/core';
import {ArticleOptionComponent} from "../article-option/article-option.component";

@Component({
  selector: 'app-babels-choice-screen',
  standalone: true,
  imports: [
    ArticleOptionComponent
  ],
  templateUrl: './babels-choice-screen.component.html',
  styleUrl: './babels-choice-screen.component.scss'
})
export class BabelsChoiceScreenComponent {

}
