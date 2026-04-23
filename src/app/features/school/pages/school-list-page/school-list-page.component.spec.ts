import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolListPageComponent } from './school-list-page.component';

describe('SchoolListPageComponent', () => {
  let component: SchoolListPageComponent;
  let fixture: ComponentFixture<SchoolListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolListPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SchoolListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
