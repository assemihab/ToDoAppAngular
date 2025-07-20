import { Component } from '@angular/core';
import { TasksService } from '../core/tasks.service';
import { TaskComponent } from '../task/task.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Status } from '../models/status.enum';

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
      const thecurrentStatus = event.item.data.status;
      const theotherStatus=event.item.data.status===Status.Completed?Status.Pending:Status.Completed
      this.taskService.UpdateTodosStatusLocally(event.item.data.id,theotherStatus);
      this.taskService.updateTodoStatus(
        event.item.data.id,theotherStatus).subscribe({
        next: () => {

        },
        error: (error) => {
          this.taskService.UpdateTodosStatusLocally(event.item.data.id,thecurrentStatus);
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
