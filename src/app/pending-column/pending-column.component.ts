import {
  Component,
  Output,
  EventEmitter,
  output,
  computed,
} from '@angular/core';
import { TaskComponent } from '../task/task.component';
import { TaskStatus } from '../tasks-columns/todo.model';
import { todo } from '../tasks-columns/todo.model';
import { TasksService } from '../tasks-columns/tasks.service';

@Component({
  selector: 'app-pending-column',
  standalone: true,
  imports: [TaskComponent],
  templateUrl: './pending-column.component.html',
  styleUrl: './pending-column.component.css',
})
export class PendingColumnComponent {
  // dataa: todo = { id: '1', name: 'assem', priority: 3, status: 'pending' };
  @Output() addTodo = new EventEmitter();
  sorted = false;
  constructor(public taskService: TasksService) {}
  sortPendingTodos = computed(() =>
    this.taskService.pendingTodos().sort((a, b) => a.priority - b.priority)
  );
  sortTodos() {
    this.sorted = !this.sorted;
  }

  addNewTodo() {
    // Logic to add a new todo item
    this.addTodo.emit();
  }
}
