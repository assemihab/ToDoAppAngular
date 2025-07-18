import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedColumnComponent } from './completed-column.component';
import { PartialMockTasksService } from '../mock/partialMockTasksServce.service';
import { TasksService } from '../core/tasks.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Task } from 'zone.js/lib/zone-impl';
import { TaskComponent } from '../task/task.component';
import { By } from '@angular/platform-browser';

function isSorted(objects: any[], key: string): boolean {
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
describe('CompletedColumnComponent', () => {
  let component: CompletedColumnComponent;
  let fixture: ComponentFixture<CompletedColumnComponent>;
  let taskService: PartialMockTasksService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompletedColumnComponent, HttpClientTestingModule],
      providers: [{ provide: TasksService, useClass: PartialMockTasksService }],
    }).compileComponents();

    fixture = TestBed.createComponent(CompletedColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    taskService = TestBed.inject(TasksService) as PartialMockTasksService;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have completedTodos from taskService', () => {
    expect(component.completedTodos()).toEqual(taskService.completedTodos());
  });
  it('should toggle sorted state on sortTodos', () => {
    const initialSortedState = component.sorted();
    component.sortTodos();
    expect(component.sorted()).toBe(!initialSortedState);
  });
  it('should toggle the sortstate when sortbutton pressed', () => {
    const initialSortedState = component.sorted();
    const sortButton =
      fixture.debugElement.nativeElement.querySelector('.sort-submit');
    sortButton.click();
    expect(component.sorted()).toBe(!initialSortedState);
  });
  it('the child should be unsorted on init but after the sort button is pressed it should be sorted', () => {
    let childComponents = fixture.debugElement.queryAll(
      By.directive(TaskComponent)
    );
    expect(isSorted(childComponents, 'priority')).toBe(false);
    const sortButton =
      fixture.debugElement.nativeElement.querySelector('.sort-submit');
    sortButton.click();
    fixture.detectChanges();

    childComponents = fixture.debugElement.queryAll(
      By.directive(TaskComponent)
    );
    expect(isSorted(childComponents, 'priority')).toBe(true);
  });
});
