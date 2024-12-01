import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {NgIf} from "@angular/common";
import {RecaptchaModule} from 'ng-recaptcha';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatIcon,
    NgIf,
    RecaptchaModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  @Input() public loginObj: any = {
    "email": "",
    "password": "",
  }
  public showPassword:boolean = false;

}
