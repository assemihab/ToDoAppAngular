import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { OnInit } from '@angular/core';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {


  authorized = false;
  title = 'todoapp';
  ngOnInit(): void {
    console.log('AppComponent initialized');
  }



  
}
