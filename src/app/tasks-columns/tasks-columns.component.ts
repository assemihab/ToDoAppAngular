import { Component, OnInit } from '@angular/core';
import { PendingColumnComponent } from '../pending-column/pending-column.component';
import { CompletedColumnComponent } from '../completed-column/completed-column.component';
import { AddNewComponent } from '../add-new/add-new.component';
import { SearchIconComponent } from '../search-icon/search-icon.component';
import { TasksService } from '../core/tasks.service';
import {todo} from '../models/todo.model';

@Component({
  selector: 'app-tasks-columns',
  standalone: true,
  imports: [PendingColumnComponent, AddNewComponent, CompletedColumnComponent,SearchIconComponent],
  templateUrl: './tasks-columns.component.html',
  styleUrl: './tasks-columns.component.css',
})
export class TasksColumnsComponent implements OnInit   {
  isAddingTasks: boolean = false;
    constructor(public taskService: TasksService) {}
  ngOnInit() {
    this.taskService.getTodos().subscribe({
      next: (response) => {
        const todos: todo[] = [];
        console.log('response', response);
        for (const doc of response.documents) {
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
    });
  }

  onAddNew() {
    this.isAddingTasks = true;
  }
  onCancelNew() {
    this.isAddingTasks = false;
  }
}
