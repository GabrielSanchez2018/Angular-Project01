import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, RouterState } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class RoleEmpGuard implements CanActivate {

    constructor(private router: Router, private http: HttpClient, private cookieService: CookieService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.getempRole().pipe(map(res => {
            console.log(res);
            if (res === "standard") {
                return true;
            } else {
                this.router.navigate(['/']);
                return false;
            }
        }));
    }

    getempRole() {
        return this.http.get('/api/employees/' + this.cookieService.get('paysession') + '/role');
    }
}
