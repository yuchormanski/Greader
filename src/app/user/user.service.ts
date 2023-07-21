import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { User } from '../types/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: User | undefined;
  USER_KEY = '[user]';

  get isLogged(): boolean {
    return !!this.user;
  }

  constructor(private router: Router, private http: HttpClient) {
    try {
      const lsUser = localStorage.getItem(this.USER_KEY) || '';
      this.user = JSON.parse(lsUser);
    } catch (error) {
      this.user = undefined;
    }
  }

  login(email: string, password: string): void {
    const { appUrl } = environment;

    this.http.post<User>(`${appUrl}/users/login`, { email, password });

    this.user = {
      email,
      password,
    };
    console.log(this.user);

    localStorage.setItem(this.USER_KEY, JSON.stringify(this.user));
    this.router.navigate(['/home']);
  }

  logout(): void {
    this.user = undefined;
    localStorage.removeItem(this.USER_KEY);
    this.router.navigate(['/']);
  }
}
