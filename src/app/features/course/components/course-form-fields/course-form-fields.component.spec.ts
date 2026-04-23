import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseFormFieldsComponent } from './course-form-fields.component';

describe('CourseFormFieldsComponent', () => {
  let component: CourseFormFieldsComponent;
  let fixture: ComponentFixture<CourseFormFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseFormFieldsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseFormFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
