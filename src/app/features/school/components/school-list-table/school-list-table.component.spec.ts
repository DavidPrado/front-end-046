import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolListTableComponent } from './school-list-table.component';

describe('SchoolListTableComponent', () => {
  let component: SchoolListTableComponent;
  let fixture: ComponentFixture<SchoolListTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolListTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SchoolListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
