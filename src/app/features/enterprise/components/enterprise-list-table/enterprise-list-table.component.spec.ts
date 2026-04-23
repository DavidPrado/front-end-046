import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterpriseListTableComponent } from './enterprise-list-table.component';

describe('EnterpriseListTableComponent', () => {
  let component: EnterpriseListTableComponent;
  let fixture: ComponentFixture<EnterpriseListTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnterpriseListTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnterpriseListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
