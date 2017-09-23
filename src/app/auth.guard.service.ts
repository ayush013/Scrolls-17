import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { ServerService } from './server.service';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private serverservice: ServerService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    if (this.serverservice.isAuthenticated() == true) {
     	return true;
     } 
     else {
      this.router.navigate(['/']);
     }
     
  }

}
