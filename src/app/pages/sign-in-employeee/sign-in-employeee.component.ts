
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
  username: string;
  show: boolean;
  employees: Object;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {
    // this.username = this.cookieService.get('paysession');
    // this.http.get('/api/employees/' + this.username + '/role' ).subscribe(res =>{
    //   if (res === "standard"){
    //     this.show = true
    //   } else {
    //     this.show = false
    //   }
    // })
    this.http.get('api/employees/' ).subscribe(res =>{
      this.employees = res;
      //console.log(this.employees)
    }, err => {
      console.log(err);
    })

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
  //   this.http.get("/api/employees/" + EmployeeId + '/role').subscribe(res => {
  //     if (res  ) {
  //      console.log(res)

  //       this.cookieService.set('paysession', EmployeeId, 1);
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
//     signinemp(){
//       this.username = this.cookieService.get('paysession');
//       this.http.get('/api/employees/' + this.cookieService.get('paysession') + '/role' ).subscribe(res => {
//         if (res === "standard") {
//             this.show = true;
//         } else {
//           this.show = false
//             }
//       });
//     }
// //}


// THIS FUNCTION IS WIHT THE POST

  // login() {
  //   //this.signinemp();
  //   const EmployeeId = this.form.controls.EmployeeId.value;
  //   console.log('this is working',EmployeeId)
  //   //const password = this.form.controls.password.value;

  //   this.http.post('/api/session/sign-in-employee/', {
  //     EmployeeId,
  //     //password
  //   }).subscribe(res => {
  //     console.log('this is working',res)
  //     if (res['auth']) {
  //       this.cookieService.set('paysession', EmployeeId, 1);
  //       // this.router.navigate(['/']);

  //     } else {
  //       this.errorMessage = res['text'];
  //     }
  //   });




   login() {
    const EmployeeId = this.form.controls["EmployeeId"].value;
    console.log(EmployeeId);
    this.http.get("/api/employees/" + EmployeeId).subscribe(res => {
      if (res) {

        console.log('this is the employee id', res)
        console.log('empid', EmployeeId);

        this.cookieService.set('sessionuser', EmployeeId, 1);

        //this.stepper
       this.router.navigate(["/"]);


      } else {
        this.snackBar.open(
          "The employee ID you entered is invalid, please try again.",
          "ERROR",
          {
            duration: 4000,
            verticalPosition: "top"
          }
        );

      }
    });
   }



  // new cookie inside the component


}
