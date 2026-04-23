import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionEnterpriseListPageComponent } from './position-enterprise-list-page.component';

describe('PositionEnterpriseListPageComponent', () => {
  let component: PositionEnterpriseListPageComponent;
  let fixture: ComponentFixture<PositionEnterpriseListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PositionEnterpriseListPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PositionEnterpriseListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
