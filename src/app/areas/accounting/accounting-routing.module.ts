import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountingComponent } from './accounting.component';
import { ChartOfAccountsComponent } from './chart-of-accounts/chart-of-accounts.component';
import { FinancialReportComponent } from './financial-report/financial-report.component';
import { VouchersComponent } from './vouchers/vouchers.component';
import { AssetsComponent } from './chart-of-accounts/assets/assets.component';
import { LiabilitiesComponent } from './chart-of-accounts/liabilities/liabilities.component';
import { FundsComponent } from './chart-of-accounts/funds/funds.component';
import { IncomeComponent } from './chart-of-accounts/income/income.component';
import { ExpenseComponent } from './chart-of-accounts/expense/expense.component';
import { IncomeExpenseComponent } from './financial-report/income-expense/income-expense.component';
import { BalanceSheetComponent } from './financial-report/balance-sheet/balance-sheet.component';

const routes: Routes = [
    {
        path: '', component: AccountingComponent,
        children: [
            {
                path: 'chart-of-accounts', component: ChartOfAccountsComponent,
                children: [
                    { path: 'assets', component: AssetsComponent },
                    { path: 'liabilities', component: LiabilitiesComponent },
                    { path: 'funds', component: FundsComponent },
                    { path: 'income', component: IncomeComponent },
                    { path: 'expense', component: ExpenseComponent },
                    { path: '', redirectTo: 'assets', pathMatch: 'full' }
                ]
            },
            {
                path: 'financial-report', component: FinancialReportComponent,
                children: [
                    { path: 'balance-sheet', component: BalanceSheetComponent },
                    { path: 'income-expense-report', component: IncomeExpenseComponent },
                    { path: '', redirectTo: 'balance-sheet', pathMatch: 'full' }

                ]
            },
            {
                path: 'vouchers', component: VouchersComponent
            },
        ]
    },

];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]   // important to export
})
export class AccountingRoutingModule { }
