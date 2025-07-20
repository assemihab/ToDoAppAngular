import { of } from "rxjs";
import { TasksService } from "../core/tasks.service";
import { HttpClient } from "@angular/common/http";
import { Injectable, Signal, WritableSignal, signal } from "@angular/core";
import { todo } from "../models/todo.model";
import { mockTodos } from "./mock-data";

@Injectable(
    { providedIn: 'root' }
)
export class PartialMockTasksService extends TasksService {
    constructor(http: HttpClient) {
    super(http);
  }
  override tasks = signal<todo[]>(mockTodos);
   isSorted= (objects: any[], key: string): boolean =>{
    for (let i = 0; i < objects.length - 1; i++) {
      if (
        objects[i].componentInstance.data()[key] >
        objects[i + 1].componentInstance.data()[key]
      ) {
        return false;
      }
    }
    return true;
  }
}