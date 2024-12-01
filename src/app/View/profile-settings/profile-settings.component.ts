import {Component, Input, OnInit} from '@angular/core';
import { UserService } from '../../Service/user.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {NgIf} from "@angular/common";
import {AddSocialMediaComponent} from "./add-social-media/add-social-media.component";
import {User} from "../../Models/user";

@Component({
  selector: 'app-profile-settings',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    AddSocialMediaComponent
  ],
  templateUrl: './profile-settings.component.html',
  styleUrl: './profile-settings.component.scss'
})
export class ProfileSettingsComponent implements OnInit{
  public user: User;

  constructor (private userService: UserService) {
   }

   public ngOnInit() :void{
     this.getUserFromDB();
   }

  private getUserFromDB ():void {
    this.userService.getUserByMailWithJWT().subscribe(
      (response: any) => {
        this.user = response;
      },
    );
  }

  public onSubmit(): void {
    confirm("You have updated your profile!")
    if (this.user) {
      this.userService.editUserById(this.user).subscribe(
      );
    }
  }
}
