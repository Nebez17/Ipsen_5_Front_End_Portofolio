import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import {NavigationBarComponent} from "./View/navigation-bar/navigation-bar.component";
import {FooterComponent} from "./View/footer/footer.component";
import {NgxSliderModule} from "@angular-slider/ngx-slider";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavigationBarComponent, FooterComponent, NgxSliderModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
