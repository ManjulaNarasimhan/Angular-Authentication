
import { RouterStateSnapshot, ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './../shared/auth.service';

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate{

    constructor(
        private _router:Router,
        private _authService: AuthService
    ){ }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean{
        if(!this._authService.isLoggedIn){
            window.alert('Access Not allowed');
            this._router.navigate(['log-in']);
        }
        return true;
    }
}