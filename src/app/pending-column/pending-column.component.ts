import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pending-column',
  standalone: true,
  imports: [],
  templateUrl: './pending-column.component.html',
  styleUrl: './pending-column.component.css',
})
export class PendingColumnComponent {
  addNewTodo() {
    // Logic to add a new todo item
    console.log('Add new todo clicked');
  }
}
