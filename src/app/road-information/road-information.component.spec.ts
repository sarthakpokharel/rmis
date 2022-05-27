import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadInformationComponent } from './road-information.component';

describe('RoadInformationComponent', () => {
  let component: RoadInformationComponent;
  let fixture: ComponentFixture<RoadInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoadInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoadInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
