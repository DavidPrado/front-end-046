import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionEnterpriseListTableComponent } from './position-enterprise-list-table.component';

describe('PositionEnterpriseListTableComponent', () => {
  let component: PositionEnterpriseListTableComponent;
  let fixture: ComponentFixture<PositionEnterpriseListTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PositionEnterpriseListTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PositionEnterpriseListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
