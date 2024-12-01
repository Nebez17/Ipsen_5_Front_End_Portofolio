import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {StarsComponent} from "../stars/stars.component";
import {NgForOf, NgIf, SlicePipe} from "@angular/common";
import {PostService} from "../../Service/post.service";
import {Post} from "../../Models/post";

@Component({
  selector: 'app-home-screen',
  standalone: true,
    imports: [
        RouterLink,
        RouterLinkActive,
        StarsComponent,
        NgForOf,
        NgIf,
        SlicePipe
    ],
  templateUrl: './home-screen.component.html',
  styleUrl: './home-screen.component.scss'
})
export class HomeScreenComponent implements OnInit{
  public highestRatedPosts: Post[] = [];
  private bestRatedPostsAmountShown = 3;
  public highestRatedPostsIndex: number = 0;
  public currentPost: Post;

  constructor(private postService: PostService) {
  }

  public ngOnInit(): void {
    this.postService.getPosts().subscribe(data => {
      this.setHighestRatedPosts(data);
    })

  }

  public setHighestRatedPosts(posts: Post[]): void{
    this.highestRatedPosts = posts.sort((a, b) => b.averageRating - a.averageRating)
    this.highestRatedPosts = this.highestRatedPosts.slice(0, this.bestRatedPostsAmountShown)
    this.currentPost = this.highestRatedPosts[this.highestRatedPostsIndex];
  }

  public nextItem():void {
    this.highestRatedPostsIndex = (this.highestRatedPostsIndex + 1) % this.highestRatedPosts.length;
    this.currentPost = this.highestRatedPosts[this.highestRatedPostsIndex];
  }

  public previousItem():void {
    this.highestRatedPostsIndex = (this.highestRatedPostsIndex - 1 + this.highestRatedPosts.length) % this.highestRatedPosts.length;
    this.currentPost = this.highestRatedPosts[this.highestRatedPostsIndex];
  }
}
