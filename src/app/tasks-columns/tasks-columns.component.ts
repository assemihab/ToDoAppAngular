import { Component } from '@angular/core';
import { PendingColumnComponent } from '../pending-column/pending-column.component';
import { CompletedColumnComponent } from '../completed-column/completed-column.component';
import { AddNewComponent } from '../add-new/add-new.component';

@Component({
  selector: 'app-tasks-columns',
  standalone: true,
  imports: [PendingColumnComponent, AddNewComponent, CompletedColumnComponent],
  templateUrl: './tasks-columns.component.html',
  styleUrl: './tasks-columns.component.css',
})
export class TasksColumnsComponent {
  isAddingTasks: boolean = false;

  onAddNew() {
    this.isAddingTasks = true;
  }
  onCancelNew() {
    this.isAddingTasks = false;
  }
}
