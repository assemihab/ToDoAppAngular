import { Injectable, signal } from '@angular/core';
import { todo } from './todo.model';
import { fromFetch } from 'rxjs/fetch';
import { map } from 'rxjs/operators';
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
    return fromFetch(
      'https://firestore.googleapis.com/v1beta1/projects/todo-ab144/databases/(default)/documents/todos'
    ).pipe(
      // Handle the response and convert it to the desired format
      map((response) => {
        if (response.ok) {
          return response.json().then((data) => data.documents || []);
        } else {
          throw new Error('Failed to fetch todos');
        }
      })
    );
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
