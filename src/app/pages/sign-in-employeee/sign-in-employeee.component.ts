
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ControlContainer } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-sign-in-employeee',
  templateUrl: './sign-in-employeee.component.html',
  styleUrls: ['./sign-in-employeee.component.css']
})
export class SignInEmployeeeComponent implements OnInit {


  form: FormGroup;
  errorMessage: any;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {


  }

  ngOnInit() {
    this.form = this.fb.group({
      EmployeeId: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern("^[A-Z]*$")
        ])
      ]
    });
  }

  // login() {
  //   const EmployeeId = this.form.controls["EmployeeId"].value;
  //   console.log(EmployeeId);
  //   this.http.get("/api/employees/" + EmployeeId).subscribe(res => {
  //     if (res) {
  //       this.cookieService.set('sessionuser', EmployeeId, 1);
  //       this.router.navigate(["/"]);

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


    // get all info


  //}
  login() {
    const EmployeeId = this.form.controls.EmployeeId.value;
    //const password = this.form.controls.password.value;

    this.http.post('/api/session/signin-employee', {
      EmployeeId,
      //password
    }).subscribe(res => {
      if (res['auth']) {
        this.cookieService.set('sessionuser', EmployeeId, 1);
        this.router.navigate(['/']);
      } else {
        this.errorMessage = res['text'];
      }
    });
  }



  // new cookie inside the component


}
