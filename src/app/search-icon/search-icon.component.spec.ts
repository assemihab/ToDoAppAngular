import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchIconComponent } from './search-icon.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SearchIconComponent', () => {
  let component: SearchIconComponent;
  let fixture: ComponentFixture<SearchIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchIconComponent,HttpClientTestingModule],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
