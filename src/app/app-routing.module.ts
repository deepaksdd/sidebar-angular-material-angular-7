import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DbstyleGuideComponent } from './components/dbstyle-guide/dbstyle-guide.component';

const routes: Routes = [
  { path: 'style-guide', component: DbstyleGuideComponent },
  { path: 'login', component: LoginComponent },
  { path: 'marketing', loadChildren: './areas/marketing/marketing.module#MarketingModule' },
  { path: 'project', loadChildren: './areas/project-management/project-management.module#ProjectManagementModule' },
  { path: 'accounting', loadChildren: './areas/accounting/accounting.module#AccountingModule' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
