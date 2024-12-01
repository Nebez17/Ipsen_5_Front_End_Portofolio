import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatCheckbox} from "@angular/material/checkbox";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgForOf} from "@angular/common";
import {RolePrivilegesService} from "../../../Service/role-privileges.service";
import {RoleService} from "../../../Service/role.service";
import {Role} from "../../../Models/role";

@Component({
  selector: 'app-role-add-dialog',
  templateUrl: './role-add-dialog.component.html',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatCheckbox,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatFormField,
    MatInput,
    MatLabel,
    NgForOf,
    ReactiveFormsModule
  ],
  styleUrl: './role-add-dialog.component.scss'
})
export class RoleAddDialogComponent {
  public roleAddForm: FormGroup;
  public newRole: Role;
  public rightsList: string[] = [
    'GETTEN',
    'POSTEN',
    'UPDATEN',
    'DELETEN',
    'ALL',
    'GUARD_ROLES',
    'GUARD_USER_ROLES',
    'GUARD_SUBMISSIONS',
    'GUARD_NOTIFICATIONS',
    'GUARD_SUBMISSION_TO_POST',
    'REVIEW_SUBMISSIONS',
    'SUBMISSION',
    'SUBMISSION_GET',
    'SUBMISSION_POST',
    'SUBMISSION_PUT',
    'SUBMISSION_DELETE',
    'CATEGORY',
    'CATEGORY_GET',
    'CATEGORY_POST',
    'CATEGORY_PUT',
    'CATEGORY_DELETE',
    'CRITERIA',
    'CRITERIA_GET',
    'CRITERIA_POST',
    'CRITERIA_PUT',
    'CRITERIA_DELETE',
    'FEEDBACKPERELEMENT',
    'FEEDBACKPERELEMENT_GET',
    'FEEDBACKPERELEMENT_POST',
    'FEEDBACKPERELEMENT_PUT',
    'FEEDBACKPERELEMENT_DELETE',
    'POST',
    'POST_GET',
    'POST_POST',
    'POST_PUT',
    'POST_DELETE',
    'POSTCATEGORY',
    'POSTCATEGORY_GET',
    'POSTCATEGORY_POST',
    'POSTCATEGORY_PUT',
    'POSTCATEGORY_DELETE',
    'RATING',
    'RATING_GET',
    'RATING_POST',
    'RATING_PUT',
    'RATING_DELETE',
    'REACTION',
    'REACTION_GET',
    'REACTION_POST',
    'REACTION_PUT',
    'REACTION_DELETE',
    'ROLE',
    'ROLE_GET',
    'ROLE_POST',
    'ROLE_PUT',
    'ROLE_DELETE',
    'ROLEPRIVILIGES',
    'ROLEPRIVILIGES_GET',
    'ROLEPRIVILIGES_POST',
    'ROLEPRIVILIGES_PUT',
    'ROLEPRIVILIGES_DELETE',
    'RUBRIC',
    'RUBRIC_GET',
    'RUBRIC_POST',
    'RUBRIC_PUT',
    'RUBRIC_DELETE',
    'SOCIALMEDIA',
    'SOCIALMEDIA_GET',
    'SOCIALMEDIA_POST',
    'SOCIALMEDIA_PUT',
    'SOCIALMEDIA_DELETE',
    'STATUS',
    'STATUS_GET',
    'STATUS_POST',
    'STATUS_PUT',
    'STATUS_DELETE',
    'USER',
    'USER_GET',
    'USER_POST',
    'USER_PUT',
    'USER_DELETE'
  ];
  private updatedRights: string[] = [];

  constructor(
    private rolePrivilegeService: RolePrivilegesService,
    private roleService: RoleService,
    public dialogRef: MatDialogRef<RoleAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.roleAddForm = this.fb.group({
      name: ['']
    });
  }


  private postRolePrivilege(right: string): void {
    const rolePrivilege = {
      role: this.newRole.id,
      rights: right
    }
    this.rolePrivilegeService.postRolePrivilege(rolePrivilege).subscribe(
    );
  }

  private postRole(name: string): void {
    const role = {
      name: name
    }
    this.roleService.addRole(role).subscribe(
      response => {
        this.getRoleByName(name)
      }
    );
  }

  private getRoleByName(name: string): void {
    this.roleService.getRoleByName(name).subscribe(
      response => {
        this.newRole = response;
        for (let i = 0; i < this.updatedRights.length; i++) {
          const right = this.updatedRights[i];
          if (right) {
            this.postRolePrivilege(right);
          }
        }
        this.dialogRef.close(this.newRole);
      }
    );
  }

  public onCancel(): void {
    this.updatedRights = [];
    this.dialogRef.close();
  }

  public onSave(): void {
    const nameControl = this.roleAddForm.get('name');
    if (nameControl && nameControl.value) {
      const name = nameControl.value;
      this.postRole(name);
    } else {
      console.error('Name control or its value is null or undefined');
      return;
    }
  }

  public toggleCheckbox(checked: boolean, right: string): void {
    if (checked) {
      this.updatedRights.push(right);
    }
  }
}
