import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadRelationComponent } from './road-relation.component';

describe('RoadRelationComponent', () => {
  let component: RoadRelationComponent;
  let fixture: ComponentFixture<RoadRelationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoadRelationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoadRelationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
