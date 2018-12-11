import { Component, OnInit } from '@angular/core';
import { UIModuleHeaders } from '../../../shared/enum';

@Component({
  selector: 'app-vouchers',
  templateUrl: './vouchers.component.html',
  styleUrls: ['./vouchers.component.scss']
})
export class VouchersComponent implements OnInit {

  setSelectedHeader = UIModuleHeaders.VouchersHeader;
  setProjectHeader = 'Vouchers';

  constructor() { }

  ngOnInit() {
  }

}
