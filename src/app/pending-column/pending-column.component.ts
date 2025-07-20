import {
  Component,
  Output,
  EventEmitter,
} from '@angular/core';
import { TaskComponent } from '../task/task.component';

import { TasksService } from '../core/tasks.service';
import { CdkDropList, DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-pending-column',
  standalone: true,
  imports: [TaskComponent, DragDropModule],
  templateUrl: './pending-column.component.html',
  styleUrl: './pending-column.component.css',
})
export class PendingColumnComponent {
  // dataa: todo = { id: '1', name: 'assem', priority: 3, status: 'pending' };
  @Output() addTodo = new EventEmitter();
  sorted = this.taskService.pendingsorted;
  constructor(public taskService: TasksService) {}
  
  sortTodos() {
    this.sorted.update((value) => !value);
  }

  addNewTodo() {
    // Logic to add a new todo item
    this.addTodo.emit();
  }
}
