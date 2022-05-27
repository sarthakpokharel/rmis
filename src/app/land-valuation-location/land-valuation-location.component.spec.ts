import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandValuationLocationComponent } from './land-valuation-location.component';

describe('LandValuationLocationComponent', () => {
  let component: LandValuationLocationComponent;
  let fixture: ComponentFixture<LandValuationLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandValuationLocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandValuationLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
