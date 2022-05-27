import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfrastructureCategoryComponent } from './infrastructure-category.component';

describe('InfrastructureCategoryComponent', () => {
  let component: InfrastructureCategoryComponent;
  let fixture: ComponentFixture<InfrastructureCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfrastructureCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfrastructureCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
