import { Component } from '@angular/core';
import { todo } from '../tasks-columns/todo.model';
import { TasksService } from '../tasks-columns/tasks.service';
import { computed } from '@angular/core';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-completed-column',
  standalone: true,
  imports: [TaskComponent],
  templateUrl: './completed-column.component.html',
  styleUrl: '../pending-column/pending-column.component.css',
})
export class CompletedColumnComponent {
  constructor(private taskService: TasksService) {}
  completedTodos = this.taskService.completedTodos;
  sorted = false;
  sortCompletedTodos = computed(() =>
    this.completedTodos().sort((a, b) => a.priority - b.priority)
  );
  sortTodos() {
    this.sorted = !this.sorted;
  }
}
