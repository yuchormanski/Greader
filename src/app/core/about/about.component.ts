import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  isNotHome: boolean = false;
  constructor() {}

  ngOnInit(): void {
    this.isNotHome = true;
  }
}
