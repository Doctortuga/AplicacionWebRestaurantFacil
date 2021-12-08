import { Injectable } from '@angular/core';
import { CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot
,UrlTree } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/Services/login.service';




@Injectable({
    providedIn: 'root'
  })
  export class AuthGuard implements CanActivate {
    constructor(private login:LoginService,private router: Router) { }




    canActivate() {
        var url = localStorage.getItem("puede ingresar");
        console.log(url);
      if(url=="false" || !url)
        {
          console.log("dadawwad");
          this.router.navigate(['/login']);
          return false;
        }
        else
        {
          return true;
        }
      
    }
    
  }
