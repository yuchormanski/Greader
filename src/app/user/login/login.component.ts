import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private router: Router, private userService: UserService) {}

  login(form: NgForm): void {
    const email: string = form.value.email;
    const password: string = form.value.password;
    console.log(email, password);

    // this.router.navigate(['home']);
    this.userService.login(email, password);
  }
}
