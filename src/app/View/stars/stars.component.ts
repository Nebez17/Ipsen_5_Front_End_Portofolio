import { Component, Input } from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-stars',
  standalone: true,
  imports: [NgIf],
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss']
})
export class StarsComponent {
  @Input() average_rating: number = 0;
}
