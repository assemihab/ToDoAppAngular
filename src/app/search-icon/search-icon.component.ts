import { Component, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../core/tasks.service';

@Component({
  selector: 'app-search-icon',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-icon.component.html',
  styleUrl: './search-icon.component.css',
})
export class SearchIconComponent {
  searchCritiria = '';

  constructor(private tasksServices: TasksService) {}
  onSearchChange() {
    this.tasksServices.searchcritiriaa.update(() => this.searchCritiria);
  }
}
