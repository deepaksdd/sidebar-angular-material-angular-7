import { Component, OnInit, ViewChild } from '@angular/core';
import { AppUrlService } from 'src/app/shared/services/app-url.service';
import { GLOBAL } from 'src/app/shared/global';
import { MasterPageServiceService } from '../service/master-page-service.service';
import { MediumModel } from '../model/mastrer-pages.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { QualityModel } from '../../contracts/model/contract-details.model';
import { QualityDetailsComponent } from './quality-details/quality-details.component';
@Component({
  selector: 'app-quality',
  templateUrl: './quality.component.html',
  styleUrls: ['./quality.component.scss']
})
export class QualityComponent implements OnInit {
  logedInForm; // These are variables
  qualityName;
  display = 'none';
  qualityId;
  showQualityDetail;
  colsm6 = 'col-sm-10 col-sm-offset-1';
  @ViewChild(QualityDetailsComponent) child: QualityDetailsComponent;
  constructor(private appurl: AppUrlService, private masterService: MasterPageServiceService) { }
  getQualityList: QualityModel[];
  model: QualityModel = {};
  ngOnInit() {
    this.init();
    this.getQuality();
    this.logedInForm = new FormGroup({
      qualityId: new FormControl(),
      qualityName: new FormControl('', [
        //  Validators.minLength(8),
        Validators.required])
    });
  }

  init() {
    // this.jobsList = [];
  }

  getQuality() {
    this.getQualityList = [];
    this.masterService.GetQuality(this.appurl.getApiUrl() + GLOBAL.API_Contract_GetQualityList).subscribe(data => {
      this.getQualityList = data.data.Qualities;
    });
  }

  onItemClick(id: number) {
    this.qualityId = id;
    if (this.qualityId === 0 || this.qualityId === undefined || this.qualityId === null) {
      this.child.ResetFormOnAddNewQuality();
    }
    this.showProjectDetailPanel();
  }

  //#region "show/hide"
  showProjectDetailPanel() {
    this.showQualityDetail = true;
    this.colsm6 = this.showQualityDetail ? 'col-sm-6' : 'col-sm-10 col-sm-offset-1';
  }

  hideProjectDetailPanel() {
    this.showQualityDetail = false;
    this.colsm6 = this.showQualityDetail ? 'col-sm-6' : 'col-sm-10 col-sm-offset-1';
  }
  //#endregion

  //#region "Emit"
  hideDetailPanel(event) {
    this.hideProjectDetailPanel();
  }
  //#endregion

  onQualityDeleted(id) {
    const index = this.getQualityList.findIndex(r => r.QualityId === id.id);
    this.getQualityList.splice(index, 1);
    this.child.ResetFormOnAddNewQuality();
    this.hideProjectDetailPanel();
  }

  addQualityList(e) {
    this.getQualityList.push(e);
  }

  updateQualityList(e) {
    const index = this.getQualityList.findIndex(r => r.QualityId === e.QualityId);
    if (index !== -1) {
      this.getQualityList[index] = e;
    }
  }



}
