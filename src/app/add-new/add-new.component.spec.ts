import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TasksService } from '../core/tasks.service';
import { AddNewComponent } from './add-new.component';
import { of } from 'rxjs';

describe('AddNewComponent', () => {
  let component: AddNewComponent;
  let fixture: ComponentFixture<AddNewComponent>;
  let taskService: jasmine.SpyObj<TasksService>;


  beforeEach(async () => {
    const Spy = jasmine.createSpyObj('TasksService', ['addTodo','tasks'],{
  tasks: {
    update: jasmine.createSpy('update'),
  }}
);
    await TestBed.configureTestingModule({
      imports: [AddNewComponent],
      providers: [{provide:TasksService,useValue:Spy}]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    taskService = TestBed.inject(TasksService)  as jasmine.SpyObj<TasksService>;
  });
  

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it("on submit should call addTask method of TasksService", () => {

    taskService.addTodo.and.returnValue(of({}));
    component.onSubmit();
    expect(taskService.addTodo).toHaveBeenCalled();
  
  }) 
});
