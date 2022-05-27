import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandReceivedTypeComponent } from './land-received-type.component';

describe('LandReceivedTypeComponent', () => {
  let component: LandReceivedTypeComponent;
  let fixture: ComponentFixture<LandReceivedTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandReceivedTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandReceivedTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
