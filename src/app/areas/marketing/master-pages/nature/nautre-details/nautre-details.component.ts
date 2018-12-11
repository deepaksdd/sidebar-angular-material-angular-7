import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { NatureModel } from '../../../contracts/model/contract-details.model';
import { MasterPageServiceService } from '../../service/master-page-service.service';
import { AppUrlService } from 'src/app/shared/services/app-url.service';
import { GLOBAL } from 'src/app/shared/global';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-nautre-details',
  templateUrl: './nautre-details.component.html',
  styleUrls: ['./nautre-details.component.scss']
})
export class NautreDetailsComponent implements OnInit {
  @Input() natureId: number;
  @Output() hideDetailPanel = new EventEmitter<any>();
  @Output() deleteNature = new EventEmitter<any>();
  @Output() addNature = new EventEmitter<any>();
  @Output() updateNature = new EventEmitter<any>();
  natureDetailsForm;
  archiveButton = false;
  natureDetail: NatureModel = {};
  constructor(private natureService: MasterPageServiceService, private appurl: AppUrlService) { }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(): void {
    this.initForm();
    // this.GetCategory();
    if (this.natureId !== 0 && this.natureId !== undefined) {
      this.archiveButton = true;
      this.GetNatureById(this.natureId);
    } else {
      this.archiveButton = false;
    }
  }

  initForm() {
    this.natureDetailsForm = new FormGroup({
      natureName: new FormControl('', [Validators.required])
    });
  }

  ResetFormOnAddNewNature() {
    this.natureDetail = {};
    this.natureDetailsForm.reset();
    this.natureId = 0;
  }

  ngOnInit() {
  }

  GetNatureById(id) {
    // tslint:disable-next-line:max-line-length
    this.natureService.GetNatureById(this.appurl.getApiUrl() + GLOBAL.API_Contract_GetNatureById, id).subscribe(result => {
      this.natureDetail = result.data.natureById;
      this.natureDetailsForm = new FormGroup({
        natureName: new FormControl(this.natureDetail.NatureName, [Validators.required])
      });
    });
  }

  onChange(value) {
    this.natureDetail.NatureName = value;
    if (this.natureId === 0 || this.natureId === undefined || this.natureId === null) {
      this.CreateNature();
    } else {
      this.EditNature();
    }
  }

  CreateNature() {
    // tslint:disable-next-line:max-line-length
    this.natureService.AddMedium(this.appurl.getApiUrl() + GLOBAL.API_Contract_AddNature, this.natureDetail).subscribe(result => {
      this.natureDetail = result.data.natureById;
      this.natureId = result.data.natureById.NatureId;
      this.addNature.emit(this.natureDetail);
      this.archiveButton = true;
    });
  }

  EditNature() {
    // tslint:disable-next-line:max-line-length
    this.natureService.AddNature(this.appurl.getApiUrl() + GLOBAL.API_Contract_AddNature, this.natureDetail).subscribe(result => {
      this.natureDetail = result.data.natureById;
      this.updateNature.emit(this.natureDetail);
    });
  }

  //#region "emit"
  onHideDetailPanel() {
    this.hideDetailPanel.emit();
  }
  //#endregion

  DeleteNature(id) {
    // tslint:disable-next-line:max-line-length
    this.natureService.DeleteNature(this.appurl.getApiUrl() + GLOBAL.API_Contract_DeleteNature, id).subscribe(result => {
      this.deleteNature.emit({ id: id });
      this.natureDetail  = {};
      this.natureId = 0;
    });
  }

}
