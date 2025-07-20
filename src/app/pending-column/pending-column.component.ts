import {
  Component,
  Output,
  EventEmitter,
} from '@angular/core';
import { TaskComponent } from '../task/task.component';

import { TasksService } from '../core/tasks.service';
import { CdkDropList, DragDropModule } from '@angular/cdk/drag-drop';
import { Status } from '../models/status.enum';

@Component({
  selector: 'app-pending-column',
  standalone: true,
  imports: [TaskComponent, DragDropModule],
  templateUrl: './pending-column.component.html',
  styleUrl: './pending-column.component.css',
})
export class PendingColumnComponent {
  @Output() addTodo = new EventEmitter();
  sorted = this.taskService.pendingsorted;
  constructor(public taskService: TasksService) {}
  
  sortTodos() {
    this.sorted.update((value) => !value);
  }

  addNewTodo() {

    this.addTodo.emit();
  }
  drop(event: any) {
    if (event.previousContainer !== event.container) {
      console.log("data", event.item.data);
      const thecurrentStatus = event.item.data.status;
      const theotherStatus = event.item.data.status === Status.Pending ? Status.Completed : Status.Pending;
      this.taskService.UpdateTodosStatusLocally(event.item.data.id, theotherStatus);
      this.taskService.updateTodoStatus(
        event.item.data.id, theotherStatus).subscribe({
        next: () => {

        },
        error: (error) => {
          this.taskService.UpdateTodosStatusLocally(event.item.data.id, thecurrentStatus);
          console.error('Error updating todo status:', error);
          window.alert(
            'An error occurred while updating the todo status. Please try again.'
          );
        },
        complete: () => {
          console.log('Todo status updated successfully');
        }
      });
    }
  }
}
