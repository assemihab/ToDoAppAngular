import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskComponent } from './task.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { todo } from '../models/todo.model';
import { mockTodos } from '../mock/mock-data';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  const mockTodo:todo= mockTodos[0];
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskComponent,HttpClientTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskComponent);
    fixture.componentRef.setInput('data', mockTodo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
