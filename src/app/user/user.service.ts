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
    // try {
    //   const lsUser = localStorage.getItem(this.USER_KEY) || '';
    //   this.user = JSON.parse(lsUser);
    // } catch (error) {
    //   this.user = undefined;
    // }
  }

  login(email: string, password: string) {
    return this.http.post<User>(`/users/login`, { email, password });
  }

  register(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) {
    return this.http.post<User>(`/users/register`, {
      firstName,
      lastName,
      email,
      password,
    });
  }

  logout(): void {
    this.user = undefined;
    localStorage.removeItem(this.USER_KEY);
    this.router.navigate(['/']);
  }
}
