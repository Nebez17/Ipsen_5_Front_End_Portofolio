import {Component} from '@angular/core';
import {ArticleOptionComponent} from "../article-option/article-option.component";
import {CommonModule, NgClass} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {StarsComponent} from "../stars/stars.component";


@Component({
  selector: 'app-official-selection',
  standalone: true,
  imports: [
    NgClass,
    CommonModule,
    RouterLink,
    StarsComponent,
    RouterLinkActive,
    ArticleOptionComponent
  ],
  templateUrl: './official-selection.component.html',
  styleUrl: './official-selection.component.scss'
})
export class OfficialSelectionComponent{
}
