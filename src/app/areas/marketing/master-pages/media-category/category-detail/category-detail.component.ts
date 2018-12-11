import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MasterPageServiceService } from '../../service/master-page-service.service';
import { GLOBAL } from 'src/app/shared/global';
import { AppUrlService } from 'src/app/shared/services/app-url.service';
import { MediaCategoryModel } from '../../model/mastrer-pages.model';
@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent implements OnInit {
  @Input() mediaCategoryId: number;
  @Output() hideDetailPanel = new EventEmitter<any>();
  @Output() deleteMediaCategory = new EventEmitter<any>();
  @Output() addMediaCategory = new EventEmitter<any>();
  @Output() updateMediaCategory = new EventEmitter<any>();
  mediaCategoryDetailsForm;
  archiveButton = false;
  mediaCategoryDetail: MediaCategoryModel = {};
  constructor(private mediaCategoryService: MasterPageServiceService, private appurl: AppUrlService) { }

  ngOnInit() {
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(): void {
    this.initForm();
    // this.GetCategory();
    if (this.mediaCategoryId !== 0 && this.mediaCategoryId !== undefined) {
      this.archiveButton = true;
      this.GetMediaCategoryById(this.mediaCategoryId);
    } else {
       this.archiveButton = false;
    }
  }

  initForm() {
    this.mediaCategoryDetailsForm = new FormGroup({
      mediaCategoryName: new FormControl('', [Validators.required])
    });
  }

  ResetFormOnAddNewMediaCategory() {
    this.mediaCategoryId = 0;
    this.mediaCategoryDetail = {};
    this.mediaCategoryDetailsForm.reset();
  }

  GetMediaCategoryById(id) {
    // tslint:disable-next-line:max-line-length
    this.mediaCategoryService.GetMediaCategoryById(this.appurl.getApiUrl() + GLOBAL.API_Contract_GetMediaCategoryById, id).subscribe(result => {
      this.mediaCategoryDetail = result.data.mediaCategoryById;
      this.mediaCategoryDetailsForm = new FormGroup({
        mediaCategoryName: new FormControl(this.mediaCategoryDetail.CategoryName, [Validators.required])
      });
    });
  }

  onChange(value) {
    this.mediaCategoryDetail.CategoryName = value;
    if (this.mediaCategoryId === 0 || this.mediaCategoryId === undefined || this.mediaCategoryId === null) {
      this.CreateMediaCategory();
    } else {
      this.EditMediaCategory();
    }
  }

  CreateMediaCategory() {
    // tslint:disable-next-line:max-line-length
    this.mediaCategoryService.AddMediaCategory(this.appurl.getApiUrl() + GLOBAL.API_Contract_AddMediaCategory, this.mediaCategoryDetail).subscribe(result => {
      this.mediaCategoryDetail = result.data.mediaCategoryById;
      this.mediaCategoryId = result.data.mediaCategoryById.MediaCategoryId;
      this.addMediaCategory.emit(this.mediaCategoryDetail);
      this.archiveButton = true;
    });
  }

  EditMediaCategory() {
    // tslint:disable-next-line:max-line-length
    this.mediaCategoryService.AddMediaCategory(this.appurl.getApiUrl() + GLOBAL.API_Contract_AddMediaCategory, this.mediaCategoryDetail).subscribe(result => {
      this.mediaCategoryDetail = result.data.mediaCategoryById;
      this.updateMediaCategory.emit(this.mediaCategoryDetail);
    });
  }

  //#region "emit"
  onHideDetailPanel() {
    this.hideDetailPanel.emit();
  }
  //#endregion

  DeleteMediaCategory(id) {
    // tslint:disable-next-line:max-line-length
    this.mediaCategoryService.DeleteMediaCategory(this.appurl.getApiUrl() + GLOBAL.API_Contract_DeleteMediaCategory, id).subscribe(result => {
      this.mediaCategoryId = 0;
      this.mediaCategoryDetail = {};
      this.deleteMediaCategory.emit({ id: id });
    });
  }
}
