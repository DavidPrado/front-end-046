import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternshipListTableComponent } from './internship-list-table.component';

describe('InternshipListTableComponent', () => {
  let component: InternshipListTableComponent;
  let fixture: ComponentFixture<InternshipListTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternshipListTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InternshipListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
