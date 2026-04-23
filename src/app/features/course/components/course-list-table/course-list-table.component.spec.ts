import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseListTableComponent } from './course-list-table.component';

describe('CourseListTableComponent', () => {
  let component: CourseListTableComponent;
  let fixture: ComponentFixture<CourseListTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseListTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
