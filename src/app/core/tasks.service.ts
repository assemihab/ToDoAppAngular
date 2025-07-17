import { computed, Injectable, signal } from '@angular/core';
import { todo, todoNoId } from '../models/todo.model';
import { fromFetch } from 'rxjs/fetch';
import { catchError, map, switchMap } from 'rxjs/operators';
import { from, of } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class TasksService {
  tasks = signal<todo[]>([]);
  searchcritiriaa = signal<string>('');
  pendingsorted = signal(false);
  completedsorted = signal(false);

  readonly pendingTodos = computed(() => {
    const search = this.searchcritiriaa(); 
    const todos = this.tasks().filter(
      (todo) => todo.status === 'pending' && todo.name.includes(search)
    );

    if (!this.pendingsorted()) {
      return todos;
    }

    return [...todos].sort((a, b) => a.priority - b.priority); 
  }
  );
  readonly completedTodos = computed(() => {
    const search = this.searchcritiriaa(); 
    const todos = this.tasks().filter(
      (todo) => todo.status === 'completed' && todo.name.includes(search)
    );
    if (!this.completedsorted()) {
      return todos;
    }
    return [...todos].sort((a, b) => a.priority - b.priority); 
  });
  // https://firestore.googleapis.com/v1beta1/projects/todo-ab144/databases/(default)/documents/todos?documentId=${documentID}
  addTodo(todo: todoNoId, objectID?: string) {
    const randomidstring = objectID;
    console.log('the todo to add', todo);
    const UID = JSON.parse(localStorage.getItem('authData')!).localId;
    //https://firestore.googleapis.com

    return fromFetch(
      `https://firestore.googleapis.com/v1/projects/todo-2a989/databases/(default)/documents/users/${UID}/todos?documentId=` +
      randomidstring,
      {
        method: 'POST',
        body: JSON.stringify({
          fields: {
            name: { stringValue: todo.name },
            priority: { integerValue: todo.priority },
            status: { stringValue: todo.status },
          },
        }),
        headers: { 'Content-Type': 'application/json' },
      }
    ).pipe(
      switchMap((response) => {
        if (!response.ok) {
          throw new Error('Failed to add todo');
        }
        return from(response.json());
      }),
      catchError((err) => {
        console.error('Error adding todo:', err);
        window.alert('Error adding todo');
        throw new Error("failed to add todo")
      })
    );
  }
  getTodos() {
    const UID = JSON.parse(localStorage.getItem('authData')!).localId;
    //https://firestore.googleapis.com/v1/projects/todo-2a989/databases/(default)/documents/users/{userId}/todos
    return fromFetch(
      `https://firestore.googleapis.com/v1beta1/projects/todo-2a989/databases/(default)/documents/users/${UID}/todos`,
    ).pipe(
      switchMap((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }
        return from(response.json()); // Converts Promise to Observable ✅
      }),
      map((data) => data.documents || []),

      catchError((err) => {
        console.error('Error fetching todos:', err);
        window.alert('Error fetching todos');
        return of([]); // fallback value
      })
    );
  }
  // https://firestore.googleapis.com/v1beta1/projects/todo-ab144/databases/(default)/documents/todos/${objectID}?updateMask.fieldPaths=${fieldPaths}
  updateTodoStatus(id: string, status: 'pending' | 'completed') {
    const updatedTodo: todoNoId = {
      name: this.tasks().find((todo) => todo.id === id)?.name || '',
      priority: this.tasks().find((todo) => todo.id === id)?.priority || 0,
      status,
    };
    const UID = JSON.parse(localStorage.getItem('authData')!).localId;
    // https://firestore.googleapis.com/v1/projects/todo-2a989/databases/(default)/documents/users/{userId}/todos
    return fromFetch(
      `https://firestore.googleapis.com/v1beta1/projects/todo-2a989/databases/(default)/documents/users/${UID}/todos/${id}?updateMask.fieldPaths=status`,
      {
        method: 'PATCH',
        body: JSON.stringify({ fields: { status: { stringValue: status } } }),
        headers: { 'Content-Type': 'application/json' },
      }
    ).pipe(
      switchMap((response) => {
        if (!response.ok) {
          throw new Error('Failed to update todo status');
        }
        return of(updatedTodo);
      }),
      catchError((err) => {
        console.error('Error updating todo status:', err);
        window.alert('Error updating todo status');
        throw new Error("failed to update todos")
      })
    );
  }
  // https://firestore.googleapis.com/v1beta1/projects/todo-ab144/databases/(default)/documents/todos/${documentID}

  deleteTodo(id: string) {
    const UID = JSON.parse(localStorage.getItem('authData')!).localId;
    return fromFetch(
      `https://firestore.googleapis.com/v1beta1/projects/todo-2a989/databases/(default)/documents/users/${UID}/todos/${id}`,
      {
        method: 'DELETE',
      }
    ).pipe(
      switchMap((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete todo');
        }
        this.tasks.update((currentTasks) =>
          currentTasks.filter((todo) => todo.id !== id)
        );
        return of(null);
      }),
      catchError((err) => {
        console.error('Error deleting todo:', err);
        window.alert('Error deleting todo');
        throw new Error("error deleting todo")
      })
    );
  }
  sortTodos() {
    // Logic to sort todos
    console.log('Sorting todos');
  }
  filter(criteria: string) {
    console.log('Filtering todos with criteria:', criteria);
    return this.tasks().filter((todo) => todo.name.includes(criteria));
  }
}
