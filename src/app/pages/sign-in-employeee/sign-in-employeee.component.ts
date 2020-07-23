
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ControlContainer } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatInput } from '@angular/material';
import Keyboard from "simple-keyboard";
import { style } from '@angular/animations';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({

  selector: 'app-sign-in-employeee',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './sign-in-employeee.component.html',
  styleUrls: ['./sign-in-employeee.component.css',

  "../../../../node_modules/simple-keyboard/build/css/index.css",
  ]
})
export class SignInEmployeeeComponent implements OnInit {
  value = "";
  keyboard: Keyboard;



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

  ngAfterViewInit() {
    this.keyboard = new Keyboard({
      onChange: input => this.onChange(input),
      onKeyPress: button => this.onKeyPress(button),
       //theme: "hg-theme-default myTheme1"
    });
  }

  onChange = (input: string) => {
    this.value = input;
    console.log("Input changed", input);
  };

  onKeyPress = (button: string) => {
    console.log("Button pressed", button);
/**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") this.handleShift();
  };

  onInputChange = (event: any) => {
    this.keyboard.setInput(event.target.form.value);
  };

  handleShift = () => {
    let currentLayout = this.keyboard.options.layoutName;
    let shiftToggle = currentLayout === "default" ? "shift" : "default";

    this.keyboard.setOptions({
      layoutName: shiftToggle
    });
  };

  ngOnInit() {
    this.form = this.fb.group({
      value: [this.value],
      EmployeeId: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern("^[A-Z a-z]*$")
        ])
      ]
    });
    console.log('this is the value from the keyboard', this.value)
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
     //REPLACED THE NG FORM BY THE VALUE THE KEYBOARD INPUTS
    const EmployeeId = this.value;

    this.http.get("/api/employees/" + EmployeeId.toUpperCase()).subscribe(res => {
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
