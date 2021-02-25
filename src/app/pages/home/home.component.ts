import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  employees: Object;
  username: any;
  user: any;
  invoice: any;
  hidden = false;

  // toggleBadgeVisibility() {
  //   this.hidden = !this.hidden;
  // }
  show: boolean = true;
  appear: boolean = true;
  time: Object;
  Language_sh: boolean = true;

  


  constructor(private http: HttpClient, private cookieService: CookieService,private router: Router) {

    this.user = this.cookieService.get('sessionuser');
    this.http.get('api/employees/' + this.user.toUpperCase() ).subscribe(res =>{
      this.user = res;
    //   if(Array.isArray(res)){
    //     this.employees = res.filter(q => q.username === this.username);
    //  }
      console.log('super duper',this.user)
    }, err => {
      console.log(err);
    })


    this.user = this.cookieService.get('sessionuser');
    this.http.get('/api/invoices/' + this.user.toUpperCase()).subscribe(res =>{
      this.invoice = res

      console.log( 'invoce',this.invoice)
      console.log( 'invoce',this.invoice.length)
      var invoiceCounter = this.invoice.length
    console.log('This counts the invoice length',invoiceCounter)
     /**
      * If the invoice is bigger than 1, the user would not be able to imput another order.
      *
      */
    if(invoiceCounter > 0){
      console.log('true')
      this.show = false
    } else {
      console.log('false')
      this.show = true
    }
    }, err => {
      console.log(err)
    })

    /***
     * Get the time to hide the fuction after a time
     */

    this.http.get('api/time/' ).subscribe(res =>{
      this.time = res;
      console.log('time set up',this.time)

      var timenow = new Date()

      const day = timenow.getUTCDate()
      const year = timenow.getUTCFullYear()
      const month = timenow.getMonth()



      var now = new Date();
    var start = new Date(now.getFullYear(), 0, 0);
    let diff = Math.abs( now.valueOf() - start.valueOf());
    var oneday = 1000 * 60 * 60* 24;

    var timerightnow = Math.floor(  oneday / diff);

    var diffe = Math.abs( start.valueOf()- now.valueOf());
    var lastdate = Math.floor(diffe / (1000 * 3600 * 24));

    console.log('this is the time now', lastdate)
    console.log('this is set', this.time[0].time)


      if(lastdate < this.time[0].time){
        console.log('true')
        this.appear = true

      } else {
        console.log('false')
        this.appear = false
      }

    }, err => {
      console.log(err);
    })

    /**
     * Getting Language starting
     */

     var EnglishCookie = cookieService.get("Language");

     console.log('this is the cookie',EnglishCookie)

     if(EnglishCookie = "english"){
      this.Language_sh = true
     } else {
       this.Language_sh = false
     }

  }

  timeExpire(){
    var countDownDate = new Date("Jan 5, 2021 15:37:25").getTime();

    // Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (100 * 60 * 60 * 24)) / (10000 * 60 * 60));
  var minutes = Math.floor((distance % (100 * 60 * 60)) / (700 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Output the result in an element with id="demo"
  document.getElementById("demo").innerHTML = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";

  // If the count down is over, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);

console.log(this.timeExpire())
  }

  onLogout() {

    localStorage.clear();
    localStorage.removeItem(this.user);
    this.cookieService.delete('sessionuser')
    this.cookieService.delete('paysession')
    this.router.navigate(['/session/sign-in-employee']);
    //the follogin function will reload the browser when you sign out
    //This clears the cookie
   // window.location.reload();
  }


  ngOnInit() {
  }


  //Language Code 
  //This will translate English, Spanish and Burmise. 
firstLanguageChange(){
  var lan = this.cookieService.get('Language')

  if (lan == "espanol"){
    return "Ordena Ahora!"
  } else if(lan == "english"){
    return "Place your order Right Now!"
  } else if(lan == "burmise"){
    return "သင်ရဲ့ ပြစ် စီးကိုအခုပဲမှာထားပါ "

  }

}

secondLanguageChange(){
  var lan = this.cookieService.get('Language')

  if (lan == "espanol"){
    return "Por Favor, Selecciona solo dos cajas"
  } else if(lan == "english"){
    return "Select only two items"
  } else if(lan == "burmise"){
    return "ပစ္စည်း နှစ်ခုကို ပဲရွေးချယ်ပါ  "

  } 
}

buttonOneLanguageChange(){
  var lan = this.cookieService.get('Language')

  if (lan == "espanol"){
    return "Orderna Carne Aqui"
  } else if(lan == "english"){
    return "Order Meat Now!"
  }  else if(lan == "burmise"){
    return "အသားကိုအခုပဲမှာပါ "

  } 
}
buttonTwoLanguageChange(){
  var lan = this.cookieService.get('Language')

  if (lan == "espanol"){
    return "Verifica tu orden Aqui!"
  } else if(lan == "english"){
    return "Check My Order!"
  }  else if(lan == "burmise"){
    return "ကိုမှာတဲ့ပစ္စည်းကိုစစ်ဆေး"

  } 
}

thirdLanguageChange(){
  var lan = this.cookieService.get('Language')

  if (lan == "espanol"){
    return "No mas Ordenes"
  } else if(lan == "english"){
    return "No longer accepting orders"
  }  else if(lan == "burmise"){
    return "ပစ္စည်းကိုမှာပို့လက်မခံတော့ပူး"

  } 
}

fourthLanguageChange(){
  var lan = this.cookieService.get('Language')

  if (lan == "espanol"){
    return "Asta la proxima"
  } else if(lan == "english"){
    return "See you next time"
  }  else if(lan == "burmise"){
    return "နောက်တစ်ခါတွေ့ကြမယ် "

  } 
}

fifthLanguageChange(){
  var lan = this.cookieService.get('Language')

  if (lan == "espanol"){
    return "Gracias"
  } else if(lan == "english"){
    return "Thank you"
  }  else if(lan == "burmise"){
    return "ကျေးဇူးတင်ပါတယ် "

  } 
}
sixLanguageChange(){
  var lan = this.cookieService.get('Language')

  if (lan == "espanol"){
    return "Gracias por tu orden"
  } else if(lan == "english"){
    return "Thank you for your order!"
  } else if(lan == "burmise"){
    return "သင်ပစ္စည်းမှာတဲ့အတွက်ကျေးဇူးတင်ပါတယ် "

  }  
}
logoutLanguageChange(){
  var lan = this.cookieService.get('Language')

  if (lan == "espanol"){
    return "Salir"
  } else if(lan == "english"){
    return "Logout"
  }  else if(lan == "burmise"){
    return "အကောင့်ဟနေထွက်လက်ပါ "

  } 
}

}
