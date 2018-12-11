import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { GLOBAL } from 'src/app/shared/global';
import { MasterPageServiceService } from '../../service/master-page-service.service';
import { AppUrlService } from 'src/app/shared/services/app-url.service';
import { QualityModel } from '../../../contracts/model/contract-details.model';
import { Validators, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-quality-details',
  templateUrl: './quality-details.component.html',
  styleUrls: ['./quality-details.component.scss']
})
export class QualityDetailsComponent implements OnInit {
  @Input() qualityId: number;
  @Output() hideDetailPanel = new EventEmitter<any>();
  @Output() deleteQuality = new EventEmitter<any>();
  @Output() addQuality = new EventEmitter<any>();
  @Output() updateQuality = new EventEmitter<any>();
  qualityDetailsForm;
  archiveButton = false;
  qualityDetail: QualityModel = {};
  constructor(private qualityService: MasterPageServiceService, private appurl: AppUrlService) { }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(): void {
    this.initForm();
    // this.GetCategory();
    if (this.qualityId !== 0 && this.qualityId !== undefined) {
      this.archiveButton = true;
      this.GetQualityById(this.qualityId);
    } else {
      this.archiveButton = false;
    }
  }

  initForm() {
    this.qualityDetailsForm = new FormGroup({
      qualityName: new FormControl('', [Validators.required])
    });
  }

  ResetFormOnAddNewQuality() {
    this.qualityDetail = {};
    this.qualityDetailsForm.reset();
    this.qualityId = 0;
  }

  ngOnInit() {
  }

  GetQualityById(id) {
    // tslint:disable-next-line:max-line-length
    this.qualityService.GetQualityById(this.appurl.getApiUrl() + GLOBAL.API_Contract_GetQualityById, id).subscribe(result => {
      this.qualityDetail = result.data.qualityById;
      this.qualityDetailsForm = new FormGroup({
        qualityName: new FormControl(this.qualityDetail.QualityName, [Validators.required])
      });
    });
  }

  onChange(value) {
    this.qualityDetail.QualityName = value;
    if (this.qualityId === 0 || this.qualityId === undefined || this.qualityId === null) {
      this.CreateQuality();
    } else {
      this.EditQuality();
    }
  }

  CreateQuality() {
    // tslint:disable-next-line:max-line-length
    this.qualityService.AddQuality(this.appurl.getApiUrl() + GLOBAL.API_Contract_AddQuality, this.qualityDetail).subscribe(result => {
      this.qualityDetail = result.data.qualityById;
      this.qualityId = result.data.qualityById.QualityId;
      this.addQuality.emit(this.qualityDetail);
      this.archiveButton = true;
    });
  }

  EditQuality() {
    // tslint:disable-next-line:max-line-length
    this.qualityService.AddQuality(this.appurl.getApiUrl() + GLOBAL.API_Contract_AddQuality, this.qualityDetail).subscribe(result => {
      this.qualityDetail = result.data.qualityById;
      this.updateQuality.emit(this.qualityDetail);
    });
  }

  //#region "emit"
  onHideDetailPanel() {
    this.hideDetailPanel.emit();
  }
  //#endregion

  DeleteQuality(id) {
    // tslint:disable-next-line:max-line-length
    this.qualityService.DeleteQuality(this.appurl.getApiUrl() + GLOBAL.API_Contract_DeleteQuality, id).subscribe(result => {
      this.deleteQuality.emit({ id: id });
      this.qualityId = 0;
      this.qualityDetail = {};
    });
  }


}
