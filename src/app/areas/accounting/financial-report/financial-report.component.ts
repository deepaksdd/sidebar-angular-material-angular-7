import { Component, OnInit } from '@angular/core';
import { UIModuleHeaders } from '../../../shared/enum';

@Component({
  selector: 'app-financial-report',
  templateUrl: './financial-report.component.html',
  styleUrls: ['./financial-report.component.scss']
})
export class FinancialReportComponent implements OnInit {

  setSelectedHeader = UIModuleHeaders.FinancialAccountHeader;
  setProjectHeader = 'Financial Report';

  constructor() { }

  ngOnInit() {
  }

}
