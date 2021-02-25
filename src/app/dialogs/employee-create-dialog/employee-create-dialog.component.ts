import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-create-dialog',
  templateUrl: './employee-create-dialog.component.html',
  styleUrls: ['./employee-create-dialog.component.css']
})
export class EmployeeCreateDialogComponent implements OnInit {
  form: any;

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router, private dialogRef: MatDialogRef<EmployeeCreateDialogComponent>) { }

  ngOnInit() {
    this.form = this.fb.group({
      EmployeeID: [null, Validators.compose([Validators.required])],
      LastName: [null, Validators.compose([Validators.required])],
      FirstName: [null, Validators.compose([Validators.required])],
      Department: [null, Validators.compose([Validators.required])]
    });
  }


  create() {

    // this.dialogRef.close(this.form.value);

  //  I add services because in the Services API i have it set up as services
    const EmployeeID = this.form.controls['EmployeeID'].value;
    const LastName = this.form.controls['LastName'].value;
    const FirstName = this.form.controls['FirstName'].value;
    var Department = this.form.controls['Department'].value;
    

    


    this.http.post('/api/employees', {
      EmployeeID: EmployeeID,
      LastName: LastName,
      FirstName: FirstName,
      Department: Department,
    }).subscribe(res =>{
      console.log(res)
      
    }, err => {
      console.log(err)
    });
    this.dialogRef.close()
  }

  // cancel() {
  //   this.router.navigate(['/order-manually']);
  // // this.dialogRef.close()
  // }


}

// <!-- EmployeeId: req.body.EmployeeID,
// LastName: req.boby.LastName,
// FirstName: req.body.FirstName,
// Department: req.body.Department,
// role: {type: String, default: 'standard'}, -->


