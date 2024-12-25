import { Injectable } from '@angular/core';
import { GlobalService } from './services/global.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private global: GlobalService) {}

  async canActivate(): Promise<boolean> {
    const isLoggedIn = this.global.getStorage('isLoggedIn');
    if (isLoggedIn) return true;
    else {
      this.global.logout();
      return false;
    }
  }
}
