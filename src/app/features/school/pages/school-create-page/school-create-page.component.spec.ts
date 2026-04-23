import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolCreatePageComponent } from './school-create-page.component';

describe('SchoolCreatePageComponent', () => {
  let component: SchoolCreatePageComponent;
  let fixture: ComponentFixture<SchoolCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolCreatePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SchoolCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
