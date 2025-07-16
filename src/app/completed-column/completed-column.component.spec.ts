import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedColumnComponent } from './completed-column.component';

describe('CompletedColumnComponent', () => {
  let component: CompletedColumnComponent;
  let fixture: ComponentFixture<CompletedColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompletedColumnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompletedColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
