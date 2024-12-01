import {Component, Input} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {MatIconModule} from '@angular/material/icon';
import {FormsModule} from "@angular/forms";
import {InputValidationService} from "../../../Service/inputValidation.service";
import {UserService} from "../../../Service/user.service";

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    MatIconModule,
    NgIf,
    FormsModule,
    NgClass
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  public showPassword:boolean = false;
  public showConfirmPassword:boolean = false;
  public isUsernameTaken: boolean = false;
  public isCheckingUsername: boolean = false;
  public isEmailTaken: boolean = false;
  public isCheckingMail: boolean = false;
  public isEmailCorrect: boolean = true;
  public isFirstNameCorrect: boolean = true;
  public isLastNameCorrect: boolean = true;
  public isPasswordCorrect: boolean = true;
  public isConfirmPasswordCorrect: boolean = true;
  public isUsernameCorrect: boolean = true;

  @Input() public registerObj: any = {
    "username": "",
    "first_name": "",
    "last_name": "",
    "email": "",
    "password": "",
    "password_confirm": "",
  }

  constructor(private inputValidationService:InputValidationService,
              private userService: UserService) {
  }

  public isValidEmail(): void {
    this.isEmailCorrect = this.inputValidationService.isValidEmail(this.registerObj.email);
  }

  public isValidFirstName(): void {
    this.isFirstNameCorrect = this.inputValidationService.isValidTextInput(this.registerObj.first_name);
  }

  public isValidLastName(): void {
    this.isLastNameCorrect = this.inputValidationService.isValidTextInput(this.registerObj.last_name);
  }

  public isValidUsername(): void {
    this.isUsernameCorrect = this.inputValidationService.isValidTextInput(this.registerObj.username);
  }

  public isValidPassword(): void {
    this.isPasswordCorrect = this.inputValidationService.isValidPassword(this.registerObj.password);
  }

  public isValidConfirmPassword(): void {
    this.isConfirmPasswordCorrect = this.inputValidationService.isValidPassword(this.registerObj.password_confirm);
  }

  public isUsernameAlreadyInDatabase(): void{
    this.isCheckingUsername = true;
    this.userService.getUserByUsername(this.registerObj.username).subscribe(
      (res: any) => {
        this.isUsernameTaken = !!res;
        this.isCheckingUsername = false;
      },
    );
  }

  public isMailAlreadyInDatabase(): void{
    this.isCheckingMail = true;
    this.userService.getUserByMail(this.registerObj.email).subscribe(
      (res: any) => {
        this.isEmailTaken = !!res;
        this.isCheckingMail = false;
      },
    );
  }
}
