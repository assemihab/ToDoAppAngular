import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksColumnsComponent } from './tasks-columns.component';

describe('TasksColumnsComponent', () => {
  let component: TasksColumnsComponent;
  let fixture: ComponentFixture<TasksColumnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksColumnsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TasksColumnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
