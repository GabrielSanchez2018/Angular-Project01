import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit {

  Espanol: any;

  constructor(private router: Router,
    private cookieService: CookieService,
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  languageEsp(){
    
    const esp = "espanol"
    this.cookieService.set('Language', esp , 1 , '/', '', false, "Lax");
    this.router.navigate(["/"])
  }

  languageEnglish(){
    const eng = "english"
    this.cookieService.set('Language', eng , 1 , '/', '', false, "Lax");
    this.router.navigate(["/"])
  }
  
  languageBurmise(){
    const bur = "burmise"
    this.cookieService.set('Language', bur , 1 , '/', '', false, "Lax");
    this.router.navigate(["/"])
  }

}
