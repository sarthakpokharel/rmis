import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfrastructureTypeComponent } from './infrastructure-type.component';

describe('InfrastructureTypeComponent', () => {
  let component: InfrastructureTypeComponent;
  let fixture: ComponentFixture<InfrastructureTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfrastructureTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfrastructureTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
