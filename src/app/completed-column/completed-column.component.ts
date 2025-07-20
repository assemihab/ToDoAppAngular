import { Component } from '@angular/core';
import { TasksService } from '../core/tasks.service';
import { TaskComponent } from '../task/task.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-completed-column',
  standalone: true,
  imports: [TaskComponent, DragDropModule],
  templateUrl: './completed-column.component.html',
  styleUrl: '../pending-column/pending-column.component.css',
})
export class CompletedColumnComponent {
  sorted = this.taskService.completedsorted;
  constructor(private taskService: TasksService) {}
  completedTodos = this.taskService.completedTodos;

  sortTodos() {
    this.sorted.update((value) => !value);
  }
  drop(event: any) {
    if (event.previousContainer !== event.container) {
      console.log("data", event.item.data);
    }

  }
}
