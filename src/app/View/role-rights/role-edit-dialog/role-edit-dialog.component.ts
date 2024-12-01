import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import { RolePrivileges } from "../../../Models/rolePrivileges";
import { RolePrivilegesService } from "../../../Service/role-privileges.service";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {MatCheckbox} from "@angular/material/checkbox";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-role-edit-dialog',
  standalone: true,
  templateUrl: './role-edit-dialog.component.html',
  imports: [
    MatDialogActions,
    MatButton,
    MatInput,
    MatLabel,
    MatFormField,
    MatDialogContent,
    MatDialogTitle,
    MatCheckbox,
    ReactiveFormsModule,
    NgForOf
  ],
  styleUrls: ['./role-edit-dialog.component.scss']
})
export class RoleEditDialogComponent implements OnInit {
  public roleEditForm: FormGroup;
  public rolePrivileges: RolePrivileges[];
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
  private deletedRights: string[] = [];

  constructor(
    private rolePrivilegeService: RolePrivilegesService,
    public dialogRef: MatDialogRef<RoleEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.roleEditForm = this.fb.group({
      name: [data.name],
    });
  }

  public ngOnInit(): void {
    this.getRolePrivilegesByRole();
  }

  private getRolePrivilegesByRole(): void {
    this.rolePrivilegeService.getRolePrivilegesByRoleId(this.data.id).subscribe(
      response => {
        this.rolePrivileges = response;
      }
    );
  }

  private deleteRolePrivilege(right: string): void {
    this.rolePrivilegeService.deleteRolePrivilege(this.data, right).subscribe(
      response => {
      }
    );
  }
  private postRolePrivilege(right: string): void {
    const rolePrivilege = {
      role: this.data.id,
      rights: right
    }
    this.rolePrivilegeService.postRolePrivilege(rolePrivilege).subscribe(
      response => {
      }
    );
  }

  public onCancel(): void {
    this.deletedRights = [];
    this.updatedRights = [];
    this.dialogRef.close();
  }

  public onSave(): void {
    for (let i = 0; i < this.deletedRights.length; i++) {
      const right = this.deletedRights[i];
      if (right) {
        this.deleteRolePrivilege(right);
      }
    }
    for (let i = 0; i < this.updatedRights.length; i++) {
      const right = this.updatedRights[i];
      if (right) {
        this.postRolePrivilege(right);
      }
    }
    this.dialogRef.close(this.roleEditForm.value);
  }

  public isChecked(right: string): boolean {
    return this.rolePrivileges && this.rolePrivileges.length > 0 && this.rolePrivileges.some(privilege => privilege.id.rightsId === right);
  }

  public toggleCheckbox(checked: boolean, right: string): void {
    if (checked) {
      this.deletedRights = this.deletedRights.filter(privilege => privilege !== right);
      this.updatedRights.push(right);
    } else {
      this.updatedRights = this.updatedRights.filter(privilege => privilege !== right);
      this.deletedRights.push(right);
    }
  }
}
