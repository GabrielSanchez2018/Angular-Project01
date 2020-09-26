// This function will download an excel file
//


import {Injectable} from '@angular/core'
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { JAN } from '@angular/material';


const EXCEL_TYPE =
'application/nvd.openxmlformats-officedocument.spreedsheetml.sheet; charset=UTF-8'
const EXCEL_EXT = '.xlsx';

@Injectable()

export class ExporterService{
 

  constructor(){}

  exportToExcel(scanneditems: any[], leftoveritems: any[], allreport: any[], leftoverreport: any[], excelFileName: string): void{
    const worksheetscanneditems: XLSX.WorkSheet = XLSX.utils.json_to_sheet(scanneditems);
    const worksheetsleftoveritems: XLSX.WorkSheet = XLSX.utils.json_to_sheet(leftoveritems);
    const worksheetallreport: XLSX.WorkSheet = XLSX.utils.json_to_sheet(allreport);
    const worksheetleftoverreport: XLSX.WorkSheet = XLSX.utils.json_to_sheet(leftoverreport);
    const workbook: XLSX.WorkBook = {
      Sheets: {
        'GOP ITEMS': worksheetscanneditems,
        'LEFTOVER ITEMS': worksheetsleftoveritems,
        "GOP REPORT" :  worksheetallreport,
        "LEFTOVER REPORT": worksheetleftoverreport

      },
      SheetNames: ['GOP ITEMS', 'LEFTOVER ITEMS', 'GOP REPORT', 'LEFTOVER REPORT']
    };
    const excelBuffer: any = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
    //call method buffer and file Name
    this.savedAsExcel(excelBuffer, excelFileName);
  }
  private savedAsExcel(buffer: any, fileName: string): void{
    const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
    
    var date = new Date()
    
    const day = date.getUTCDate()
    const year = date.getUTCFullYear()
    const month = date.getMonth()

    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const d = new Date();


     var downloadDate = monthNames[d.getMonth()] + '/' + day + '/' + year 

    FileSaver.saveAs(data, fileName + '_export' + '_'+ downloadDate + EXCEL_EXT);
  }


/**
 * Function to download the HR Report 
 * 
 */



  exportToExceltwo(hrdownload: any[], excelFileNameTwo: string): void{
    const worksheetscanneditems: XLSX.WorkSheet = XLSX.utils.json_to_sheet(hrdownload);
   
    const workbook: XLSX.WorkBook = {
      Sheets: {
        'HR REPORT': worksheetscanneditems,
       

      },
      SheetNames: ['HR REPORT']
    };
    const excelBuffer: any = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
    //call method buffer and file Name
    this.savedAsExceltwo(excelBuffer, excelFileNameTwo);
  }
  private savedAsExceltwo(buffer: any, fileName: string): void{
    const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
    
    var date = new Date()
    
    const day = date.getUTCDate()
    const year = date.getUTCFullYear()
    const month = date.getMonth()
    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const d = new Date();


     var downloadDate = monthNames[d.getMonth()] + '/' + day + '/' + year 

    FileSaver.saveAs(data, fileName + '_export'+'_' + downloadDate + EXCEL_EXT);
  }


}


