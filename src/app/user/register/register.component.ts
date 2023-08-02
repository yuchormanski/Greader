import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
// import { UserService } from '../user.service';
import { AuthService } from 'src/app/services/auth.service';
import IUser from 'src/app/models/user.model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  credentials = {
    firstName: '',
    lastName: '',
    email: '',
    age: 0,
  };
  constructor(
    private router: Router,
    private auth: AuthService,
    private pageTitle: Title
  ) {}
  inSubmission = false;
  showAlert = false;
  alertMsg = 'Please wait! Your account is being created.';
  isLoading = false;

  ngOnInit(): void {
    this.pageTitle.setTitle('GReader - Register page');
  }

  async register(form: NgForm) {
    if (form.invalid) {
      this.showAlert = true;
      this.alertMsg = 'Something went wrong! Please, try again later.';
      return;
    }

    this.inSubmission = true;

    const firstName = this.credentials.firstName;
    const lastName = this.credentials.lastName;
    const email = this.credentials.email;

    const { password } = form.value;

    try {
      const userData = {
        firstName: this.credentials.firstName,
        lastName: this.credentials.lastName,
        email: this.credentials.email,
        password: password as string,
      };
      this.isLoading = true;
      await this.auth.createUser(userData as IUser);
    } catch (err) {
      console.error(err);
      this.showAlert = true;
      this.alertMsg = 'Something went wrong! Please, try again later.';
      this.inSubmission = false;
      this.isLoading = false;

      return;
    }
    this.router.navigate(['/gallery']);
    this.showAlert = false;
    this.isLoading = false;
  }
}
