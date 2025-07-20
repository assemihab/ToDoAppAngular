import { Component, input, signal, computed } from '@angular/core';
import { todo } from '../models/todo.model';
import { TasksService } from '../core/tasks.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Status } from '../models/status.enum';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  Status = Status;
  data = input.required<todo>();
  constructor(private tasksService: TasksService) {}
  isLoading = signal(false);

  deleteTodo() {
    this.isLoading.set(true);
    this.tasksService.deleteTodo(this.data().id).subscribe({
      next: () => {
        this.tasksService.tasks.update((todos) =>
          todos.filter((todo) => todo.id !== this.data().id)
        );
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error deleting todo:', error);
        window.alert(
          'An error occurred while deleting the todo. Please try again.'
        );
        this.isLoading.set(false);
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }
  toggleStatus(): void {
    
    const updatedTodo: todo = {
      ...this.data(),
      status: this.data().status === Status.Completed ? Status.Pending : Status.Completed,
    };
    this.isLoading.set(true);
    this.tasksService
      .updateTodoStatus(this.data().id, updatedTodo.status)
      .subscribe({
        next: () => {
          this.tasksService.tasks.update((todos) =>
            todos.map((todo) =>
              todo.id == this.data().id ? updatedTodo : todo
            )
          );
          this.isLoading.set(false);
        },
        error: (error) => {
          console.error('Error updating todo status:', error);
          window.alert(
            'An error occurred while updating the todo status. Please try again.'
          );
          this.isLoading.set(false);
        },
        complete: () => {
          this.isLoading.set(false);
        },
      });
    
  }
      
}
