import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchIconComponent } from './search-icon/search-icon.component';
import { TasksColumnsComponent } from './tasks-columns/tasks-columns.component';
import { AddNewComponent } from './add-new/add-new.component';
import { TasksService } from './tasks-columns/tasks.service';
import { OnInit } from '@angular/core';
import { todo } from './tasks-columns/todo.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SearchIconComponent, TasksColumnsComponent, AddNewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'todoapp';

  constructor(private taskService: TasksService) {}

  ngOnInit() {
    this.taskService.getTodos().subscribe({
      next: (response) => {
        // const pendingTodos = this.taskService.getPendingTodos(response);

        const todos: todo[] = [];
        for (const doc of response) {
          const fields = doc.fields;
          const idd = doc.name.split('/').pop();

          const newTodo: todo = {
            id: idd,
            name: fields.name.stringValue,
            priority: +fields.priority.integerValue,
            status: fields.status.stringValue as todo['status'],
          };

          todos.push(newTodo);
        }
        this.taskService.tasks.set(todos);
      },
      error: (error) => {
        console.error('Error fetching todos:', error);
      },
      complete: () => {
        console.log('todosare fetched successfully');
      },
      // Handle the response as needed
    });
  }
}
