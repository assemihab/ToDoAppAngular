import { Status } from "../models/status.enum";
import { todo } from "../models/todo.model";

export const mockCredentials = {
    email: 'test@gmail.com',
    password:'dfdfdfdf',
    };
export const mockResponse = {
    idToken: 'fake-token',
    localId: 'abc123'
};
export const mockTodos:todo[] = [
    { id: '1', name: 'Mock Task 1', priority: 1, status: Status.Pending },
    { id: '2', name: 'Mock Task 2', priority: 2, status: Status.Completed },
    { id: '3', name: 'Mock Task 3', priority: 3, status: Status.Pending },
    { id: '4', name: 'Mock Task 4', priority: 1, status: Status.Completed },
    { id: '5', name: 'Mock Task 5', priority: 1, status: Status.Pending },
    {id: '6', name: 'Mock Task 6', priority: 2, status: Status.Completed },
  ]
export const mockTodosResponse = {
    documents: mockTodos.map(todo => ({
        name: `projects/project-id/databases/(default)/documents/todos/${todo.id}`,
        fields: {
            name: { stringValue: todo.name },
            priority: { integerValue: todo.priority.toString() },
            status: { stringValue: todo.status }
        }
    }))
};
