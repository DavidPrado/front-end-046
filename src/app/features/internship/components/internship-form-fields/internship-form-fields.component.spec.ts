import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternshipFormFieldsComponent } from './internship-form-fields.component';

describe('InternshipFormFieldsComponent', () => {
  let component: InternshipFormFieldsComponent;
  let fixture: ComponentFixture<InternshipFormFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternshipFormFieldsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InternshipFormFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
