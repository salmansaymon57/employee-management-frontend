import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeData } from './employee-data';

describe('EmployeeData', () => {
  let component: EmployeeData;
  let fixture: ComponentFixture<EmployeeData>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeData]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeData);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
