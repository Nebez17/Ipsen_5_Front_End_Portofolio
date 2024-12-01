import {Component, OnInit} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {NgForOf, NgIf} from "@angular/common";
import {RoleService} from "../../Service/role.service";
import {Role} from "../../Models/role";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RoleEditDialogComponent} from "./role-edit-dialog/role-edit-dialog.component";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {RoleAddDialogComponent} from "./role-add-dialog/role-add-dialog.component";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";

@Component({
  selector: 'app-role-rights',
  standalone: true,
  templateUrl: './role-rights.component.html',
  imports: [
    MatIcon,
    NgForOf,
    NgIf,
    FormsModule,
    ReactiveFormsModule
  ],
  styleUrl: './role-rights.component.scss'
})
export class RoleRightsComponent implements OnInit{
  public roles: Role[];

  constructor(private roleService: RoleService,
              private dialog: MatDialog,
              private breakpointObserver: BreakpointObserver
  ) {
  }

  public ngOnInit(): void{
    this.getAllRoles();
  }

  private getAllRoles(): void {
    this.roleService.getAllRoles().subscribe(
      response => {
        this.roles = response
      }
    )
  }


  public editRightsOfRole(role: Role): void {
    const widthScreen: MatDialogConfig<any> = this.widthScreen();

    const dialogRef = this.dialog.open(RoleEditDialogComponent, {
      ...widthScreen,
      data: role
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
    });
  }

  public deleteRole(role: Role): void {
    if (confirm('Are you sure you want to delete this role?')) {
      this.roleService.deleteRole(role).subscribe(
        response => {
          this.roles = this.roles.filter(r => r.id !== role.id);
        },
      error => {
          confirm("Role can not be deleted. Check if there are users with this role.")
      }
      )
    }
  }

  private widthScreen():MatDialogConfig<any>{
    const dialogConfig: MatDialogConfig<any> = new MatDialogConfig();

    dialogConfig.width = '60%';

    this.breakpointObserver.observe([
      Breakpoints.Handset,
      Breakpoints.TabletLandscape,
      Breakpoints.WebLandscape
    ]).subscribe(result => {
      if (result.breakpoints[Breakpoints.Handset]) {
        dialogConfig.width = '100%';
      } else if (result.breakpoints[Breakpoints.WebLandscape]) {
        dialogConfig.width = '30%';
      }
    });
    return dialogConfig;
  }

  public addRole(): void {
    const widthScreen: MatDialogConfig<any> = this.widthScreen();
    const dialogRef = this.dialog.open(RoleAddDialogComponent, widthScreen);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.roles.push(result);
      }
    });
  }
}
