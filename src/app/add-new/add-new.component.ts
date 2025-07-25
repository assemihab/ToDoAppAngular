import { Component, EventEmitter, Output } from '@angular/core';
import { TasksService } from '../core/tasks.service';
import { FormsModule } from '@angular/forms';
import { Status } from '../models/status.enum';

@Component({
  selector: 'app-add-new',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-new.component.html',
  styleUrl: './add-new.component.css',
})
export class AddNewComponent {
  @Output() cancel = new EventEmitter();
  constructor(private taskService: TasksService) {}
  name = '';
  priority = 1;
  status = Status.Pending;

  onSubmit() {
    console.log(
      `Adding new todo: ${this.name}, Priority: ${this.priority}, Status: ${this.status}`
    );
    const timestampID = new Date().getTime().toString();
    const todowithoutId = {
      name: this.name,
      priority: this.priority,
      status: this.status as Status,
    };

    this.taskService.addTodo(todowithoutId, timestampID).subscribe({
      next: (todo) => {
        console.log('Todo added successfully:', todo);
        this.taskService.tasks.update((todos) => [
          ...todos,
          { id: timestampID, ...todowithoutId },
        ]);
      },

      error: (error) => {
        console.error('Error adding todo:', error);
      },
      complete: () => {
        console.log('Todo addition completed');
      },
    });
    this.cancel.emit();
  }
  onCancel() {
    this.cancel.emit();
  }
}
