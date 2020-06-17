import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-find-employee',
  templateUrl: './find-employee.component.html',
  styleUrls: ['./find-employee.component.css']
})
export class FindEmployeeComponent implements OnInit {
  displayedColums: ['id', 'firstname', 'lastname', 'department']
  username: any;
  form: FormGroup;
  employees: Object;
  EmployeeID: string;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  stepper: any;
  matStepperNext: any;
  errorMessage: any;



  constructor(private _formBuilder: FormBuilder ,private http: HttpClient, private fb: FormBuilder, private router: Router, private cookieService: CookieService, private changeDetectorRefs: ChangeDetectorRef, private dialog: MatDialog, private snackBar: MatSnackBar) {

    // this.http.get('api/employees/' ).subscribe(res =>{
    //   this.employees = res;
    //   //console.log(this.employees)
    // }, err => {
    //   console.log(err);
    // })
   }

  ngOnInit() {
    this.form = this.fb.group({
      EmployeeId: [null, Validators.compose([Validators.required])]

    });

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });



    }

// findEmployee(){
//     const EmployeeID = this.form.controls.EmployeeID.value;
//     this.http.get('api/employees/' + EmployeeID).subscribe( res => {
//       this.employees = res;
//       console.log(this.employees)
//     })
// }

  // login() {
  //   const EmployeeId = this.form.controls["EmployeeId"].value;
  //   console.log(EmployeeId);
  //   this.http.get("/api/employees/" + EmployeeId).subscribe(res => {
  //     if (res) {
  //       this.cookieService.set('paysession', EmployeeId, 1);

  //       //this.stepper
  //      this.router.navigate(["/sell"]);


  //     } else {
  //       this.snackBar.open(
  //         "The employee ID you entered is invalid, please try again.",
  //         "ERROR",
  //         {
  //           duration: 3000,
  //           verticalPosition: "top"
  //         }
  //       );

  //     }
  //   });
  // }

  login() {
    const username = this.form.controls["EmployeeId"].value;

    this.http.post('/api/session/signin', {
      username,

    }).subscribe(res => {
      if (res['auth']) {
        this.cookieService.set('paysession', username, 1);
        this.router.navigate(['/']);
      } else {
        this.errorMessage = res['text'];
      }
    });
  }




}
