import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolFormFieldsComponent } from './school-form-fields.component';

describe('SchoolFormFieldsComponent', () => {
  let component: SchoolFormFieldsComponent;
  let fixture: ComponentFixture<SchoolFormFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolFormFieldsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SchoolFormFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
