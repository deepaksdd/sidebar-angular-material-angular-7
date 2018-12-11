import { Component, OnInit, ViewChild } from '@angular/core';
import { AppUrlService } from 'src/app/shared/services/app-url.service';
import { GLOBAL } from 'src/app/shared/global';
import { MasterPageServiceService } from '../service/master-page-service.service';
import { TimeCategoryModel } from '../model/mastrer-pages.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TimeCategoryDetailsComponent } from './time-category-details/time-category-details.component';

@Component({
  selector: 'app-time-category',
  templateUrl: './time-category.component.html',
  styleUrls: ['./time-category.component.scss']
})
export class TimeCategoryComponent implements OnInit {
  timCategoryName;
  timeCategoryId;
  showTimeCategoryDetail = false;
  colsm6 = 'col-sm-10 col-sm-offset-1';
  @ViewChild(TimeCategoryDetailsComponent) child: TimeCategoryDetailsComponent;
  constructor(private appurl: AppUrlService, private masterService: MasterPageServiceService) { }

  getTimeCategoryList: TimeCategoryModel[];
  model: TimeCategoryModel = {};

  ngOnInit() {
    this.init();
    this.getTimeCategory();
  }

  init() {
    // this.jobsList = [];
  }

  getTimeCategory() {
    this.getTimeCategoryList = [];
    this.masterService.GetTimeCategory(this.appurl.getApiUrl() + GLOBAL.API_Contract_GetTimeCategory).subscribe(data => {
      this.getTimeCategoryList = data.data.TimeCategories;
    });
  }

  onItemClick(id: number) {
    this.timeCategoryId = id;
    if (this.timeCategoryId === 0 || this.timeCategoryId === undefined || this.timeCategoryId === null) {
      this.child.ResetFormOnAddNewTimeCategory();
    }
    this.showProjectDetailPanel();
  }

  //#region "show/hide"
  showProjectDetailPanel() {
    this.showTimeCategoryDetail = true;
    this.colsm6 = this.showTimeCategoryDetail ? 'col-sm-6' : 'col-sm-10 col-sm-offset-1';
  }

  hideProjectDetailPanel() {
    this.showTimeCategoryDetail = false;
    this.colsm6 = this.showTimeCategoryDetail ? 'col-sm-6' : 'col-sm-10 col-sm-offset-1';
  }
  //#endregion

  //#region "Emit"
  hideDetailPanel(event) {
    this.hideProjectDetailPanel();
  }
  //#endregion

  onTimeCategoryDeleted(id) {
    const index = this.getTimeCategoryList.findIndex(r => r.TimeCategoryId === id.id);
    this.getTimeCategoryList.splice(index, 1);
    this.child.ResetFormOnAddNewTimeCategory();
    this.hideProjectDetailPanel();
  }

  addTimeCategoryList(e) {
    this.getTimeCategoryList.push(e);
  }

  updateTimeCategoryList(e) {
    const index = this.getTimeCategoryList.findIndex(r => r.TimeCategoryId === e.TimeCategoryId);
    if (index !== -1) {
      this.getTimeCategoryList[index] = e;
    }
  }


}
