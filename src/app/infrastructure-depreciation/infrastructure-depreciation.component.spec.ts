import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfrastructureDepreciationComponent } from './infrastructure-depreciation.component';

describe('InfrastructureDepreciationComponent', () => {
  let component: InfrastructureDepreciationComponent;
  let fixture: ComponentFixture<InfrastructureDepreciationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfrastructureDepreciationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfrastructureDepreciationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
