import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {NgForOf} from "@angular/common";
import {Role} from "../../../Models/role";
import {User} from "../../../Models/user";
import {UserService} from "../../../Service/user.service";

@Component({
  selector: 'app-edit-role',
  standalone: true,
  templateUrl: './edit-role.component.html',
  imports: [
    MatOption,
    MatSelect,
    NgForOf
  ],
  styleUrl: './edit-role.component.scss'
})
export class EditRoleComponent implements OnInit{
  @Input() roles: Role[];
  @Input() user: User;
  public selectedRole: string;

  @Output() editUser: EventEmitter<{ user: User, newRoleId: string }> = new EventEmitter();


  constructor(private userService: UserService) {
  }
  public ngOnInit():void {
    this.selectedRole = this.user.role.id;
  }

  public onSave(user: User):void {
    this.editUser.emit({ user: user, newRoleId: this.selectedRole });
  }
}
