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
  ]);
}