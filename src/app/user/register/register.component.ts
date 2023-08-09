import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import IUser from 'src/app/models/user.model';
import { Title } from '@angular/platform-browser';
import { FirebaseError } from '@angular/fire/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  user: firebase.User | null = null;
  hasUser = false;

  credentials = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    age: 0,
    gender: '',
  };
  constructor(
    private router: Router,
    private auth: AuthService,
    private pageTitle: Title,
    private userAuth: AngularFireAuth
  ) {
    const hasUser = getAuth();
    onAuthStateChanged(hasUser, (user) => {
      if (!!user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        router.navigate(['/gallery']);
      }
    });
  }
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

    const firstName = this.credentials.firstName
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .trim();
    const lastName = this.credentials.lastName
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .trim();
    const email = this.credentials.email;
    const password = this.credentials.password.replace(/[^\s ]/g, '');
    // const { password } = form.value;

    try {
      // trim inputs and check for unavailable characters
      // const userData = {
      //   firstName: this.credentials.firstName,
      //   lastName: this.credentials.lastName,
      //   email: this.credentials.email,
      //   password: this.credentials.password,
      // };
      const userData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      };

      this.isLoading = true;
      await this.auth.createUser(userData as IUser);
    } catch (err) {
      this.showAlert = true;
      if (err instanceof FirebaseError) {
        let message = err.message.slice(9).split('. ')[0] + '.';
        this.alertMsg = message;
      }

      this.inSubmission = false;
      this.isLoading = false;

      return;
    }
    this.router.navigate(['/gallery']);
    this.showAlert = false;
    this.isLoading = false;
  }
}
