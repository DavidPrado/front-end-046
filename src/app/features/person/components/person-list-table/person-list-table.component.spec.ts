import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonListTableComponent } from './person-list-table.component';

describe('PersonListTableComponent', () => {
  let component: PersonListTableComponent;
  let fixture: ComponentFixture<PersonListTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonListTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
