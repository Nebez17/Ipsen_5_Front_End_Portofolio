import { Component } from '@angular/core';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  imports: [
    MatDialogClose,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatButton
  ],
  standalone: true
})
export class ConfirmDialogComponent { }
