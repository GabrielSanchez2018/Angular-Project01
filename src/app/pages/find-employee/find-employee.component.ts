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
  //displayedColums: ['id', 'firstname', 'lastname', 'department']
  displayedColumns = ['code', 'itemdescription', 'totalboxes', 'instockboxes', 'leftboxes'];
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
  orderssum: Object;
  ventas: any;
  submitedOders: any;
  title: any;



  constructor(private _formBuilder: FormBuilder, private http: HttpClient, private fb: FormBuilder, private router: Router, private cookieService: CookieService, private changeDetectorRefs: ChangeDetectorRef, private dialog: MatDialog, private snackBar: MatSnackBar) {

    this.http.get('api/employees/').subscribe(res => {
      this.employees = res;
      //console.log(this.employees)
    }, err => {
      console.log(err);
    })


    this.http.get('api/barcodes/barcodes-graph').subscribe(res => {
      this.ventas = res;
      console.log('here are the hr', this.ventas[0].code)
      console.log('here are the hr', this.ventas)
    }), err => {
      console.log(err)
    }

    this.http.get('api/invoices/purchases-graph').subscribe(res => {
      this.submitedOders = res;
      console.log('here are the submitted employee orders', this.submitedOders)
      console.log('testing', this.submitedOders[0]._id.code)
    }), err => {
      console.log(err)
    }


  }
  /**
   * This function counts the boxes left in the inventory
   */

  itemsLeftFunction() {

    const sumbitted = this.submitedOders
    const scannedItems = this.ventas
    console.log(sumbitted[0]._id.code)
    console.log(scannedItems[0].code)

    if (sumbitted[0]._id.code == scannedItems[0].code || scannedItems[1].code || scannedItems[3].code || scannedItems[4].code ||
      scannedItems[5].code || scannedItems[6].code || scannedItems[7].code || scannedItems[8].code || scannedItems[9].code ||
      scannedItems[10].code || scannedItems[11].code || scannedItems[12].code || scannedItems[13].code || scannedItems[14].code ||
      scannedItems[15].code || scannedItems[16].code || scannedItems[17].code || scannedItems[18].code || scannedItems[19].code || scannedItems[20].code
    ) {
      var totalBoxes = sumbitted[0].count
      return totalBoxes

    } else if (sumbitted[0]._id.code !== scannedItems[0].code || scannedItems[1].code || scannedItems[3].code || scannedItems[4].code ||
      scannedItems[5].code || scannedItems[6].code || scannedItems[7].code || scannedItems[8].code || scannedItems[9].code ||
      scannedItems[10].code || scannedItems[11].code || scannedItems[12].code || scannedItems[13].code || scannedItems[14].code ||
      scannedItems[15].code || scannedItems[16].code || scannedItems[17].code || scannedItems[18].code || scannedItems[19].code || scannedItems[20].code
    ) {
      // var totalBoxes = sumbitted[1].count
      return 0
    
    
    // if(sumbitted[0]._id.code == scannedItems[0].code ){
    //   var totalBoxes = sumbitted[0].count
    //   return totalBoxes
    // } else if(sumbitted[0]._id.code == scannedItems[1].code){
    //   var totalBoxes = sumbitted[1].count
    //   return totalBoxes
    // }else if(sumbitted[0]._id.code == scannedItems[2].code){
    //   var totalBoxes = sumbitted[2].count
    //   return totalBoxes
    // }else if(sumbitted[0]._id.code == scannedItems[3].code){
    //   var totalBoxes = sumbitted[3].count
    //   return totalBoxes
    // }else if(sumbitted[0]._id.code == scannedItems[4].code){
    //   var totalBoxes = sumbitted[4].count
    //   return totalBoxes
    // }else if(sumbitted[0]._id.code == scannedItems[5].code){
    //   var totalBoxes = sumbitted[5].count
    //   return totalBoxes
    // }else if(sumbitted[0]._id.code == scannedItems[6].code){
    //   var totalBoxes = sumbitted[6].count
    //   return totalBoxes
    // }else if(sumbitted[0]._id.code == scannedItems[7].code){
    //   var totalBoxes = sumbitted[7].count
    //   return totalBoxes
    // }else if(sumbitted[0]._id.code == scannedItems[8].code){
    //   var totalBoxes = sumbitted[8].count
    //   return totalBoxes
    // }else if(sumbitted[0]._id.code == scannedItems[9].code){
    //   var totalBoxes = sumbitted[9].count
    //   return totalBoxes
    // }else if(sumbitted[0]._id.code == scannedItems[10].code){
    //   var totalBoxes = sumbitted[10].count
    //   return totalBoxes
    // }else if(sumbitted[0]._id.code == scannedItems[11].code){
    //   var totalBoxes = sumbitted[11].count
    //   return totalBoxes
    // }else if(sumbitted[0]._id.code == scannedItems[12].code){
    //   var totalBoxes = sumbitted[12].count
    //   return totalBoxes
    // }else if(sumbitted[0]._id.code == scannedItems[13].code){
    //   var totalBoxes = sumbitted[13].count
    //   return totalBoxes
    // }
  
    

    } else if (sumbitted[2]._id.code == scannedItems[0].code || scannedItems[1].code || scannedItems[3].code || scannedItems[4].code ||
      scannedItems[5].code || scannedItems[6].code || scannedItems[7].code || scannedItems[8].code || scannedItems[9].code ||
      scannedItems[10].code || scannedItems[11].code || scannedItems[12].code || scannedItems[13].code || scannedItems[14].code ||
      scannedItems[15].code || scannedItems[16].code || scannedItems[17].code || scannedItems[18].code || scannedItems[19].code || scannedItems[20].code
    ) {
      var totalBoxes = sumbitted[2].count
      return totalBoxes

    } else if (sumbitted[3]._id.code == scannedItems[0].code || scannedItems[1].code || scannedItems[3].code || scannedItems[4].code ||
      scannedItems[5].code || scannedItems[6].code || scannedItems[7].code || scannedItems[8].code || scannedItems[9].code ||
      scannedItems[10].code || scannedItems[11].code || scannedItems[12].code || scannedItems[13].code || scannedItems[14].code ||
      scannedItems[15].code || scannedItems[16].code || scannedItems[17].code || scannedItems[18].code || scannedItems[19].code || scannedItems[20].code
    ) {
      var totalBoxes = sumbitted[3].count
      return totalBoxes

    } else if (sumbitted[4]._id.code == scannedItems[0].code || scannedItems[1].code || scannedItems[3].code || scannedItems[4].code ||
      scannedItems[5].code || scannedItems[6].code || scannedItems[7].code || scannedItems[8].code || scannedItems[9].code ||
      scannedItems[10].code || scannedItems[11].code || scannedItems[12].code || scannedItems[13].code || scannedItems[14].code ||
      scannedItems[15].code || scannedItems[16].code || scannedItems[17].code || scannedItems[18].code || scannedItems[19].code || scannedItems[20].code
    ) {
      var totalBoxes = sumbitted[4].count
      return totalBoxes

    } else if (sumbitted[5]._id.code == scannedItems[0].code || scannedItems[1].code || scannedItems[3].code || scannedItems[4].code ||
      scannedItems[5].code || scannedItems[6].code || scannedItems[7].code || scannedItems[8].code || scannedItems[9].code ||
      scannedItems[10].code || scannedItems[11].code || scannedItems[12].code || scannedItems[13].code || scannedItems[14].code ||
      scannedItems[15].code || scannedItems[16].code || scannedItems[17].code || scannedItems[18].code || scannedItems[19].code || scannedItems[20].code
    ) {
      var totalBoxes = sumbitted[5].count
      return totalBoxes

    } else if (sumbitted[6]._id.code == scannedItems[0].code || scannedItems[1].code || scannedItems[3].code || scannedItems[4].code ||
      scannedItems[5].code || scannedItems[6].code || scannedItems[7].code || scannedItems[8].code || scannedItems[9].code ||
      scannedItems[10].code || scannedItems[11].code || scannedItems[12].code || scannedItems[13].code || scannedItems[14].code ||
      scannedItems[15].code || scannedItems[16].code || scannedItems[17].code || scannedItems[18].code || scannedItems[19].code || scannedItems[20].code
    ) {
      var totalBoxes = sumbitted[6].count
      return totalBoxes

    }else if (sumbitted[7]._id.code == scannedItems[0].code || scannedItems[1].code || scannedItems[3].code || scannedItems[4].code ||
      scannedItems[5].code || scannedItems[6].code || scannedItems[7].code || scannedItems[8].code || scannedItems[9].code ||
      scannedItems[10].code || scannedItems[11].code || scannedItems[12].code || scannedItems[13].code || scannedItems[14].code ||
      scannedItems[15].code || scannedItems[16].code || scannedItems[17].code || scannedItems[18].code || scannedItems[19].code || scannedItems[20].code
    ) {
      var totalBoxes = sumbitted[7].count
      return totalBoxes

    } else if (sumbitted[8]._id.code == scannedItems[0].code || scannedItems[1].code || scannedItems[3].code || scannedItems[4].code ||
      scannedItems[5].code || scannedItems[6].code || scannedItems[7].code || scannedItems[8].code || scannedItems[9].code ||
      scannedItems[10].code || scannedItems[11].code || scannedItems[12].code || scannedItems[13].code || scannedItems[14].code ||
      scannedItems[15].code || scannedItems[16].code || scannedItems[17].code || scannedItems[18].code || scannedItems[19].code || scannedItems[20].code
    ) {
      var totalBoxes = sumbitted[8].count
      return totalBoxes

    } else if (sumbitted[9]._id.code == scannedItems[0].code || scannedItems[1].code || scannedItems[3].code || scannedItems[4].code ||
      scannedItems[5].code || scannedItems[6].code || scannedItems[7].code || scannedItems[8].code || scannedItems[9].code ||
      scannedItems[10].code || scannedItems[11].code || scannedItems[12].code || scannedItems[13].code || scannedItems[14].code ||
      scannedItems[15].code || scannedItems[16].code || scannedItems[17].code || scannedItems[18].code || scannedItems[19].code || scannedItems[20].code
    ) {
      var totalBoxes = sumbitted[9].count
      return totalBoxes

    } else if (sumbitted[10]._id.code == scannedItems[0].code || scannedItems[1].code || scannedItems[3].code || scannedItems[4].code ||
      scannedItems[5].code || scannedItems[6].code || scannedItems[7].code || scannedItems[8].code || scannedItems[9].code ||
      scannedItems[10].code || scannedItems[11].code || scannedItems[12].code || scannedItems[13].code || scannedItems[14].code ||
      scannedItems[15].code || scannedItems[16].code || scannedItems[17].code || scannedItems[18].code || scannedItems[19].code || scannedItems[20].code
    ) {
      var totalBoxes = sumbitted[10].count
      return totalBoxes

    }else if (sumbitted[11]._id.code == scannedItems[0].code || scannedItems[1].code || scannedItems[3].code || scannedItems[4].code ||
      scannedItems[5].code || scannedItems[6].code || scannedItems[7].code || scannedItems[8].code || scannedItems[9].code ||
      scannedItems[10].code || scannedItems[11].code || scannedItems[12].code || scannedItems[13].code || scannedItems[14].code ||
      scannedItems[15].code || scannedItems[16].code || scannedItems[17].code || scannedItems[18].code || scannedItems[19].code || scannedItems[20].code
    ) {
      var totalBoxes = sumbitted[11].count
      return totalBoxes

    } else if (sumbitted[12]._id.code == scannedItems[0].code || scannedItems[1].code || scannedItems[3].code || scannedItems[4].code ||
      scannedItems[5].code || scannedItems[6].code || scannedItems[7].code || scannedItems[8].code || scannedItems[9].code ||
      scannedItems[10].code || scannedItems[11].code || scannedItems[12].code || scannedItems[13].code || scannedItems[14].code ||
      scannedItems[15].code || scannedItems[16].code || scannedItems[17].code || scannedItems[18].code || scannedItems[19].code || scannedItems[20].code
    ) {
      var totalBoxes = sumbitted[12].count
      return totalBoxes

    } else if (sumbitted[13]._id.code == scannedItems[0].code || scannedItems[1].code || scannedItems[3].code || scannedItems[4].code ||
      scannedItems[5].code || scannedItems[6].code || scannedItems[7].code || scannedItems[8].code || scannedItems[9].code ||
      scannedItems[10].code || scannedItems[11].code || scannedItems[12].code || scannedItems[13].code || scannedItems[14].code ||
      scannedItems[15].code || scannedItems[16].code || scannedItems[17].code || scannedItems[18].code || scannedItems[19].code || scannedItems[20].code
    ) {
      var totalBoxes = sumbitted[13].count
      return totalBoxes

    } else if (sumbitted[14]._id.code == scannedItems[0].code || scannedItems[1].code || scannedItems[3].code || scannedItems[4].code ||
      scannedItems[5].code || scannedItems[6].code || scannedItems[7].code || scannedItems[8].code || scannedItems[9].code ||
      scannedItems[10].code || scannedItems[11].code || scannedItems[12].code || scannedItems[13].code || scannedItems[14].code ||
      scannedItems[15].code || scannedItems[16].code || scannedItems[17].code || scannedItems[18].code || scannedItems[19].code || scannedItems[20].code
    ) {
      
      var totalBoxes = sumbitted[14].count
      return totalBoxes

    } 

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
/**
 * lOGIN FUNCTION 
 * This funtion will login the user if exist in the database.
 */

  login() {
    const EmployeeId = this.form.controls["EmployeeId"].value;
    console.log(EmployeeId);
    this.http.get("/api/employees/" + EmployeeId).subscribe(res => {
      if (res) {
        console.log('this is res', res)
        this.cookieService.set('paysession', EmployeeId, 1, '/', '', false, "Strict");

        //this.stepper
        this.router.navigate(["/sell"]);


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

  getTotalBoxes() {
    return this.ventas.map(t => t.count).reduce((acc, value) => acc + value, 0);
  }




}
