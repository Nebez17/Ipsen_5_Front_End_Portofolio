import {Component, OnInit} from '@angular/core';
import {RolePrivilegesService} from "../../Service/role-privileges.service";
import {RolePrivileges} from "../../Models/rolePrivileges";
import {Role} from "../../Models/role";
import {RoleService} from "../../Service/role.service";
import {NgForOf, NgIf} from "@angular/common";
import {User} from "../../Models/user";
import {UserService} from "../../Service/user.service";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatOption, MatSelect} from "@angular/material/select";
import {EditRoleComponent} from "./edit-role/edit-role.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-roles',
  standalone: true,
  templateUrl: './roles.component.html',
  imports: [
    NgForOf,
    NgIf,
    MatButton,
    MatIcon,
    ReactiveFormsModule,
    FormsModule,
    MatSelect,
    MatOption,
    EditRoleComponent,
    RouterLink
  ],
  styleUrl: './roles.component.scss'
})
export class RolesComponent implements OnInit {
  public roles: Role[];
  public users: User[];
  public usersByRole: { [roleId: string]: User[] };
  public editingMode: boolean = false;

  constructor(private roleService: RoleService,
              private userService: UserService) {
  }

  public ngOnInit(): void {
    this.getAllRoles();
    this.getAllUsers()
  }

  private getAllUsers(): void {
    this.userService.getAllUsers().subscribe(
        response => {
          this.users = response;
          this.organizeUsersByRole();
        }
    )
  }

  private organizeUsersByRole(): void {
    this.usersByRole = this.users.reduce((acc, user) => {
      if (!acc[user.role.id]) {
        acc[user.role.id] = [];
      }
      acc[user.role.id].push(user);
      return acc;
    }, {} as { [key: string]: User[] });
  }

  private getAllRoles(): void {
    this.roleService.getAllRoles().subscribe(
        response => {
          this.roles = response
        }
    )
  }

  public editRole(): void {
    this.editingMode = !this.editingMode;
  }

  public editUser(user: User, roleId: string):void {
    this.userService.setRoleUser(user, roleId).subscribe(
        response => {
          this.updateUsersList(user, roleId);
          this.editRole();
        })
  }

  private updateUsersList(user: User, newRoleId: string): void {
    const userIndex = this.users.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
      this.users[userIndex].role.id = newRoleId;
      this.organizeUsersByRole();
    }
  }

}
