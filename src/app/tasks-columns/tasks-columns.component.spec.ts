import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksColumnsComponent } from './tasks-columns.component';
import { TasksService } from '../core/tasks.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { mockTodos, mockTodosResponse } from '../mock/mock-data';

describe('TasksColumnsComponent', () => {
  let component: TasksColumnsComponent;
  let fixture: ComponentFixture<TasksColumnsComponent>;
  let service:TasksService;
  let httpMock:HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksColumnsComponent,HttpClientTestingModule],
      providers:[TasksService]
    }).compileComponents();
    
    
    localStorage.setItem('authData', JSON.stringify({ localId: 'testUID' })); 
    fixture = TestBed.createComponent(TasksColumnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpMock=TestBed.inject(HttpTestingController)
    service=TestBed.inject(TasksService)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('check if the tasks signal are set correctly', () => {

    const mockResponse = mockTodosResponse;

    const UID = JSON.parse(localStorage.getItem('authData')!).localId;
    const URL = `https://firestore.googleapis.com/v1beta1/projects/todo-2a989/databases/(default)/documents/users/${UID}/todos`
    const req = httpMock.expectOne(URL)
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
    expect(component.taskService.tasks().length).toBe(6);
    });
    it('add-new should appear when isAddingTasks is true', () => {
      let addNewElement = fixture.debugElement.nativeElement.querySelector('app-add-new');
      expect(addNewElement).toBeFalsy();
      component.isAddingTasks = true;
      fixture.detectChanges();
      addNewElement = fixture.debugElement.nativeElement.querySelector('app-add-new');
      expect(addNewElement).toBeTruthy();
    });

});
