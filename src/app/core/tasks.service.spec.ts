import { TestBed } from '@angular/core/testing';
import { TasksService } from './tasks.service';
// import { todo } from '../models/todo.model';
import { of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { mockTodos } from '../mock/mock-data';
import { PartialMockTasksService } from '../mock/partialMockTasksServce.service';

describe('TasksService', () => {
    let service: TasksService;
    let httpMock: HttpTestingController;
    let testingsort: PartialMockTasksService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [TasksService, PartialMockTasksService]
        });
        service = TestBed.inject(TasksService);
        httpMock = TestBed.inject(HttpTestingController);
        testingsort= TestBed.inject(PartialMockTasksService);
    });
    it('test if the pending todos are computed correctly', () => {
    const mockTodoss = mockTodos;
    service.tasks.set(mockTodoss);
    service.searchcritiriaa.set('');
    service.pendingsorted.set(false);
    const pendingTodos = service.pendingTodos();
    expect(pendingTodos.length).toBe(3);
    expect(pendingTodos[0].name).toBe('Mock Task 1');
    expect(pendingTodos[1].name).toBe('Mock Task 3');
    expect(pendingTodos[2].name).toBe('Mock Task 5');
    service.searchcritiriaa.set('Task 1');
    const filteredPendingTodos = service.pendingTodos();
    expect(filteredPendingTodos.length).toBe(1);
    expect(filteredPendingTodos[0].name).toBe('Mock Task 1');

    });
    it('test if the completed todos are computed correctly', () => {
        const mockTodoss = mockTodos;
        service.tasks.set(mockTodoss);
        service.searchcritiriaa.set('');
        service.completedsorted.set(false);
        const completedTodos = service.completedTodos();
        expect(completedTodos.length).toBe(3);
        expect(completedTodos[0].name).toBe('Mock Task 2');
        expect(completedTodos[1].name).toBe('Mock Task 4');
        expect(completedTodos[2].name).toBe('Mock Task 6');
        service.searchcritiriaa.set('Task 2');
        const filteredCompletedTodos = service.completedTodos();
        expect(filteredCompletedTodos.length).toBe(1);
        expect(filteredCompletedTodos[0].name).toBe('Mock Task 2');
    });




    
});