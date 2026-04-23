import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionEnterpriseFormFieldsComponent } from './position-enterprise-form-fields.component';

describe('PositionEnterpriseFormFieldsComponent', () => {
  let component: PositionEnterpriseFormFieldsComponent;
  let fixture: ComponentFixture<PositionEnterpriseFormFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PositionEnterpriseFormFieldsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PositionEnterpriseFormFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
