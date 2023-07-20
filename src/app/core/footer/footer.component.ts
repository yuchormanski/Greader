import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Book } from 'src/app/types/book';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  lastThree: Book[] = [];
  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.apiService.getFooterBooks().subscribe((lastAdded) => {
      this.lastThree = lastAdded.slice(0, 3);
    });
  }

  redirectTo(id: string): void {
    this.router.navigate([`/${id}`]);
  }
}
