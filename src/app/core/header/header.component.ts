import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
// import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  // isAuthenticated = false;
  siteLogo = '';

  constructor(
    private router: Router,
    public hasUser: AuthService,
    private auth: AngularFireAuth
  ) {
    // this.auth.isAuthenticated$.subscribe((status) => {
    //   this.isAuthenticated = status;
    // });
  }

  ngOnInit(): void {
    this.siteLogo = '/assets/img/Greader-1.png';
  }

  async logout($event: Event) {
    $event.preventDefault();
    await this.auth.signOut();
    this.router.navigate(['/gallery']); //TODO: не съм сигурен дали да се редиректва....
  }
}
