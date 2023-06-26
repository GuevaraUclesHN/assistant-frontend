import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { faCompass } from '@fortawesome/free-regular-svg-icons';
import { faPlane } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDays } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit {

  Compass = faCompass;
  Plane = faPlane;
  Lugar = faLocationDot;
  Calendar = faCalendarDays;

  constructor(private router: Router) { }

  ngOnInit(): void {
    
  }

  goToPage() {
    this.router.navigate(['/calendario']);
  }

  Start() {
    this.router.navigate(['/voice']);
  }

}
