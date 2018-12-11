import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { GLOBAL } from 'src/app/shared/global';
import { MasterPageServiceService } from '../../service/master-page-service.service';
import { AppUrlService } from 'src/app/shared/services/app-url.service';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { TimeCategoryModel } from '../../../contracts/model/contract-details.model';
@Component({
  selector: 'app-time-category-details',
  templateUrl: './time-category-details.component.html',
  styleUrls: ['./time-category-details.component.scss']
})
export class TimeCategoryDetailsComponent implements OnInit {
  @Input() timeCategoryId: number;
  @Output() hideDetailPanel = new EventEmitter<any>();
  @Output() deleteTimeCategory = new EventEmitter<any>();
  @Output() addTimeCategory = new EventEmitter<any>();
  @Output() updateTimeCategory = new EventEmitter<any>();
  timeCategoryDetailsForm;
  archiveButton = false;
  timeCategoryDetail: TimeCategoryModel = {};
  constructor(private timeCategoryService: MasterPageServiceService, private appurl: AppUrlService) { }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(): void {
    this.initForm();
    // this.GetCategory();
    if (this.timeCategoryId !== 0 && this.timeCategoryId !== undefined) {
      this.archiveButton = true;
      this.GetTimeCategoryById(this.timeCategoryId);
    } else {
      this.archiveButton = false;
    }
  }

  initForm() {
    this.timeCategoryDetailsForm = new FormGroup({
      timeCategoryName: new FormControl('', [Validators.required])
    });
  }

  ResetFormOnAddNewTimeCategory() {
    this.timeCategoryDetail = {};
    this.timeCategoryDetailsForm.reset();
    this.timeCategoryId = 0;
  }

  ngOnInit() {
  }

  GetTimeCategoryById(id) {
    // tslint:disable-next-line:max-line-length
    this.timeCategoryService.GetTimeCategoryById(this.appurl.getApiUrl() + GLOBAL.API_Contract_GetTimeCategoryById, id).subscribe(result => {
      this.timeCategoryDetail = result.data.timeCatergoryById;
      this.timeCategoryDetailsForm = new FormGroup({
        timeCategoryName: new FormControl(this.timeCategoryDetail.TimeCategoryName, [Validators.required])
      });
    });
  }

  onChange(value) {
    this.timeCategoryDetail.TimeCategoryName = value;
    if (this.timeCategoryId === 0 || this.timeCategoryId === undefined || this.timeCategoryId === null) {
      this.CreateTimeCategory();
    } else {
      this.EditTimeCategory();
    }
  }

  CreateTimeCategory() {
    // tslint:disable-next-line:max-line-length
    this.timeCategoryService.AddTimeCategory(this.appurl.getApiUrl() + GLOBAL.API_Contract_AddTimeCategory, this.timeCategoryDetail).subscribe(result => {
      this.timeCategoryDetail = result.data.timeCatergoryById;
      this.timeCategoryId = this.timeCategoryDetail.TimeCategoryId;
      this.addTimeCategory.emit(this.timeCategoryDetail);
      this.archiveButton = true;
    });
  }

  EditTimeCategory() {
    // tslint:disable-next-line:max-line-length
    this.timeCategoryService.AddTimeCategory(this.appurl.getApiUrl() + GLOBAL.API_Contract_AddTimeCategory, this.timeCategoryDetail).subscribe(result => {
      this.timeCategoryDetail = result.data.timeCatergoryById;
      this.updateTimeCategory.emit(this.timeCategoryDetail);
    });
  }

  //#region "emit"
  onHideDetailPanel() {
    this.hideDetailPanel.emit();
  }
  //#endregion

  DeleteTimeCategory(id) {
    // tslint:disable-next-line:max-line-length
    this.timeCategoryService.DeleteTimeCategory(this.appurl.getApiUrl() + GLOBAL.API_Contract_DeleteTimeCategory, id).subscribe(result => {
      this.deleteTimeCategory.emit({ id: id });
      this.timeCategoryDetail = {};
      this.timeCategoryId = 0;
    });
  }
}
