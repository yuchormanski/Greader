import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: User | undefined;
  USER_KEY = '[user]';

  get isLogged(): boolean {
    return !!this.user;
  }

  constructor(private router: Router) {
    try {
      const lsUser = localStorage.getItem(this.USER_KEY) || '';
      this.user = JSON.parse(lsUser);
    } catch (error) {
      this.user = undefined;
    }
  }

  login(email: string, password: string): void {
    this.user = {
      email,
      password,
    };
    localStorage.setItem(this.USER_KEY, JSON.stringify(this.user));
    this.router.navigate(['/home']);
  }

  logout(): void {
    this.user = undefined;
    localStorage.removeItem(this.USER_KEY);
    this.router.navigate(['/']);
  }
}
