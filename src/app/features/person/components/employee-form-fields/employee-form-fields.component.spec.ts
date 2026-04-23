import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeFormFieldsComponent } from './employee-form-fields.component';

describe('EmployeeFormFieldsComponent', () => {
  let component: EmployeeFormFieldsComponent;
  let fixture: ComponentFixture<EmployeeFormFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeFormFieldsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeFormFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
