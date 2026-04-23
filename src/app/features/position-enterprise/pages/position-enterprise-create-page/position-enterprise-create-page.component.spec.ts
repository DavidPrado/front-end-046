import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionEnterpriseCreatePageComponent } from './position-enterprise-create-page.component';

describe('PositionEnterpriseCreatePageComponent', () => {
  let component: PositionEnterpriseCreatePageComponent;
  let fixture: ComponentFixture<PositionEnterpriseCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PositionEnterpriseCreatePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PositionEnterpriseCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
