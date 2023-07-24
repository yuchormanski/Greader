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

    const { username, email, password, rePassword } = form.value;
    this.userService
      .register(username!, email!, password!, rePassword!)
      .subscribe(() => {
        this.router.navigate(['/gallery']);
      });
  }
}
