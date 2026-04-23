import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternshipCreatePageComponent } from './internship-create-page.component';

describe('InternshipCreatePageComponent', () => {
  let component: InternshipCreatePageComponent;
  let fixture: ComponentFixture<InternshipCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternshipCreatePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InternshipCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
