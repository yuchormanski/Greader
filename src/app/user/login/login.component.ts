import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  credentials = {
    email: '',
    password: '',
  };
  isLoading = false;
  inSubmission = false;
  showAlert = false;
  alertMsg = '';
  constructor(
    private router: Router,
    private auth: AngularFireAuth,
    private pageTitle: Title
  ) {}

  ngOnInit(): void {
    this.pageTitle.setTitle('GReader - Login page');
  }

  async login(loginForm: NgForm) {
    if (loginForm.invalid) return;
    this.inSubmission = true;

    try {
      this.inSubmission = true;
      this.isLoading = true;
      await this.auth.signInWithEmailAndPassword(
        this.credentials.email,
        this.credentials.password
      );
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
  }
}
