import { Component, OnInit } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
// import firebase from 'firebase/compat/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
// import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // user: firebase.User | null = null;

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
    private pageTitle: Title,
    private userAuth: AngularFireAuth // private auth: AuthService,
  ) {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (!!user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        router.navigate(['/gallery']);
      }
    });
  }

  ngOnInit(): void {
    this.pageTitle.setTitle('GReader - Login page');
  }

  async login(loginForm: NgForm) {
    if (loginForm.invalid) return;
    this.inSubmission = true;

    try {
      this.inSubmission = true;
      this.isLoading = true;
      await this.userAuth.signInWithEmailAndPassword(
        this.credentials.email,
        this.credentials.password.trim()
      );
    } catch (err) {
      console.error(err);
      this.showAlert = true;
      if (err instanceof FirebaseError) {
        let message = err.message.slice(9).split('. ')[0] + '.';
        this.alertMsg = message;
      }
      // this.alertMsg = 'Invalid username or password';
      this.inSubmission = false;
      this.isLoading = false;

      return;
    }
    this.router.navigate(['/gallery']);
    this.showAlert = false;
  }
}
