import { Component, OnInit, ViewChild } from '@angular/core';
import { AppUrlService } from 'src/app/shared/services/app-url.service';
import { GLOBAL } from 'src/app/shared/global';
import { MasterPageServiceService } from '../service/master-page-service.service';
import { MediumModel } from '../model/mastrer-pages.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MediumDetailsComponent } from './medium-details/medium-details.component';

@Component({
  selector: 'app-medium',
  templateUrl: './medium.component.html',
  styleUrls: ['./medium.component.scss']
})
export class MediumComponent implements OnInit {
  logedInForm; // These are variables
  mediumName;
  mediumId;
  colsm6 = 'col-sm-10 col-sm-offset-1';
  showMediumDetail = false;
  @ViewChild(MediumDetailsComponent) child: MediumDetailsComponent;
  constructor(private appurl: AppUrlService, private masterService: MasterPageServiceService) { }

  getMediumList: MediumModel[];
  model: MediumModel = {};

  ngOnInit() {
    this.init();
    this.getMedium();
  }

  init() {
    // this.jobsList = [];
  }

  getMedium() {
    this.getMediumList = [];
    this.masterService.GetMedium(this.appurl.getApiUrl() + GLOBAL.API_Contract_GetMedium).subscribe(data => {
      this.getMediumList = data.data.Mediums;
    });
  }

  onItemClick(id: number) {
    this.mediumId = id;
    if (this.mediumId === 0 || this.mediumId === undefined || this.mediumId === null) {
      this.child.ResetFormOnAddNewMedium();
    }
    this.showProjectDetailPanel();
  }

  //#region "show/hide"
  showProjectDetailPanel() {
    this.showMediumDetail = true;
    this.colsm6 = this.showMediumDetail ? 'col-sm-6' : 'col-sm-10 col-sm-offset-1';
  }

  hideProjectDetailPanel() {
    this.showMediumDetail = false;
    this.colsm6 = this.showMediumDetail ? 'col-sm-6' : 'col-sm-10 col-sm-offset-1';
  }
  //#endregion

  //#region "Emit"
  hideDetailPanel(event) {
    this.hideProjectDetailPanel();
  }
  //#endregion

  onMediumDeleted(id) {
    const index = this.getMediumList.findIndex(r => r.MediumId === id.id);
    this.getMediumList.splice(index, 1);
    this.child.ResetFormOnAddNewMedium();
    this.hideProjectDetailPanel();
  }

  addMediumList(e) {
    this.getMediumList.push(e);
  }

  updateMediumList(e) {
    const index = this.getMediumList.findIndex(r => r.MediumId === e.MediumId);
    if (index !== -1) {
      this.getMediumList[index] = e;
    }
  }


}
