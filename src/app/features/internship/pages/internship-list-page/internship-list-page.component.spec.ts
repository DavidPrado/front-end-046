import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternshipListPageComponent } from './internship-list-page.component';

describe('InternshipListPageComponent', () => {
  let component: InternshipListPageComponent;
  let fixture: ComponentFixture<InternshipListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternshipListPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InternshipListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
