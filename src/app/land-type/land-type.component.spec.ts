import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandTypeComponent } from './land-type.component';

describe('LandTypeComponent', () => {
  let component: LandTypeComponent;
  let fixture: ComponentFixture<LandTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
