import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-service-create-delete-dialog',
  templateUrl: './service-create-delete-dialog.component.html',
  styleUrls: ['./service-create-delete-dialog.component.css']
})
export class ServiceCreateDeleteDialogComponent implements OnInit {
  serviceId: string;

  constructor(
    private dialogRef: MatDialogRef<ServiceCreateDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA)data) {
      this.serviceId = data.questionId;
    }
  ngOnInit() {
  }

}
