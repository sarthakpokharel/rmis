import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandValuationSectorComponent } from './land-valuation-sector.component';

describe('LandValuationSectorComponent', () => {
  let component: LandValuationSectorComponent;
  let fixture: ComponentFixture<LandValuationSectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandValuationSectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandValuationSectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
