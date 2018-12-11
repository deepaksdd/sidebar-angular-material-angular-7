import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../shared/services/global-services.service';
import { UIModuleHeaders } from '../../shared/enum';

@Component({
  selector: 'app-marketing',
  templateUrl: './marketing.component.html',
  styleUrls: ['./marketing.component.scss']
})
export class MarketingComponent implements OnInit {

  setSelectedHeader = UIModuleHeaders.MarketingModule;
  setProjectHeader = 'Marketing';

  constructor() {
  }

  ngOnInit() {
  }

}
