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
    { id: '1', name: 'Mock Task 1', priority: 1, status: 'pending' },
    { id: '2', name: 'Mock Task 2', priority: 2, status: 'completed' },
    { id: '3', name: 'Mock Task 3', priority: 3, status: 'pending' },
    { id: '4', name: 'Mock Task 4', priority: 1, status: 'completed' },
    { id: '5', name: 'Mock Task 5', priority: 1, status: 'pending' },
    {id: '6', name: 'Mock Task 6', priority: 2, status: 'completed' },
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
