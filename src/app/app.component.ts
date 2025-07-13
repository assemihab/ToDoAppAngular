import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchIconComponent } from './search-icon/search-icon.component';
import { TasksColumnsComponent } from './tasks-columns/tasks-columns.component';
import { AddNewComponent } from './add-new/add-new.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SearchIconComponent, TasksColumnsComponent, AddNewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'todoapp';
}
