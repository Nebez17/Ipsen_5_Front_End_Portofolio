import { Component } from '@angular/core';
import {ArticleOptionComponent} from "../article-option/article-option.component";

@Component({
  selector: 'app-sandbox',
  standalone: true,
  imports: [
    ArticleOptionComponent
  ],
  templateUrl: './sandbox.component.html',
  styleUrl: './sandbox.component.scss'
})
export class SandboxComponent {

}
