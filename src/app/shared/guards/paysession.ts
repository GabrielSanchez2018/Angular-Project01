
import { HttpClient } from '@angular/common/http';

import { flatMap } from 'rxjs/operators';


import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, RouterState } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({providedIn: 'root'})
export class PaySessionGuard implements CanActivate {

    constructor(private router: Router, private cookieService: CookieService) {
 }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        const isAuthenticated = this.cookieService.get('paysession');

        if (isAuthenticated) {
            return true;
        } else {
            this.router.navigate(['/barcode-info']);
            return false;
        }
    }
}
