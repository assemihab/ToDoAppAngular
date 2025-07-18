import { of } from "rxjs";
import { TasksService } from "../core/tasks.service";
import { HttpClient } from "@angular/common/http";
import { Injectable, Signal, WritableSignal, signal } from "@angular/core";
import { todo, TaskStatus } from "../models/todo.model";

@Injectable(
    { providedIn: 'root' }
)
export class PartialMockTasksService extends TasksService {
    constructor(http: HttpClient) {
    super(http);
  }
  override tasks = signal<todo[]>([
    { id: '1', name: 'Mock Task 1', priority: 1, status: 'pending' },
    { id: '2', name: 'Mock Task 2', priority: 2, status: 'completed' },
    { id: '3', name: 'Mock Task 3', priority: 3, status: 'pending' },
    { id: '4', name: 'Mock Task 4', priority: 1, status: 'completed' },
    { id: '5', name: 'Mock Task 5', priority: 1, status: 'pending' },
    {id: '6', name: 'Mock Task 6', priority: 1, status: 'completed' },
  ]);
}