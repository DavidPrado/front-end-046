import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentFormFieldsComponent } from './student-form-fields.component';

describe('StudentFormFieldsComponent', () => {
  let component: StudentFormFieldsComponent;
  let fixture: ComponentFixture<StudentFormFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentFormFieldsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentFormFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
