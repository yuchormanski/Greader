import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private router: Router, private userService: UserService) {}

  register(form: NgForm) {
    if (form.invalid) return;

    const { firstName, lastName, email, password } = form.value;
    this.userService
      .register(firstName!, lastName!, email!, password!)
      .subscribe(() => {
        this.router.navigate(['gallery']);
      });
  }
}
