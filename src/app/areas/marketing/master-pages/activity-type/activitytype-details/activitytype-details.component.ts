import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivityTypeModel } from '../../../contracts/model/contract-details.model';
import { MasterPageServiceService } from '../../service/master-page-service.service';
import { AppUrlService } from 'src/app/shared/services/app-url.service';
import { GLOBAL } from 'src/app/shared/global';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-activitytype-details',
  templateUrl: './activitytype-details.component.html',
  styleUrls: ['./activitytype-details.component.scss']
})
export class ActivitytypeDetailsComponent implements OnInit {
  @Input() activityTypeId: number;
  @Output() hideDetailPanel = new EventEmitter<any>();
  @Output() deleteActivity = new EventEmitter<any>();
  @Output() addActivity = new EventEmitter<any>();
  @Output() updateActivity = new EventEmitter<any>();
  activityDetailsForm;
  archiveButton = false;
  activityDetail: ActivityTypeModel = {};
  constructor(private activityService: MasterPageServiceService, private appurl: AppUrlService) { }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(): void {
    this.initForm();
    // this.GetCategory();
    if (this.activityTypeId !== 0 && this.activityTypeId !== undefined) {
      this.archiveButton = true;
      this.GetActivityId(this.activityTypeId);
    } else {
      this.archiveButton = false;
    }
  }

  initForm() {
    this.activityDetailsForm = new FormGroup({
      activityName: new FormControl('', [Validators.required])
    });
  }

  ResetFormOnAddNewActivity() {
    this.activityDetail = {};
    this.activityDetailsForm.reset();
  }

  ngOnInit() {
  }

  GetActivityId(id) {
    // tslint:disable-next-line:max-line-length
    this.activityService.GetActivityById(this.appurl.getApiUrl() + GLOBAL.API_Contract_GetActivityById, id).subscribe(result => {
      this.activityDetail = result.data.activityById;
      this.activityDetailsForm = new FormGroup({
        activityName: new FormControl(this.activityDetail.ActivityName, [Validators.required])
      });
    });
  }

  onChange(value) {
    this.activityDetail.ActivityName = value;
    if (this.activityTypeId === 0 || this.activityTypeId === undefined || this.activityTypeId === null) {
      this.CreateActivity();
    } else {
      this.EditActivity();
    }
  }

  CreateActivity() {
    // tslint:disable-next-line:max-line-length
    this.activityService.AddActivityType(this.appurl.getApiUrl() + GLOBAL.API_Contract_AddActivityType, this.activityDetail).subscribe(result => {
      this.activityDetail = result.data.activityById;
      this.addActivity.emit(this.activityDetail);
      this.archiveButton = true;
    });
  }

  EditActivity() {
    // tslint:disable-next-line:max-line-length
    this.activityService.AddActivityType(this.appurl.getApiUrl() + GLOBAL.API_Contract_AddActivityType, this.activityDetail).subscribe(result => {
      this.activityDetail = result.data.activityById;
      this.updateActivity.emit(this.activityDetail);
    });
  }

  //#region "emit"
  onHideDetailPanel() {
    this.hideDetailPanel.emit();
  }
  //#endregion

  DeleteActivity(id) {
    // tslint:disable-next-line:max-line-length
    this.activityService.DeleteActivityType(this.appurl.getApiUrl() + GLOBAL.API_Contract_DeleteActivityType, id).subscribe(result => {
      this.deleteActivity.emit({ id: id });
    });
  }
}
