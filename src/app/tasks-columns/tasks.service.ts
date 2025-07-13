import { Injectable, signal } from '@angular/core';
import { todo } from './todo.model';
@Injectable({
  providedIn: 'root',
})
export class TasksService {
  tasks = signal<todo[]>([]);

  addTodo(name: string, priority: number) {
    const newTodo: todo = {
      name,
      priority,
      status: 'pending',
    };
    this.tasks.update((currentTasks) => [...currentTasks, newTodo]);
  }
  getTodos() {
    return this.tasks();
  }
  updateTodoStatus(index: number, status: 'pending' | 'completed') {}
  deleteTodo(id: number) {}
  sortTodos() {
    // Logic to sort todos
    console.log('Sorting todos');
  }
  filter(criteria: string) {
    // Logic to filter todos based on criteria
    console.log('Filtering todos with criteria:', criteria);
    return this.tasks().filter((todo) => todo.name.includes(criteria));
  }
}
