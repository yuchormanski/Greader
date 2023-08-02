import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Title } from '@angular/platform-browser';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: firebase.User | null = null;

  constructor(private auth: AngularFireAuth, private pageTitle: Title) {
    auth.user.subscribe((user) => (this.user = user));
  }

  ngOnInit(): void {
    this.pageTitle.setTitle('GReader - Profile page');
  }
}
