import { Component, OnInit } from '@angular/core';
import { UIModuleHeaders } from '../../../shared/enum';

@Component({
  selector: 'app-chart-of-accounts',
  templateUrl: './chart-of-accounts.component.html',
  styleUrls: ['./chart-of-accounts.component.scss']
})
export class ChartOfAccountsComponent implements OnInit {

  setSelectedHeader = UIModuleHeaders.ChartOfAccountHeader;
  setProjectHeader = 'Chart Of Account';

  constructor() { }

  ngOnInit() {
  }

}
