import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterpriseFormFieldsComponent } from './enterprise-form-fields.component';

describe('EnterpriseFormFieldsComponent', () => {
  let component: EnterpriseFormFieldsComponent;
  let fixture: ComponentFixture<EnterpriseFormFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnterpriseFormFieldsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnterpriseFormFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
