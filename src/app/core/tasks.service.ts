import { computed, Injectable, signal } from '@angular/core';
import { todo, todoNoId } from '../models/todo.model';
import { fromFetch } from 'rxjs/fetch';
import { catchError, map, switchMap } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class TasksService {
  tasks = signal<todo[]>([]);
  searchcritiriaa = signal<string>('');
  pendingsorted = signal(false);
  completedsorted = signal(false);
  constructor(private http:HttpClient){}

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
    const URL= `https://firestore.googleapis.com/v1beta1/projects/todo-2a989/databases/(default)/documents/users/${UID}/todos?documentId=${randomidstring}`;

    const headers = {
      'Content-Type': 'application/json'
    };
    const body = {
      fields: {
        name: { stringValue: todo.name },
        priority: { integerValue: todo.priority },
        status: { stringValue: todo.status },
      }
    };
    return this.http.post(URL, body, { headers: headers })
  }
  getTodos() {
    const UID = JSON.parse(localStorage.getItem('authData')!).localId;
    //https://firestore.googleapis.com/v1/projects/todo-2a989/databases/(default)/documents/users/{userId}/todos
    const URL=`https://firestore.googleapis.com/v1beta1/projects/todo-2a989/databases/(default)/documents/users/${UID}/todos`
    return this.http.get<{ documents: any[] }>(URL)
  }
  // https://firestore.googleapis.com/v1beta1/projects/todo-ab144/databases/(default)/documents/todos/${objectID}?updateMask.fieldPaths=${fieldPaths}
  updateTodoStatus(id: string, status: 'pending' | 'completed') {
    const updatedTodo: todoNoId = {
      name: this.tasks().find((todo) => todo.id === id)?.name || '',
      priority: this.tasks().find((todo) => todo.id === id)?.priority || 0,
      status,
    };
    const body = {
      fields: {
        status: { stringValue: status }
      }
    };
    const headers = {
      'Content-Type': 'application/json'
    };
    const UID = JSON.parse(localStorage.getItem('authData')!).localId;
    const URL= `https://firestore.googleapis.com/v1beta1/projects/todo-2a989/databases/(default)/documents/users/${UID}/todos/${id}?updateMask.fieldPaths=status`;
    // https://firestore.googleapis.com/v1/projects/todo-2a989/databases/(default)/documents/users/{userId}/todos
    return this.http.patch(URL, body, { headers: headers })
    
  }
  // https://firestore.googleapis.com/v1beta1/projects/todo-ab144/databases/(default)/documents/todos/${documentID}

  deleteTodo(id: string) {
    const UID = JSON.parse(localStorage.getItem('authData')!).localId;
    const URL = `https://firestore.googleapis.com/v1beta1/projects/todo-2a989/databases/(default)/documents/users/${UID}/todos/${id}`;
    return this.http.delete(URL);
       
  }
}
