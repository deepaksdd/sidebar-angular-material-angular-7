import { Component, OnInit, ViewChild } from '@angular/core';
import { GLOBAL } from 'src/app/shared/global';
import { AppUrlService } from 'src/app/shared/services/app-url.service';
import { ContractsService } from '../../../contracts/service/contracts.service';
import { Router, ChildActivationEnd } from '@angular/router';
import { MasterPageServiceService } from '../../service/master-page-service.service';
import { UnitRateModel } from '../../model/mastrer-pages.model';
import { UnitRateComponent } from '../../unit-rate/unit-rate.component';

@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.scss']
})

export class MatrixComponent implements OnInit {
  @ViewChild(UnitRateComponent) child: UnitRateComponent;
  unitRatesList: UnitRateModel[];
 // unitRate:UnitRateModel
  showUnitRateDetail = false;
  colsm6 = 'col-sm-10 col-sm-offset-1';
  routeId = 0;
  type: any = '';
  unitRateId = 0;
  // tslint:disable-next-line:max-line-length
  constructor(private contractService: ContractsService,
    private appurl: AppUrlService, private router: Router,
    private masterPageService: MasterPageServiceService
  ) { }

  ngOnInit() {
    this.getUnitRate();
  }

  getUnitRate() {
    this.masterPageService.GetUnitRate(this.appurl.getApiUrl() + GLOBAL.API_Contract_GetUnitRateList).subscribe(data => {
      this.unitRatesList = data.data.UnitRateDetails;
    });
  }

  onItemClick(id: number) {
    this.routeId = id;
    if (this.routeId === null || this.routeId === undefined || this.routeId === 0) {
      this.child.AdditionOfUnitRate();
      this.child.SetDefaultValues();
    }
    this.showUnitRateDetailPanel();
  }

  //#region "show/hide"
  showUnitRateDetailPanel() {
    this.showUnitRateDetail = true;
    this.colsm6 = this.showUnitRateDetail ? 'col-sm-6' : 'col-sm-10 col-sm-offset-1';
  }

  hideUnitRateDetailPanel() {
    this.showUnitRateDetail = false;
    this.colsm6 = this.showUnitRateDetail ? 'col-sm-6' : 'col-sm-10 col-sm-offset-1';
  }
  //#endregion

  //#region "Emit"
  hideDetailPanel(e) {
    this.hideUnitRateDetailPanel();
  }
  //#endregion

  onUnitRateDeleted(id) {
    const index = this.unitRatesList.findIndex(r => r.UnitRateId === id.id);
    this.unitRatesList.splice(index, 1);
    this.hideUnitRateDetailPanel();
  }

  addUnitRateListById(e) {
    this.unitRatesList.push(e);
  }

  updateUnitRateList(e) {
    const index = this.unitRatesList.findIndex(r => r.UnitRateId === e.UnitRateId);
    if (index !== -1) {
      this.unitRatesList[index] = e;
    }
  }
}
