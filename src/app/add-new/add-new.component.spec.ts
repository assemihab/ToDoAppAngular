import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TasksService } from '../core/tasks.service';
import { AddNewComponent } from './add-new.component';
import { of } from 'rxjs';

describe('AddNewComponent', () => {
  let component: AddNewComponent;
  let fixture: ComponentFixture<AddNewComponent>;
  let taskService: jasmine.SpyObj<TasksService>;


  beforeEach(async () => {
    const Spy = jasmine.createSpyObj('TasksService', ['addTodo', 'tasks'], {
      tasks: {
        update: jasmine.createSpy('update'),
      }
    });
    await TestBed.configureTestingModule({
      imports: [AddNewComponent],
      providers: [{ provide: TasksService, useValue: Spy }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    taskService = TestBed.inject(TasksService) as jasmine.SpyObj<TasksService>;
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it("on submit should call addTask method of TasksService", () => {

    taskService.addTodo.and.returnValue(of({}));
    component.onSubmit();
    expect(taskService.addTodo).toHaveBeenCalled();

  })
  it("on submit does the component emit cancel event", () => {
    taskService.addTodo.and.returnValue(of({}));
    spyOn(component.cancel, 'emit');
    component.onSubmit();
    expect(component.cancel.emit).toHaveBeenCalled();
  });
  it("on cancel should emit cancel event", () => {
    spyOn(component.cancel, 'emit');
    component.onCancel();
    expect(component.cancel.emit).toHaveBeenCalled();
  });
  it("should have values different from default on submit", () => {
    
    taskService.addTodo.and.returnValue(of({}));
    const inputel=fixture.debugElement.nativeElement.querySelector('input[name="input-todo"]');
    const selectel=fixture.debugElement.nativeElement.querySelector('select[name="priority"]');
    inputel.value = 'Test Task';
    selectel.value = '3';
    inputel.dispatchEvent(new Event('input'));
    selectel.dispatchEvent(new Event('change'));
    component.onSubmit();
    expect(component.name).toBe('Test Task');
    expect(Number(component.priority)).toEqual(3);
    expect(component.status).toBe('pending');

  }
)

});
