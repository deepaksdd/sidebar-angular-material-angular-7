import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountingComponent } from './accounting.component';
import { ChartOfAccountsComponent } from './chart-of-accounts/chart-of-accounts.component';
import { FinancialReportComponent } from './financial-report/financial-report.component';
import { VouchersComponent } from './vouchers/vouchers.component';
import { AccountingRoutingModule } from './accounting-routing.module';
import { AssetsComponent } from './chart-of-accounts/assets/assets.component';
import { LiabilitiesComponent } from './chart-of-accounts/liabilities/liabilities.component';
import { FundsComponent } from './chart-of-accounts/funds/funds.component';
import { IncomeComponent } from './chart-of-accounts/income/income.component';
import { ExpenseComponent } from './chart-of-accounts/expense/expense.component';
import { BalanceSheetComponent } from './financial-report/balance-sheet/balance-sheet.component';
import { IncomeExpenseComponent } from './financial-report/income-expense/income-expense.component';
import { VoucherDetailComponent } from './vouchers/voucher-detail/voucher-detail/voucher-detail.component';
import { BalanceSheetFilterComponent } from './financial-report/balance-sheet/balance-sheet-filter/balance-sheet-filter.component';
import { IncomeExpenseFilterComponent } from './financial-report/income-expense/income-expense-filter/income-expense-filter.component';
import { ModuleExportModule } from '../../shared/module-export/module-export.module';


@NgModule({
  imports: [
    CommonModule,
    AccountingRoutingModule, // Routing
    ModuleExportModule
    // EffectsModule.forRoot([ TrialNgrxEffects ])
  ],
  declarations: [
    AccountingComponent,
    ChartOfAccountsComponent,
    FinancialReportComponent,
    VouchersComponent,
    AssetsComponent,
    LiabilitiesComponent,
    FundsComponent,
    IncomeComponent,
    ExpenseComponent,
    BalanceSheetComponent,
    IncomeExpenseComponent,
    VoucherDetailComponent,
    BalanceSheetFilterComponent,
    IncomeExpenseFilterComponent
  ]
})
export class AccountingModule { }
