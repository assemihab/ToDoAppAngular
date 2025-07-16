import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingColumnComponent } from './pending-column.component';

describe('PendingColumnComponent', () => {
  let component: PendingColumnComponent;
  let fixture: ComponentFixture<PendingColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingColumnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PendingColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
