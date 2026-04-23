import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevelopingComponent } from './developing.component';

describe('DevelopingComponent', () => {
  let component: DevelopingComponent;
  let fixture: ComponentFixture<DevelopingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevelopingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DevelopingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
