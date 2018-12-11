import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UIModuleHeaders } from '../../shared/enum';

@Component({
  selector: 'app-db-header',
  templateUrl: './db-header.component.html',
  styleUrls: ['./db-header.component.scss']
})
export class DbHeaderComponent implements OnInit {
  @Input() selectedHeader: number;
  @Input() headerName: string;

  // using in HTML
  // accountingModule = UIModuleHeaders.AccountingModule;
  projectModule = UIModuleHeaders.ProjectModule;
  marketingModule = UIModuleHeaders.MarketingModule;
  projectModuleDetail = UIModuleHeaders.ProjectModuleDetail;
  chartOfAccountHeader = UIModuleHeaders.ChartOfAccountHeader;
  financialAccountHeader = UIModuleHeaders.FinancialAccountHeader;
  vouchersHeader = UIModuleHeaders.VouchersHeader;

  constructor(private router: Router, private location: Location) {}

  ngOnInit() {}

  onHeaderClicked(headerId, url: string) {
    if (this.projectModule === headerId) {
      this.router.navigate([url]);
    } else if (this.marketingModule === headerId) {
      this.router.navigate(['/marketing/' + url]);
    } else if (this.projectModuleDetail === headerId) {
      this.router.navigate(['/accounting/chart-of-accounts/' + url]);
    } else if (this.chartOfAccountHeader === headerId) {
      this.router.navigate(['/accounting/chart-of-accounts/' + url]);
    } else if (this.financialAccountHeader === headerId) {
      this.router.navigate(['/accounting/financial-report/' + url]);
    }
  }

  backToProject() {
    this.location.back();
  }
}
