import { Component } from '@angular/core';
import {NgIf} from "@angular/common";
import {SignInComponent} from "./sign-in/sign-in.component";
import {LoginComponent} from "./login/login.component";
import {AuthenticationService} from "../../Service/authentication.service";
import {Router} from "@angular/router";
import {InputValidationService} from "../../Service/inputValidation.service";
import {IsUserLoggedInService} from "../../Service/isUserLoggedIn.service";

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [
    NgIf,
    SignInComponent,
    LoginComponent
  ],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.scss'
})
export class AuthenticationComponent {
  public wantToLogin: boolean = true;
  public captchaPassed: boolean = false;
  public loginObj: any = {
    "email": "",
    "password": ""
  };
  public registerObj: any = {
    "first_name": "",
    "last_name": "",
    "email": "",
    "password": "",
    "password_confirm": "",
  };

  constructor(
    private isUserLoggedInService: IsUserLoggedInService,
    private authenticationService: AuthenticationService,
              private router: Router,
              private inputValidationService: InputValidationService
  ) {}

  public onSwitchMode(): void {
    this.wantToLogin = !this.wantToLogin;
  }

  public wasCaptchaSuccesful(captchaResponse: string): void {
    if (captchaResponse){
      this.captchaPassed = true;
    }
  }

  public onLoginOrRegister(): void {
    if (this.wantToLogin
      // && this.captchaPassed
    ) {
      this.userLogin();
    }
    else if (!this.wantToLogin && this.registerObj.password === this.registerObj.password_confirm){
      this.userRegister();
    }
  }

  public userLogin(): void {
    this.authenticationService.loginUser(this.loginObj).subscribe((res: any) => {
      sessionStorage.setItem('loginToken', res.token);
      this.isUserLoggedInService.setUser()
      // window.location.reload()
      this.router.navigateByUrl('/home');
    });
  }

  public userRegister(): void {
    this.authenticationService.registerUser(this.registerObj).subscribe((res: any) => {
      sessionStorage.setItem('loginToken', res.token);
      this.router.navigateByUrl('/home');
    });
  }

  public isFormValid(): boolean {
    if (this.wantToLogin) {
      return this.loginObj.email !== "" && this.loginObj.password !== "";
    } else {
      return this.inputValidationService.isValidPassword(this.registerObj.password_confirm) &&
        this.inputValidationService.isValidPassword(this.registerObj.password) &&
        this.inputValidationService.isValidEmail(this.registerObj.email) &&
        this.inputValidationService.isValidTextInput(this.registerObj.first_name) &&
        this.inputValidationService.isValidTextInput(this.registerObj.last_name) &&
        this.inputValidationService.isValidTextInput(this.registerObj.username) &&
        this.registerObj.password === this.registerObj.password_confirm;
    }
  }
}
