import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
// tslint:disable-next-line:max-line-length
import { TimeCategoryModel, MediumModel, QualityModel, ActivityTypeModel, NatureModel, CurrencyModel, MediaCategoryModel } from '../../contracts/model/contract-details.model';
import { GLOBAL } from 'src/app/shared/global';
import { AppUrlService } from 'src/app/shared/services/app-url.service';
import { ContractsService } from '../../contracts/service/contracts.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MasterPageServiceService } from '../service/master-page-service.service';
import { UnitRateModel } from '../model/mastrer-pages.model';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-unit-rate',
  templateUrl: './unit-rate.component.html',
  styleUrls: ['./unit-rate.component.scss']
})
export class UnitRateComponent implements OnInit {
  unitRateDetails: UnitRateModel = {};
  unitRateForm; // These are variables
  activity;
  unitRate;
  currency;
  medium;
  timeCategory;
  nature;
  quality;
  selectedUnitRateId: number;
  selectedActivityTypeId: number;
  timecategories: TimeCategoryModel[];
  natures: NatureModel[];
  mediums: MediumModel[];
  qualities: QualityModel[];
  activities: ActivityTypeModel[];
  currencies: CurrencyModel[];
  mediaCategories: MediaCategoryModel[];
  validateForm: boolean;
  controlName: string;
  activityType: number;
  archiveUnitRate = false;
  @Input() routeId: number;
  @Output() deleteUnitRate = new EventEmitter<any>();
  @Output() addunitRateList = new EventEmitter<any>();
  @Output() testFunc = new EventEmitter<{}>();
  @Output() updateUnitRateListById = new EventEmitter<any>();
  @Output() hideDetailPanel = new EventEmitter<any>();
  formErrors = {
    'activity': '',
    'quality': '',
    'nature': '',
    'timeCategory': '',
    'medium': '',
    'currency': '',
    'unitRate': ''
  };
  validationMessages = {
    'activity': {
      'required': 'Activity is required.'
    },
    'quality': {
      'required': 'Quality is required.'
    },
    'nature': {
      'required': 'Nature is required.'
    },
    'timeCategory': {
      'required': 'Time Category is required.'
    },
    'medium': {
      'required': 'Medium is required.'
    },
    'currency': {
      'required': 'Currency is required.'
    },
    'unitRate': {
      'required': 'Unit Rate is required.'
    }
  };
  // tslint:disable-next-line:max-line-length
  constructor(private contractService: ContractsService, private appurl: AppUrlService, private masterPageService: MasterPageServiceService, private routeActive: ActivatedRoute) { }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(): void {
    this.MasterPageValues();
    this.initForm();
    if (this.routeId !== 0 && this.routeId !== undefined) {
      this.archiveUnitRate = true;
      this.GetUnitRateById(this.routeId);
    } else {
      this.archiveUnitRate = false;
    }
  }

  initForm() {
    this.unitRateForm = new FormGroup({
      activity: new FormControl('', [Validators.required]),
      unitRate: new FormControl('', [Validators.required]),
      currency: new FormControl('', [Validators.required]),
      timeCategory: new FormControl('', [Validators.required]),
      nature: new FormControl('', [Validators.required]),
      quality: new FormControl('', [Validators.required]),
      medium: new FormControl('', [Validators.required]),
      unitRateId: new FormControl(),
      mediaCategory: new FormControl(),
    });
  }

  ngOnInit() {

  }

  Validate(evt) {
    console.log(evt);
    if (evt.which !== 8 && evt.which !== 0 && evt.which < 48 || evt.which > 57) {
      evt.preventDefault();
    }
  }

  GetUnitRateById(id) {
    this.routeId = id;
    this.masterPageService.GetUnitRateById(this.appurl.getApiUrl() + GLOBAL.API_Contract_GetUnitRateById, id).subscribe(data => {
      this.unitRateForm = new FormGroup({
        activity: new FormControl(data.data.rateDetailsById.ActivityTypeId, [Validators.required]),
        unitRate: new FormControl(data.data.rateDetailsById.UnitRates, [Validators.required]),
        currency: new FormControl(data.data.rateDetailsById.CurrencyId, [Validators.required]),
        timeCategory: new FormControl(data.data.rateDetailsById.TimeCategoryId, [Validators.required]),
        nature: new FormControl(data.data.rateDetailsById.NatureId, [Validators.required]),
        quality: new FormControl(data.data.rateDetailsById.QualityId, [Validators.required]),
        medium: new FormControl(data.data.rateDetailsById.MediumId, [Validators.required]),
        unitRateId: new FormControl(data.data.rateDetailsById.UnitRateId),
        mediaCategory: new FormControl(data.data.rateDetailsById.MediaCategoryId),
      });
      this.selectedUnitRateId = data.data.rateDetailsById.UnitRateId;
      this.selectedActivityTypeId = data.data.rateDetailsById.ActivityTypeId;
      this.onChange('activity', this.selectedActivityTypeId);
      this.unitRateDetails = data.data.rateDetailsById;
    });
  }

  MasterPageValues() {
    this.contractService.GetMasterPagesList(this.appurl.getApiUrl() + GLOBAL.API_Contract_GetMasterPagesValues).subscribe(data => {    
      this.natures = data.data.Natures;
      this.mediums = data.data.Mediums;
      this.timecategories = data.data.TimeCategories;
      this.qualities = data.data.Qualities;
      this.activities = data.data.ActivityTypes;
      this.currencies = data.data.Currencies;
      this.mediaCategories = data.data.MediaCategories;
    });
  }

  SetDefaultValues() {
    this.unitRateForm = new FormGroup({
      activity: new FormControl( this.activities[0].ActivityTypeId, [Validators.required]),
      unitRate: new FormControl('', [Validators.required]),
      currency: new FormControl(this.currencies[0].CurrencyId, [Validators.required]),
      timeCategory: new FormControl(this.timecategories[0].TimeCategoryId, [Validators.required]),
      nature: new FormControl(this.natures[0].NatureId, [Validators.required]),
      quality: new FormControl(this.qualities[0].QualityId, [Validators.required]),
      medium: new FormControl(this.mediums[0].MediumId, [Validators.required]),
      unitRateId: new FormControl(),
      mediaCategory: new FormControl(this.mediaCategories[0].MediaCategoryId),
    });
    this.activityType = this.activities[0].ActivityTypeId;
    this.unitRateDetails.ActivityTypeId = this.activities[0].ActivityTypeId;
    this.unitRateDetails.CurrencyId = this.currencies[0].CurrencyId;
    this.unitRateDetails.TimeCategoryId = this.timecategories[0].TimeCategoryId;
    this.unitRateDetails.NatureId = this.natures[0].NatureId;
    this.unitRateDetails.QualityId = this.qualities[0].QualityId;
    this.unitRateDetails.MediumId = this.mediums[0].MediumId;
    this.unitRateDetails.MediaCategoryId = this.mediaCategories[0].MediaCategoryId;
  }

  ValidateFields(ev, data) {
    Object.keys(this.unitRateForm.controls).map((controlName) => {
      if (this.activityType === 14) {
        if (controlName === 'timeCategory') {
          return;
        } else {
          // tslint:disable-next-line:no-unused-expression
          this.unitRateForm.get(controlName).markAsTouched({ onlySelf: true }) ||
            this.unitRateForm.get(controlName).markAsDirty({ onlySelf: true });
        }
      }

      if (this.activityType === 13) {
        if (controlName === 'quality' || controlName === 'nature') {
          return;
        } else {
          // tslint:disable-next-line:no-unused-expression
          this.unitRateForm.get(controlName).markAsTouched({ onlySelf: true }) ||
            this.unitRateForm.get(controlName).markAsDirty({ onlySelf: true });
        }
      }
    });
    if (ev === 'activity') {
      this.unitRateDetails.ActivityTypeId = data;
    }
    if (ev === 'medium') {
      this.unitRateDetails.MediumId = data;
    }
    if (ev === 'currency') {
      this.unitRateDetails.CurrencyId = data;
    }
    if (ev === 'nature') {
      this.unitRateDetails.NatureId = data;
    }
    if (ev === 'quality') {
      this.unitRateDetails.QualityId = data;
    }
    if (ev === 'timeCategory') {
      this.unitRateDetails.TimeCategoryId = data;
    }
    if (ev === 'unitRate') {
      this.unitRateDetails.UnitRate = data;
    }
    if (ev === 'mediaCategory') {
      this.unitRateDetails.MediaCategoryId = data;
    }

    if (this.activityType === 13) { // Broadcasting
      if (this.unitRateForm.value.timeCategory === '' || this.unitRateForm.value.timeCategory === undefined ||
        this.unitRateForm.value.timeCategory === null || this.unitRateForm.value.currency === '' ||
        this.unitRateForm.value.currency === undefined ||
        this.unitRateForm.value.currency === null || this.unitRateForm.value.medium === '' ||
        this.unitRateForm.value.medium === undefined ||
        this.unitRateForm.value.medium === null || this.unitRateForm.value.unitRate === '' ||
        this.unitRateForm.value.unitRate === undefined ||
        this.unitRateForm.value.unitRate === null) {
        this.validateForm = false;
      } else {
        this.validateForm = true;
      }
    }
    if (this.activityType === 14) { // production
      if (this.unitRateForm.value.quality === '' || this.unitRateForm.value.quality === undefined ||
        this.unitRateForm.value.quality === null || this.unitRateForm.value.activity === '' ||
        this.unitRateForm.value.activity === undefined ||
        this.unitRateForm.value.activity === null || this.unitRateForm.value.currency === '' ||
        this.unitRateForm.value.currency === undefined ||
        this.unitRateForm.value.currency === null || this.unitRateForm.value.medium === '' ||
        this.unitRateForm.value.medium === undefined ||
        this.unitRateForm.value.medium === null || this.unitRateForm.value.unitRate === '' ||
        this.unitRateForm.value.unitRate === undefined ||
        this.unitRateForm.value.unitRate === null || this.unitRateForm.value.nature === '' ||
        this.unitRateForm.value.nature === undefined ||
        this.unitRateForm.value.nature === null) {
        this.validateForm = false;
      } else {
        this.validateForm = true;
      }
    }
    this.onValueChanged();
    this.unitRateDetails.UnitRateId = this.selectedUnitRateId;
    if (this.validateForm === true) {
      if (this.selectedUnitRateId === 0 || this.selectedUnitRateId === undefined || this.selectedUnitRateId === null) {
        this.addNewUnitRate(this.unitRateDetails);
      } else {
        this.editUnitRate(this.unitRateDetails);
      }
      // tslint:disable-next-line:max-line-length

    } else {
      return;
    }
  }

  editUnitRate(model) {
    this.masterPageService.AddUnitRate(this.appurl.getApiUrl() + GLOBAL.API_Contract_AddUnitRate, model).subscribe(result => {
      this.unitRateDetails = result.data.unitRateDetailsById;
      this.unitRateDetails.ActivityName = result.data.unitRateDetailsById.ActivityTypes.ActivityName;
      // this.unitRateDetails.UnitRate = result.data.unitRateDetails.UnitRates;
      this.updateUnitRateListById.emit(this.unitRateDetails);
    });
  }

  addNewUnitRate(model) {
    this.masterPageService.AddUnitRate(this.appurl.getApiUrl() + GLOBAL.API_Contract_AddUnitRate, model).subscribe(result => {
      this.unitRateDetails = result.data.unitRateDetails;
      this.unitRateDetails.UnitRateId = result.data.unitRateDetails.UnitRateId;
      this.unitRateDetails.UnitRates =  result.data.unitRateDetails.UnitRate;
      this.testFunc.emit(this.unitRateDetails);
    });
  }

  DeleteUnitRate(id) {
    this.contractService.DeleteUnitRate(this.appurl.getApiUrl() + GLOBAL.API_Contract_DeleteUnitRate, id).subscribe(result => {
      this.deleteUnitRate.emit({ id: id });
    });
  }

  AdditionOfUnitRate() {
    this.unitRateDetails = {};
    this.unitRateForm.reset();
  }

  onChange(ev, data) {
    // this.unitRateForm.reset();

    if (data === 13) {
      this.activityType = 13;
    } else if (data === 14) {
      this.activityType = 14;
    }


    if (ev === 'activity') {
      this.unitRateDetails.ActivityTypeId = data;
    }
  }

  //#region "emit"
  onHideDetailPanel() {
    this.hideDetailPanel.emit();
  }
  //#endregion

  onValueChanged(data?: any) {

    if (!this.unitRateForm) { return; }
    const form = this.unitRateForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              if (this.activityType === 14) {
                if (field === "timeCategory") {
                  this.formErrors[field] += ' ';
                } else {
                  this.formErrors[field] += messages[key] + ' ';
                }
              } else if (this.activityType === 13) {

                if (field === "quality" || field === "nature") {
                  this.formErrors[field] += ' ';
                } else {
                  this.formErrors[field] += messages[key] + ' ';
                }
              } else { this.formErrors[field] += messages[key] + ' '; }

            }
          }
        }
      }
    }
  }

}
