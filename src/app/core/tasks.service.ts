import { computed, Injectable, signal } from '@angular/core';
import { todo, todoNoId } from '../models/todo.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
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
  addTodo(todo: todoNoId, objectID?: string) {
    const randomidstring = objectID;
    console.log('the todo to add', todo);
    const UID = JSON.parse(localStorage.getItem('authData')!).localId;

    const URL= `${environment.myCollectionEndPoint}${UID}/todos?documentId=${randomidstring}`;

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
    const URL=`${environment.myCollectionEndPoint}${UID}/todos`
    return this.http.get<{ documents: any[] }>(URL)
  }
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
    const URL= `${environment.myCollectionEndPoint}${UID}/todos/${id}?updateMask.fieldPaths=status`;
    return this.http.patch(URL, body, { headers: headers })
    
  }

  deleteTodo(id: string) {
    const UID = JSON.parse(localStorage.getItem('authData')!).localId;
    const URL = `${environment.myCollectionEndPoint}${UID}/todos/${id}`;
    return this.http.delete(URL);
       
  }
}
