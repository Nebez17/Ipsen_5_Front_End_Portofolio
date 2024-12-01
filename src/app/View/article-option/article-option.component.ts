import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Item} from "../../Models/Article-item";
import {CommonModule, NgClass} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {StarsComponent} from "../stars/stars.component";
import {Post} from "../../Models/post";
import {PostService} from "../../Service/post.service";
import {PostComponent} from "../post/post.component";
import {BulkOfPostsComponent} from "../bulk-of-posts/bulk-of-posts.component";
import {FormArray, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {BigPostComponent} from "../big-post/big-post.component";
import {FilterComponent} from "../filter/filter.component";

@Component({
  selector: 'app-article-option',
  standalone: true,
  imports: [
    NgClass,
    CommonModule,
    RouterLink,
    StarsComponent,
    RouterLinkActive,
    PostComponent,
    BulkOfPostsComponent,
    ReactiveFormsModule,
    BigPostComponent,
    FilterComponent
  ],
  templateUrl: './article-option.component.html',
  styleUrl: './article-option.component.scss'
})
export class ArticleOptionComponent implements OnInit {
  public posts: Post[] = [];
  public latestPosts: Post[] = [];
  public bigPost: Post;
  public filterForm: FormGroup;
  public filteredPosts: any[] = [];
  public genres: string[] = ['Fantasy', 'Science', 'Fiction', 'Horror', 'Adventure', 'Mystery', 'Thriller', 'Romance', 'Drama', 'Satire', 'Western', 'Poetry', 'Historical', 'Non-Fiction', 'Erotica'];
  public arePostsFiltered: boolean = false;
  @Input() destination: string;
  constructor(private postService: PostService) { }

  public ngOnInit(): void {
    this.postService.getPostsByPrefferedDestination(this.destination).subscribe(
      (data: Post[]) => {
        this.posts = data;
        this.sortAndSetLatestPosts();
        this.setBigPost();
      }
    );
    this.filterForm = new FormGroup({
      genre: new FormArray([]),
      rating: new FormControl(''),
      search: new FormControl(''),
      date: new FormControl('')
    });
    this.genres.forEach((genre) => {
      (this.filterForm.controls['genre'] as FormArray).push(new FormControl(false));
    });
  }

  private sortAndSetLatestPosts(): void {
    const numberOfLatestPosts:number = 8;
    this.latestPosts = [...this.posts]
      .sort((a, b) => new Date(b.localDate).getTime() - new Date(a.localDate).getTime())
      .slice(0, numberOfLatestPosts);
  }

  private setBigPost(): void {
    const minIndex:number = 0;
    const maxIndex:number = this.posts.length;
    const randomIndex:number = Math.floor(Math.random() * (maxIndex - minIndex)) + minIndex;
    this.bigPost = this.posts[randomIndex];
  }

  public onFilterApplied(filteredPosts: Post[]): void {
    this.filteredPosts = filteredPosts;
    this.arePostsFiltered = true;
  }
}
