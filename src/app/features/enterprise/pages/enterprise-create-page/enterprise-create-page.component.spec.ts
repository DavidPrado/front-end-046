import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterpriseCreatePageComponent } from './enterprise-create-page.component';

describe('EnterpriseCreatePageComponent', () => {
  let component: EnterpriseCreatePageComponent;
  let fixture: ComponentFixture<EnterpriseCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnterpriseCreatePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnterpriseCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
