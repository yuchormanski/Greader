import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  credentials = {
    email: '',
    password: '',
  };
  isLoading = false;
  inSubmission = false;
  showAlert = false;
  alertMsg = '';
  constructor(private router: Router, private auth: AngularFireAuth) {}

  async login(loginForm: NgForm) {
    if (loginForm.invalid) return;
    this.inSubmission = true;

    try {
      this.inSubmission = true;
      this.isLoading = true;
      this.auth.signInWithEmailAndPassword(
        this.credentials.email,
        this.credentials.password
      );
      this.router.navigate(['/gallery']);
    } catch (err) {
      console.error(err);
      this.showAlert = true;
      this.alertMsg = 'Something went wrong! Please, try again later.';
      this.inSubmission = false;

      return;
    }
    this.showAlert = false;
  }
}
