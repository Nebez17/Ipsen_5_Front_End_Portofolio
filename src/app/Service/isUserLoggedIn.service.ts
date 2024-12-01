import { Injectable } from '@angular/core';
import {BehaviorSubject, interval, Observable, of} from "rxjs";
import {jwtDecode} from "jwt-decode";
import {User} from "../Models/user";
import {UserService} from "./user.service";

const TOKEN = 'loginToken';
const USER = 'loginToken';

@Injectable({
  providedIn: 'root'
})

export class IsUserLoggedInService {
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.hasToken());
  private userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(private userService: UserService,) {
    this.isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
      this.isLoggedInSubject.next(this.hasToken());
    this.setUser()

  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN);
    window.sessionStorage.setItem(TOKEN, token);
    this.isLoggedInSubject.next(true);
  }
  public hasToken(): boolean {
    return sessionStorage.getItem(TOKEN) !== null;
  }

  setUser():void {
    this.userService.getUserByMailWithJWT().subscribe(
      (response: any) => {
        this.userSubject.next(response)
      }
    );
  }
  public getUserFromLocalStorage(): User | null{
    const jwtToken = sessionStorage.getItem(TOKEN)
     if (!jwtToken){
       return null
     }
    try {
      const decodedToken: User = jwtDecode(jwtToken);
      return decodedToken
    } catch (error) {
      return null
    }
  }

  // public setUser(){
  //   const user = this.getUserFromLocalStorage()
  //   this.userSubject.next(user)
  // }

  static getToken(): string | null {
    return sessionStorage.getItem(TOKEN);
  }


  clearToken(): void {
    sessionStorage.removeItem(TOKEN);
    this.isLoggedInSubject.next(false);
  }

  public isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  get isLoggedInObservable(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  get currentUser(): Observable<User | null> {
    return this.userSubject.asObservable();
  }
}
