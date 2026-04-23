import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterpriseListPageComponent } from './enterprise-list-page.component';

describe('EnterpriseListPageComponent', () => {
  let component: EnterpriseListPageComponent;
  let fixture: ComponentFixture<EnterpriseListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnterpriseListPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnterpriseListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
