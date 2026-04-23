import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonFormFieldsComponent } from './person-form-fields.component';

describe('PersonFormFieldsComponent', () => {
  let component: PersonFormFieldsComponent;
  let fixture: ComponentFixture<PersonFormFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonFormFieldsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonFormFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
