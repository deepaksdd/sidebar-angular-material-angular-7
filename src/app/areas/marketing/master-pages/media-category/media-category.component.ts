import { Component, OnInit, ViewChild } from '@angular/core';
import { AppUrlService } from 'src/app/shared/services/app-url.service';
import { GLOBAL } from 'src/app/shared/global';
import { MasterPageServiceService } from '../service/master-page-service.service';
import { MediaCategoryModel } from '../model/mastrer-pages.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryDetailComponent } from './category-detail/category-detail.component';

@Component({
  selector: 'app-media-category',
  templateUrl: './media-category.component.html',
  styleUrls: ['./media-category.component.scss']
})
export class MediaCategoryComponent implements OnInit {
  categoryName;
  mediaCategoryId;
  showCategoryDetail = false;
  colsm6 = 'col-sm-10 col-sm-offset-1';
  @ViewChild(CategoryDetailComponent) child: CategoryDetailComponent;
  constructor(private appurl: AppUrlService, private masterService: MasterPageServiceService) { }

  model: MediaCategoryModel = {};
  getMediaCategoryList: MediaCategoryModel[];

  ngOnInit() {
    this.init();
    this.getMediaCategory();
  }

  init() {
    // this.jobsList = [];
  }

  getMediaCategory() {
    this.getMediaCategoryList = [];
    this.masterService.GetMediaCategory(this.appurl.getApiUrl() + GLOBAL.API_Contract_GetMediaCategory).subscribe(data => {
      this.getMediaCategoryList = data.data.MediaCategories;
    });
  }

  onItemClick(id: number) {
    this.mediaCategoryId = id;
    if (this.mediaCategoryId === 0 || this.mediaCategoryId === undefined || this.mediaCategoryId === null) {
      this.child.ResetFormOnAddNewMediaCategory();
    }
    this.showProjectDetailPanel();
  }

  //#region "show/hide"
  showProjectDetailPanel() {
    this.showCategoryDetail = true;
    this.colsm6 = this.showCategoryDetail ? 'col-sm-6' : 'col-sm-10 col-sm-offset-1';
  }

  hideProjectDetailPanel() {
    this.showCategoryDetail = false;
    this.colsm6 = this.showCategoryDetail ? 'col-sm-6' : 'col-sm-10 col-sm-offset-1';
  }
  //#endregion

  //#region "Emit"
  hideDetailPanel(event) {
    this.hideProjectDetailPanel();
  }
  //#endregion

  onMediaCategoryDeleted(id) {
    const index = this.getMediaCategoryList.findIndex(r => r.MediaCategoryId === id.id);
    this.getMediaCategoryList.splice(index, 1);
    this.child.ResetFormOnAddNewMediaCategory();
    this.hideProjectDetailPanel();
  }

  addMediaCategoryList(e) {
    this.getMediaCategoryList.push(e);
  }

  updateMediaCategoryList(e) {
    const index = this.getMediaCategoryList.findIndex(r => r.MediaCategoryId === e.MediaCategoryId);
    if (index !== -1) {
      this.getMediaCategoryList[index] = e;
    }
  }
}
