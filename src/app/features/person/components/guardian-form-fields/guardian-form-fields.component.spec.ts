import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardianFormFieldsComponent } from './guardian-form-fields.component';

describe('GuardianFormFieldsComponent', () => {
  let component: GuardianFormFieldsComponent;
  let fixture: ComponentFixture<GuardianFormFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuardianFormFieldsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuardianFormFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
