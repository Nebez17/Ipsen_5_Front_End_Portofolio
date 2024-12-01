import { Component } from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgIf
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  constructor(private router: Router) { }

  public hideFooter(): boolean {
    return this.router.url === '/sign-in';
  }
}
