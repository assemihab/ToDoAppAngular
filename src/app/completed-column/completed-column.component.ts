import { Component } from '@angular/core';
import { TasksService } from '../core/tasks.service';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-completed-column',
  standalone: true,
  imports: [TaskComponent],
  templateUrl: './completed-column.component.html',
  styleUrl: '../pending-column/pending-column.component.css',
})
export class CompletedColumnComponent {
  sorted=this.taskService.completedsorted;
  constructor(private taskService: TasksService) {}
  completedTodos = this.taskService.completedTodos;
  
  sortTodos() {
    this.sorted.update((value) => !value);
  }
}
