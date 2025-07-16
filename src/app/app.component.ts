import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TasksColumnsComponent } from './tasks-columns/tasks-columns.component';
import { AddNewComponent } from './add-new/add-new.component';
import { TasksService } from './tasks-columns/tasks.service';
import { OnInit } from '@angular/core';
import { todo } from './tasks-columns/todo.model';


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
