import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchIconComponent } from './search-icon/search-icon.component';
import { TasksColumnsComponent } from './tasks-columns/tasks-columns.component';
import { AddNewComponent } from './add-new/add-new.component';
import { TasksService } from './tasks-columns/tasks.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SearchIconComponent, TasksColumnsComponent, AddNewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'todoapp';

  constructor(private taskService: TasksService) {}

  ngOnInit() {
    this.taskService.getTodos().subscribe((response) => {
      console.log('Fetched todos:', response);
      // Handle the response as needed
    });
  }
}
