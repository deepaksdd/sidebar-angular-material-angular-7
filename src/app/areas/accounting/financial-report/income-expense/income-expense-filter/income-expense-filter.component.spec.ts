import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeExpenseFilterComponent } from './income-expense-filter.component';

describe('IncomeExpenseFilterComponent', () => {
  let component: IncomeExpenseFilterComponent;
  let fixture: ComponentFixture<IncomeExpenseFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomeExpenseFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeExpenseFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
