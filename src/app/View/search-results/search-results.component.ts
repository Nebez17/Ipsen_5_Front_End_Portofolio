import { Component, Input } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {PostComponent} from "../post/post.component";
import {Post} from "../../Models/post";
import {PostService} from "../../Service/post.service";
import {BulkOfPostsComponent} from "../bulk-of-posts/bulk-of-posts.component";

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [NgIf, NgForOf, PostComponent, BulkOfPostsComponent],
  templateUrl: 'search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent {
  searchTerm: string | null = null;
  searchResults: Post[] = [];

  constructor(private route: ActivatedRoute, private postService: PostService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['q'];
      if (this.searchTerm) {
        this.performSearch(this.searchTerm);
      }
    });
  }

  performSearch(term: string): void {
    this.postService.searchPostsByTitle(term).subscribe(results => {
      this.searchResults = results;
    });
  }

}
