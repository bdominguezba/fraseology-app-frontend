import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenStorageService } from '../../users/services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public tokenStorage: TokenStorageService, public router: Router) {}

  canActivate(): boolean {
    const token = this.tokenStorage.getToken();
    if (!token) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
  
}
