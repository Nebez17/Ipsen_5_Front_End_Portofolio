import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InputValidationService {

  constructor() {}

  public isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  public isValidPassword(password: string): boolean {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{"':;?/>.<,])(?!.*\s).{8,30}$/;
    return passwordRegex.test(password);
  }
  public isValidTextInput(textInput: string): boolean{
    const textInputRegex = /^(?=.*[a-zA-Z])[a-zA-Z\u00C0-\u017F\s-_]+$/;
    return textInputRegex.test(textInput);
  }

}
