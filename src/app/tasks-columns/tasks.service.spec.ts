import { TestBed } from '@angular/core/testing';
import { TasksService } from './tasks.service';
import { todo } from './todo.model';
import { of, throwError } from 'rxjs';

xdescribe('TasksService', () => {
    let service: TasksService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(TasksService);
        spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify({ localId: 'testUID' }));
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should filter pending todos', () => {
        service.tasks.set([
            { id: '1', name: 'Task 1', priority: 1, status: 'pending' },
            { id: '2', name: 'Task 2', priority: 2, status: 'completed' }
        ]);
        service.searchcritiriaa.set('');
        expect(service.pendingTodos().length).toBe(1);
        expect(service.pendingTodos()[0].name).toBe('Task 1');
    });

    it('should filter completed todos', () => {
        service.tasks.set([
            { id: '1', name: 'Task 1', priority: 1, status: 'pending' },
            { id: '2', name: 'Task 2', priority: 2, status: 'completed' }
        ]);
        service.searchcritiriaa.set('');
        expect(service.completedTodos().length).toBe(1);
        expect(service.completedTodos()[0].name).toBe('Task 2');
    });

    it('should sort pending todos by priority', () => {
        service.tasks.set([
            { id: '1', name: 'A', priority: 2, status: 'pending' },
            { id: '2', name: 'B', priority: 1, status: 'pending' }
        ]);
        service.pendingsorted.set(true);
        service.searchcritiriaa.set('');
        const sorted = service.pendingTodos();
        expect(sorted[0].priority).toBe(1);
        expect(sorted[1].priority).toBe(2);
    });

    it('should filter todos by search criteria', () => {
        service.tasks.set([
            { id: '1', name: 'Alpha', priority: 1, status: 'pending' },
            { id: '2', name: 'Beta', priority: 2, status: 'pending' }
        ]);
        service.searchcritiriaa.set('Alpha');
        expect(service.pendingTodos().length).toBe(1);
        expect(service.pendingTodos()[0].name).toBe('Alpha');
    });

    it('should filter todos using filter method', () => {
        service.tasks.set([
            { id: '1', name: 'Alpha', priority: 1, status: 'pending' },
            { id: '2', name: 'Beta', priority: 2, status: 'pending' }
        ]);
        const filtered = service.filter('Alpha');
        expect(filtered.length).toBe(1);
        expect(filtered[0].name).toBe('Alpha');
    });

    it('should call sortTodos', () => {
        spyOn(console, 'log');
        service.sortTodos();
        expect(console.log).toHaveBeenCalledWith('Sorting todos');
    });

    // Integration tests for HTTP methods (mocked)
    it('should handle addTodo error', (done) => {
        spyOn(window, 'alert');
        spyOn<any>(service, 'addTodo').and.returnValue(throwError(() => new Error('Failed')));
        service.addTodo({ name: 'Test', priority: 1, status: 'pending' }).subscribe({
            error: (err) => {
                expect(window.alert).toHaveBeenCalledWith('Error adding todo');
                done();
            }
        });
    });

    it('should handle getTodos error', (done) => {
        spyOn(window, 'alert');
        spyOn<any>(service, 'getTodos').and.returnValue(throwError(() => new Error('Failed')));
        service.getTodos().subscribe({
            next: () => {},
            error: () => {
                expect(window.alert).toHaveBeenCalledWith('Error fetching todos');
                done();
            }
        });
    });

    it('should handle updateTodoStatus error', (done) => {
        spyOn(window, 'alert');
        spyOn<any>(service, 'updateTodoStatus').and.returnValue(throwError(() => new Error('Failed')));
        service.updateTodoStatus('1', 'completed').subscribe({
            error: () => {
                expect(window.alert).toHaveBeenCalledWith('Error updating todo status');
                done();
            }
        });
    });

    it('should handle deleteTodo error', (done) => {
        spyOn(window, 'alert');
        spyOn<any>(service, 'deleteTodo').and.returnValue(throwError(() => new Error('Failed')));
        service.deleteTodo('1').subscribe({
            error: () => {
                expect(window.alert).toHaveBeenCalledWith('Error deleting todo');
                done();
            }
        });
    });
});