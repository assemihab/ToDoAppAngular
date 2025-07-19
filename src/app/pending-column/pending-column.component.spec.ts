import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingColumnComponent } from './pending-column.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PartialMockTasksService } from '../mock/partialMockTasksServce.service';
import { TasksService } from '../core/tasks.service';
import { By } from '@angular/platform-browser';
import { TaskComponent } from '../task/task.component';

describe('PendingColumnComponent', () => {
  let component: PendingColumnComponent;
  let fixture: ComponentFixture<PendingColumnComponent>;
  let taskService: PartialMockTasksService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingColumnComponent,HttpClientTestingModule
      ],
      providers: [{ provide: TasksService, useClass: PartialMockTasksService }]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PendingColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    taskService = TestBed.inject(TasksService) as PartialMockTasksService;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be unsorted on init but after the sort button is pressed it should be sorted', () => {
    let childComponents = fixture.debugElement.queryAll(
      By.directive(TaskComponent)
    );
    expect(taskService.isSorted(childComponents, 'priority')).toBe(false);
    const sortButton =
      fixture.debugElement.nativeElement.querySelector('.sort-submit');
    sortButton.click();
    fixture.detectChanges();

    childComponents = fixture.debugElement.queryAll(
      By.directive(TaskComponent)
    );
    expect(taskService.isSorted(childComponents, 'priority')).toBe(true);
  });
});
