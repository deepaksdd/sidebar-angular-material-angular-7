import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MediumModel } from '../../../contracts/model/contract-details.model';
import { MasterPageServiceService } from '../../service/master-page-service.service';
import { AppUrlService } from 'src/app/shared/services/app-url.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { GLOBAL } from 'src/app/shared/global';

@Component({
  selector: 'app-medium-details',
  templateUrl: './medium-details.component.html',
  styleUrls: ['./medium-details.component.scss']
})
export class MediumDetailsComponent implements OnInit {
  @Input() mediumId: number;
  @Output() hideDetailPanel = new EventEmitter<any>();
  @Output() deleteMedium = new EventEmitter<any>();
  @Output() addMedium = new EventEmitter<any>();
  @Output() updateMedium = new EventEmitter<any>();
  mediumDetailsForm;
  archiveButton = false;
  mediumDetail: MediumModel = {};
  constructor(private mediumService: MasterPageServiceService, private appurl: AppUrlService) { }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(): void {
    this.initForm();
    // this.GetCategory();
    if (this.mediumId !== 0 && this.mediumId !== undefined) {
      this.archiveButton = true;
      this.GetMediumById(this.mediumId);
    } else {
      this.archiveButton = false;
    }
  }

  initForm() {
    this.mediumDetailsForm = new FormGroup({
      mediumName: new FormControl('', [Validators.required])
    });
  }

  ResetFormOnAddNewMedium() {
    this.mediumDetail = {};
    this.mediumDetailsForm.reset();
    this.mediumId = 0;
  }

  ngOnInit() {
  }

  GetMediumById(id) {
    // tslint:disable-next-line:max-line-length
    this.mediumService.GetMediumById(this.appurl.getApiUrl() + GLOBAL.API_Contract_GetMediumById, id).subscribe(result => {
      this.mediumDetail = result.data.mediumById;
      this.mediumDetailsForm = new FormGroup({
        mediumName: new FormControl(this.mediumDetail.MediumName, [Validators.required])
      });
    });
  }

  onChange(value) {
    this.mediumDetail.MediumName = value;
    if (this.mediumId === 0 || this.mediumId === undefined || this.mediumId === null) {
      this.CreateMedium();
    } else {
      this.EditMedium();
    }
  }

  CreateMedium() {
    // tslint:disable-next-line:max-line-length
    this.mediumService.AddMedium(this.appurl.getApiUrl() + GLOBAL.API_Contract_AddMedium, this.mediumDetail).subscribe(result => {
      this.mediumDetail = result.data.mediumById;
      this.mediumId  = result.data.mediumById.MediumId;
      this.addMedium.emit(this.mediumDetail);
      this.archiveButton = true;
    });
  }

  EditMedium() {
    // tslint:disable-next-line:max-line-length
    this.mediumService.AddMedium(this.appurl.getApiUrl() + GLOBAL.API_Contract_AddMedium, this.mediumDetail).subscribe(result => {
      this.mediumDetail = result.data.mediumById;
      this.updateMedium.emit(this.mediumDetail);
    });
  }

  //#region "emit"
  onHideDetailPanel() {
    this.hideDetailPanel.emit();
  }
  //#endregion

  DeleteMedium(id) {
    // tslint:disable-next-line:max-line-length
    this.mediumService.DeleteMedium(this.appurl.getApiUrl() + GLOBAL.API_Contract_DeleteMedium, id).subscribe(result => {
      this.deleteMedium.emit({ id: id });
      this.mediumDetail = {};
      this.mediumId  = 0;
    });
  }

}
