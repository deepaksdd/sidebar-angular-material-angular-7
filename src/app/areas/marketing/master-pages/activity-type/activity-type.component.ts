import { Component, OnInit, ViewChild } from '@angular/core';
import { AppUrlService } from 'src/app/shared/services/app-url.service';
import { GLOBAL } from 'src/app/shared/global';
import {MasterPageServiceService} from '../service/master-page-service.service';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { stringify } from '@angular/core/src/render3/util';
import { variable } from '@angular/compiler/src/output/output_ast';
import { ActivityTypeModel } from '../model/mastrer-pages.model';
import { ActivitytypeDetailsComponent } from './activitytype-details/activitytype-details.component';

@Component({
  selector: 'app-activity-type',
  templateUrl: './activity-type.component.html',
  styleUrls: ['./activity-type.component.scss']
})
export class ActivityTypeComponent implements OnInit {
  activityType;
  activityTypeId;
  constructor( private appurl: AppUrlService, private masterService: MasterPageServiceService) { }
  showActivityDetail = false;
  activityTypeList: ActivityTypeModel[];
  model: ActivityTypeModel = {};
  colsm6 = 'col-sm-10 col-sm-offset-1';
  @ViewChild(ActivitytypeDetailsComponent) child: ActivitytypeDetailsComponent;

  ngOnInit() {
    this.init();
    this.getActivityType();
  }

  init() {
    // this.jobsList = [];
  }

  getActivityType() {
    this.activityTypeList = [];
    this.masterService.GetActivityTypes(this.appurl.getApiUrl() + GLOBAL.API_Contract_GetActivityType).subscribe(data => {
    this.activityTypeList =  data.data.ActivityTypes;
    });
  }

  onItemClick(id: number) {
    this.activityTypeId = id;
    if (this.activityTypeId === 0 || this.activityTypeId === undefined || this.activityTypeId === null) {
      this.child.ResetFormOnAddNewActivity();
    }
    this.showProjectDetailPanel();
  }

  //#region "show/hide"
  showProjectDetailPanel() {
    this.showActivityDetail = true;
    this.colsm6 = this.showActivityDetail ? 'col-sm-6' : 'col-sm-10 col-sm-offset-1';
  }

  hideProjectDetailPanel() {
    this.showActivityDetail = false;
    this.colsm6 = this.showActivityDetail ? 'col-sm-6' : 'col-sm-10 col-sm-offset-1';
  }
  //#endregion

  //#region "Emit"
  hideDetailPanel(event) {
    this.hideProjectDetailPanel();
  }
  //#endregion

  onActivityDeleted(id) {
    const index = this.activityTypeList.findIndex(r => r.ActivityTypeId === id.id);
    this.activityTypeList.splice(index, 1);
    this.child.ResetFormOnAddNewActivity();
    this.hideProjectDetailPanel();
  }

  addActivityList(e) {
    this.activityTypeList.push(e);
  }

  updateActivityList(e) {
    const index = this.activityTypeList.findIndex(r => r.ActivityTypeId === e.ActivityTypeId);
    if (index !== -1) {
      this.activityTypeList[index] = e;
    }
  }

}
