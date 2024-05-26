import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn = false;

  login(email: string, password: string): Observable<boolean> {
    if (email === 'siva123@gmail.com' && password === '1234567') {
      this.isLoggedIn = true;
      localStorage.setItem('auth_token', 'dummy-token');
      return of(true);
    } else {
      return throwError(() => new Error('Invalid credentials'));
    }
  }

  logout() {
    this.isLoggedIn = false;
    localStorage.removeItem('auth_token');
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn || localStorage.getItem('auth_token') !== null;
  }
}
