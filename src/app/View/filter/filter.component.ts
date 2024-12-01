import { Component, EventEmitter, Input, Output } from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Post } from '../../Models/post';
import {NgxSliderModule, Options} from '@angular-slider/ngx-slider';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    ReactiveFormsModule,
    NgxSliderModule
  ]
})
export class FilterComponent {
  @Input() genres: string[];
  @Input() filterForm: FormGroup;
  @Input() posts: Post[];
  @Output() filterApplied = new EventEmitter<any[]>();
  private filteredPosts: Post[] = [];
  public minRating: number = 1;
  public maxRating: number = 5;
  public sliderOptions: Options = {
    floor: 1,
    ceil: 5,
    step: 1,
  };

  public applyFilter(): void {
    const selectedGenres = this.filterForm.value.genre
      .map((checked: boolean, i: number) => checked ? this.genres[i] : null)
      .filter((v: string | null) => v !== null);

    const searchInput = this.filterForm.value.search.toLowerCase();

    const selectedDate = this.filterForm.value.date ? new Date(this.filterForm.value.date) : null;

    this.filteredPosts = this.posts.filter(post => {
      return (!selectedGenres.length || selectedGenres.some((genre: string) => post.genres.includes(genre))) &&
        (post.averageRating >= this.minRating && post.averageRating <= this.maxRating) &&
        (post.title.toLowerCase().includes(searchInput) || post.user.username.toLowerCase().includes(searchInput)) &&
        (!selectedDate || new Date(post.localDate) >= selectedDate);
    });

    this.filterApplied.emit(this.filteredPosts);
  }

}
