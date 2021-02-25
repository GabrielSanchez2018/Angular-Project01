import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatSnackBar, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { EmployeeCreateComponent } from '../employee-create/employee-create.component';
import { EmployeeCreateDialogComponent } from 'src/app/dialogs/employee-create-dialog/employee-create-dialog.component';


@Component({
  selector: 'app-order-manually',
  templateUrl: './order-manually.component.html',
  styleUrls: ['./order-manually.component.css']
})
export class OrderManuallyComponent implements OnInit {
 
  displayedColumns=['EmployeeID', 'LastName', 'FirstName', 'Department']
  username: any;
  form: FormGroup;
  employees: any;
  EmployeeID: string;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  stepper: any;
  matStepperNext: any;
  
  @ViewChild(MatPaginator, {static: false}) Component

  
  
  constructor(private _formBuilder: FormBuilder ,private http: HttpClient, private fb: FormBuilder, private router: Router, private cookieService: CookieService, private changeDetectorRefs: ChangeDetectorRef, private dialog: MatDialog, private snackBar: MatSnackBar) {

    this.http.get('api/employees/' ).subscribe(res =>{
      this.employees = res;
     

      this.employees = new MatTableDataSource(this.employees);
    
      this.employees.paginator = this.paginator;
      this.employees.sort = this.sort;
      console.log(this.employees)
    }, err => {
      console.log(err);
    })
   }
   @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
   @ViewChild(MatSort, {static: false}) sort: MatSort;

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

    applyFilter(filterValue: string) {
      this.employees.filter = filterValue.trim().toLowerCase();
    
      if (this.employees.paginator) {
        this.employees.paginator.firstPage();
      }
    }
// findEmployee(){
//     const EmployeeID = this.form.controls.EmployeeID.value;
//     this.http.get('api/employees/' + EmployeeID).subscribe( res => {
//       this.employees = res;
//       console.log(this.employees)
//     })
// }

  login() {
    const EmployeeId = this.form.controls["EmployeeId"].value;
    console.log(EmployeeId);
    this.http.get("/api/employees/" + EmployeeId).subscribe(res => {
      if (res) {
        console.log('this is res', res)
        this.cookieService.set('manually', EmployeeId, 1, '/', '', false, "Strict");

        //this.stepper
       this.router.navigate(["/service-order-manual"]);


      } else {
        this.snackBar.open(
          "The employee ID you entered is invalid, please try again.",
          "ERROR",
          {
            duration: 3000,
            verticalPosition: "top"
          }
        );

      }
    });
  }

  // login() {
  //   const username = this.form.controls["EmployeeId"].value;

  //   this.http.post('/api/session/signin', {
  //     username,

  //   }).subscribe(res => {
  //     if (res['auth']) {
  //       this.cookieService.set('paysession', username, 1);
  //       this.router.navigate(['/']);
  //     } else {
  //       this.errorMessage = res['text'];
  //     }
  //   });
  // }

  openEmployeeCreate(){
    const dialogRef = this.dialog.open(EmployeeCreateDialogComponent, {
      disableClose: true
    });

    dialogRef.afterClosed()

      // console.log('this si the data ', data)
      // if (data) {
      //   console.log('this is the employee',data)

      //   this.http.post('/api/employees' , {

      //     EmployeeID: data.EmployeeID,
      //     LastName: data.LastName,
      //     FirstName: data.FirstName,
      //     Department: data.Department,



    //     }).subscribe(res => {

    //     }, err => {
    //       console.log(err);
    //     });
    //   }
    // });
  }


}