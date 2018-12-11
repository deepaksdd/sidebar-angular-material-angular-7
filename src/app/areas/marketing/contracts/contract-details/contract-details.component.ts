import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnChanges } from '@angular/core';
// tslint:disable-next-line:max-line-length
import { TimeCategoryModel, MediumModel, ApproveContractModel, MediaCategoryModel, NatureModel, LanguageModel, CurrencyModel, ContractDetailsModel, ActivityTypeModel, QualityModel } from '../model/contract-details.model';
import { ContractsService } from '../service/contracts.service';
import { AppUrlService } from 'src/app/shared/services/app-url.service';
import { GLOBAL } from 'src/app/shared/global';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { AutoComplete, OverlayPanel, SelectItem } from 'primeng/primeng';
import { ClientDetailsModel, ClientNameModel } from '../../clients/model/client.model';
import { UnitRateModel } from '../../master-pages/model/mastrer-pages.model';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { debug } from 'util';
import { MatAutocomplete } from '@angular/material';
@Component({
  selector: 'app-contract-details',
  templateUrl: './contract-details.component.html',
  styleUrls: ['./contract-details.component.scss']
})
export class ContractDetailsComponent implements OnInit {
  contractDetails: ContractDetailsModel = {};
  validateForm = false;

  clientId: any;

  approveContractModel: ApproveContractModel = {};
  formErrors = {
    'clientName': '',
    'currency': '',
    'startDate': '',
    'endDate': '',
    'language': '',
    'medium': '',
    'jobNature': '',
    'timeCategory': '',
    'mediaCategory': '',
    'quality': '',
    'activityType': ''
  };
  validationMessages = {
    'clientName': {
      'required': 'Client Name is required.'
    },
    'currency': {
      'required': 'Currency is required.'
    },
    'startDate': {
      'required': 'Start Date is required.'
    },
    'endDate': {
      'required': 'End Date is required.'
    },
    'language': {
      'required': 'Language is required.'
    },
    'medium': {
      'required': 'Medium is required.'
    },
    'jobNature': {
      'required': 'Nature is required.'
    },
    'timeCategory': {
      'required': 'Time Category is required.'
    },
    'mediaCategory': {
      'required': 'Media Category is required.'
    },
    'quality': {
      'required': 'Quality is required.'
    },
    'activityType': {
      'required': 'Activity Type is required.'
    }
  };
  @ViewChild(MatAutocomplete) matAutocomplete: MatAutocomplete;
  constructor(private fb: FormBuilder, private contractService: ContractsService, private appurl: AppUrlService, private router: Router) {
  }
  timecategories: TimeCategoryModel[];
  // selected: {startdDate: Moment, endDate: Moment};
  natures: NatureModel[];
  activitytypes: ActivityTypeModel[];
  mediacategories: MediaCategoryModel[];
  mediums: MediumModel[];
  languages: LanguageModel[];
  currencies: CurrencyModel[];
  contractDetailsForm;
  contractDetailsModel: ContractDetailsModel = {};
  clientNameModel: ClientNameModel[] = [];
  clientList: ClientDetailsModel[];
  unitRateModel: UnitRateModel = {};
  qualityModel: QualityModel[];
  viewContract: boolean;
  declineContract = true;
  approveContract = true;
  saveContractBool: boolean;
  selectedcontractId: number;
  confirmApproval = false;
  confirmDecline = false;
  types: string;
  archiveButton = false;
  displayModal = '';
  contractType = '';
  @Input() contractId: any;
  @Output() deleteContract = new EventEmitter<any>();
  @Output() addContractList = new EventEmitter<any>();
  @Output() updateContractList = new EventEmitter<any>();
  @Output() hideDetailPanel = new EventEmitter<any>();
  cId: any;
  id: string;
  clientName = new FormControl('', [Validators.required]);
  filteredOptions: Observable<any[]>;
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(): void {
    this.MasterPageValues();
    this.initForm();
    if (this.contractId !== 0 && this.contractId !== undefined) {
      this.archiveButton = true;
      this.GetContractById(this.contractId);
    } else {
      this.archiveButton = false;
    }
  }

  onHideDetailPanel() {
    this.hideDetailPanel.emit();
  }

  initForm() {
    this.contractDetailsForm = new FormGroup({
      contractCode: new FormControl(''),
      clientId: new FormControl(''),
      clientName: new FormControl('', [Validators.required]),
      unitRate: new FormControl('', [Validators.required]),
      currency: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      language: new FormControl('', [Validators.required]),
      medium: new FormControl('', [Validators.required]),
      jobNature: new FormControl('', [Validators.required]),
      timeCategory: new FormControl('', [Validators.required]),
      // mediaCategory: new FormControl('', [Validators.required]),
      quality: new FormControl('', [Validators.required]),
      activityType: new FormControl('', [Validators.required])
    });
    // this.contractDetailsForm = this.fb.group({
    //   contractCode: '',
    //   clientId: 0,
    //   clientName: ['', Validators.required],
    //   unitRate: ['', Validators.required],
    //   currency: ['', Validators.required],
    //   startDate: ['', Validators.required],
    //   endDate: ['', Validators.required],
    //   language: ['', Validators.required],
    //   medium: ['', Validators.required],
    //   jobNature: ['', Validators.required],
    //   timeCategory: ['', Validators.required],
    //   mediaCategory: ['', Validators.required],
    //   quality: ['', Validators.required],
    //   activityType: ['', Validators.required]
    // });
  }

  ngOnInit() {
    this.selectedcontractId = 0;
    this.getClientList();
  }
  // private _filter(value: any): any[] {
  //   return this.clientNameModel.filter(option => option.ClientName.toLowerCase().includes(value));
  // }

  getClientList() {
    this.contractService.GetClientList(this.appurl.getApiUrl() + GLOBAL.API_Client_GetAllClient).subscribe(data => {
      this.clientList = data.data.ClientDetails;
      data.data.ClientDetails.forEach(element => {
        this.clientNameModel.push({
          ClientId: element.ClientId,
          ClientName: element.ClientName
        });

      });
      // this.filteredOptions = this.clientName.valueChanges
      //   .pipe(
      //     startWith(''),
      //     map(value => this._filter(value))
      //   );
      // console.log(this.filteredOptions);
    });
  }

  GetContractById(cId) {
    this.contractService.GetContractById(this.appurl.getApiUrl() + GLOBAL.API_Contract_GetContractDetails, cId).subscribe(data => {
      this.selectedcontractId = cId;
      this.contractDetails = data.data.contractDetailsModel;
      // this.filteredOptions = this.clientName.valueChanges
      // .pipe(
      //   startWith(''),
      //   map(value => this._filter(this.contractDetailsModel.ClientName))
      // );
      this.contractDetailsForm = new FormGroup({
        // clientId: new FormControl(this.contractDetailsModel.ClientId),
        clientName: new FormControl(this.contractDetails.ClientId),
        unitRate: new FormControl(this.contractDetails.UnitRate),
        currency: new FormControl(this.contractDetails.CurrencyId),
        startDate: new FormControl(this.contractDetails.StartDate),
        endDate: new FormControl(this.contractDetails.EndDate),
        language: new FormControl(this.contractDetails.LanguageId),
        medium: new FormControl(this.contractDetails.MediumId),
        jobNature: new FormControl(this.contractDetails.NatureId),
        timeCategory: new FormControl(this.contractDetails.TimeCategoryId),
        // mediaCategory: new FormControl(this.contractDetails.MediaCategoryId),
        quality: new FormControl(this.contractDetails.QualityId),
        activityType: new FormControl(this.contractDetails.ActivityTypeId)
      });
      this.unitRateModel.ActivityTypeId = this.contractDetails.ActivityTypeId;
      this.unitRateModel.CurrencyId = this.contractDetails.CurrencyId;
      this.unitRateModel.LanguageId = this.contractDetails.LanguageId;
      // this.unitRateModel.MediaCategoryId = this.contractDetails.MediaCategoryId;
      this.unitRateModel.MediumId = this.contractDetails.MediumId;
      this.unitRateModel.NatureId = this.contractDetails.NatureId;
      this.unitRateModel.QualityId = this.contractDetails.QualityId;
      this.unitRateModel.TimeCategoryId = this.contractDetails.TimeCategoryId;
      this.unitRateModel.UnitRate = this.contractDetails.UnitRate;
      this.unitRateModel.UnitRateId = this.contractDetails.UnitRateId;
      if (this.contractDetails.IsApproved === true) {
        this.viewContract = true;
        this.approveContract = false;
        this.declineContract = false;
        this.confirmApproval = true;
        this.confirmDecline = false;
      } else if (this.contractDetails.IsDeclined === true) {
        this.viewContract = true;
        this.approveContract = false;
        this.declineContract = false;
        this.confirmDecline = true;
        this.confirmApproval = false;
      } else {
        this.viewContract = false;
        this.approveContract = true;
        this.declineContract = true;
        this.confirmApproval = false;
        this.confirmDecline = false;
      }
      this.contractType = '';
      this.onValueChanged();
    });
  }

  MasterPageValues() {
    this.contractService.GetMasterPagesList(this.appurl.getApiUrl() + GLOBAL.API_Contract_GetMasterPagesValues).subscribe(data => {
      this.natures = data.data.Natures;
      this.mediums = data.data.Mediums;
      this.mediacategories = data.data.MediaCategories;
      this.timecategories = data.data.TimeCategories;
      this.languages = data.data.Languages;
      this.currencies = data.data.Currencies;
      this.activitytypes = data.data.ActivityTypes;
      this.qualityModel = data.data.Qualities;
    });
  }

  // SetDefaultValues() {
  //   this.contractDetailsForm = new FormGroup({
  //     currency: new FormControl(this.currencies[0].CurrencyId),
  //     language: new FormControl(this.languages[0].LanguageId),
  //     medium: new FormControl( this.mediums[0].MediumId),
  //     jobNature: new FormControl(this.natures[0].NatureId),
  //     timeCategory: new FormControl(this.timecategories[0].TimeCategoryId),
  //     quality: new FormControl( this.qualityModel[0].QualityId)
  //   });
  // }

  selectionChanged(ev, type) {
    if (ev === 'activity') {
      this.unitRateModel.ActivityTypeId = type.value;
      this.contractDetailsModel.ActivityTypeId = type.value;
      // this.contractDetails.ActivityTypeId = type.value;
    }
    if (ev === 'currency') {
      this.unitRateModel.CurrencyId = type;
      this.contractDetailsModel.CurrencyId = type;
      // this.contractDetails.CurrencyId = type;
    }

    if (ev === 'language') {
      this.unitRateModel.LanguageId = type;
      this.contractDetailsModel.LanguageId = type;
      // this.contractDetails.LanguageId = type;
    }

    if (ev === 'medium') {
      this.unitRateModel.MediumId = type;
      this.contractDetailsModel.MediumId = type;
      // this.contractDetails.MediumId = type;
    }

    if (ev === 'jobNature') {
      this.unitRateModel.NatureId = type;
      this.contractDetailsModel.NatureId = type;
      // this.contractDetails.NatureId = type;
    }

    if (ev === 'timeCategory') {
      this.unitRateModel.TimeCategoryId = type;
      this.contractDetailsModel.TimeCategoryId = type;
      // this.contractDetails.TimeCategoryId = type;
    }

    // if (ev === 'mediaCategory') {
    //   this.unitRateModel.MediaCategoryId = type;
    //   this.contractDetailsModel.MediaCategoryId = type;
    //   // this.contractDetails.MediaCategoryId = type;
    // }

    if (ev === 'quality') {
      this.unitRateModel.QualityId = type;
      this.contractDetailsModel.QualityId = type;
      //  this.contractDetails.QualityId = type;
    }

    if (ev === 'startDate') {
      // tslint:disable-next-line:max-line-length
      this.unitRateModel.StartDate = new Date(new Date(type).getFullYear(), new Date(type).getMonth(), new Date(type).getDate(), new Date().getHours(), new Date().getMinutes(), new Date().getSeconds());
      // tslint:disable-next-line:max-line-length
      this.contractDetailsModel.StartDate = type;
      // this.contractDetails.StartDate = type;
    }

    if (ev === 'endDate') {
      // tslint:disable-next-line:max-line-length
      this.unitRateModel.EndDate = new Date(new Date(type).getFullYear(), new Date(type).getMonth(), new Date(type).getDate(), new Date().getHours(), new Date().getMinutes(), new Date().getSeconds());
      this.contractDetailsModel.EndDate = type;
      this.contractDetails.EndDate = type;
    }

    // if (ev === 'mediaCategory' ) {
    //   this.contractDetailsModel.MediaCategoryId = type;
    //   this.unitRateModel.MediaCategoryId = type;
    // }

    if (ev === 'clientName') {
      const id = type;
      // this.clientNameModel.find(c => c.ClientName === type).ClientId;
      this.unitRateModel.ClientId = id;
      this.contractDetailsModel.ClientId = id;
      // this.contractDetailsModel.ClientName = type;
      // this.contractDetails.ClientId = id;
      // this.contractDetails.ClientName = type;
    }

    this.onValueChanged();

    if (this.contractDetailsForm.controls.activityType.value === 14) {
      if (this.contractDetailsModel.QualityId === undefined
        || this.contractDetailsModel.QualityId === null
        || this.contractDetailsForm.value.jobNature === ''
        || this.contractDetailsForm.value.jobNature === undefined
        || this.contractDetailsForm.value.jobNature === null
        || this.contractDetailsForm.value.medium === ''
        || this.contractDetailsForm.value.medium === undefined
        || this.contractDetailsForm.value.medium === null
        || this.contractDetailsForm.value.currency === ''
        || this.contractDetailsForm.value.currency === undefined
        || this.contractDetailsForm.value.currency === null
        || this.contractDetailsModel.ClientId === undefined
        || this.contractDetailsModel.ClientId === 0
        || this.contractDetailsModel.ClientId === null) {
        this.validateForm = false;
      } else {
        this.unitRateModel.ActivityTypeId = 14;
        this.validateForm = true;
      }
    }

    if (this.contractDetailsForm.value.activityType === 13) {
      if (this.contractDetailsForm.value.timeCategory === ''
        || this.contractDetailsForm.value.timeCategory === undefined
        || this.contractDetailsForm.value.timeCategory === null
        || this.contractDetailsForm.value.medium === ''
        || this.contractDetailsForm.value.medium === undefined
        || this.contractDetailsForm.value.medium === null
        || this.contractDetailsForm.value.currency === ''
        || this.contractDetailsForm.value.currency === undefined
        || this.contractDetailsForm.value.currency === null
        || this.contractDetailsModel.ClientId === undefined
        || this.contractDetailsModel.ClientId === 0
        || this.contractDetailsModel.ClientId === null) {
        this.validateForm = false;
      } else {
        this.unitRateModel.ActivityTypeId = 13;
        this.validateForm = true;
      }
    }

    if (this.validateForm === true) {
      // tslint:disable-next-line:max-line-length
      this.contractService.GetUnitRateDetailsByActivityId(this.appurl.getApiUrl() + GLOBAL.API_Contract_GetUnitRateByActivity, this.unitRateModel).subscribe(data => {

        this.unitRateModel = data.data.UnitRateByActivityId;
        this.contractDetailsForm = new FormGroup({
          unitRate: new FormControl(data.data.UnitRateByActivityId.UnitRates)
        });
        this.contractDetailsModel.UnitRateId = data.data.UnitRateByActivityId.UnitRateId;
        this.contractDetailsModel.UnitRate = data.data.UnitRateByActivityId.UnitRates;
        if (this.selectedcontractId === 0 || this.selectedcontractId === undefined || this.selectedcontractId === null) {
          this.saveContract();
        } else {
          this.updateContract();
        }
      });
    }
  }

  onValueChanged(data?: any) {
    if (!this.contractDetailsForm) { return; }
    const form = this.contractDetailsForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              if (this.unitRateModel.ActivityTypeId === 14) {
                if (field === "timeCategory") {
                  this.formErrors[field] += ' ';
                } else {
                  this.formErrors[field] += messages[key] + ' ';
                }
              } else if (this.unitRateModel.ActivityTypeId === 13) {

                if (field === "quality" || field === "jobNature") {
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

  updateContract() {
    // tslint:disable-next-line:max-line-length
    this.contractService.SaveContract(this.appurl.getApiUrl() + GLOBAL.API_Contract_SaveContract, this.contractDetails).subscribe(data => {
      this.updateContractList.emit(this.contractDetails);
    });
  }

  DeleteContract(id) {
    // tslint:disable-next-line:max-line-length
    this.contractService.DeleteContract(this.appurl.getApiUrl() + GLOBAL.API_Contract_DeleteContract, id).subscribe(data => {
      this.deleteContract.emit({ id: id });
    });
  }

  saveContract() {
    // tslint:disable-next-line:max-line-length
    this.contractService.SaveContract(this.appurl.getApiUrl() + GLOBAL.API_Contract_SaveContract, this.contractDetailsModel).subscribe(data => {
      this.contractDetailsModel = data.data.contractDetailsModel;
      this.selectedcontractId = this.contractDetailsModel.ContractId;
      this.addContractList.emit(this.contractDetailsModel);
      this.approveContract = true;
      this.declineContract = true;
    });
  }

  AddNewContract() {
    this.initForm();
    this.contractType = '';
    this.viewContract = false;
    this.approveContract = false;
    this.declineContract = false;
    this.confirmApproval = false;
    this.confirmDecline = false;
    this.contractDetailsModel = {};
    this.contractDetailsForm.reset();
  }

  openModal(type) {
    this.contractType = type;
    this.displayModal = 'block';
  }

  closeModal() {
    this.contractType = '';
    this.displayModal = 'none';
  }

  FinalizeContract() {
    const id = this.selectedcontractId;
    this.approveContractModel.ContractId = id;
    this.approveContractModel.Type = this.contractType;
    // this.contractDetailsModel.ContractId;
    // tslint:disable-next-line:max-line-length
    this.contractService.ApproveContract(this.appurl.getApiUrl() + GLOBAL.API_Contract_ApproveContract, this.approveContractModel).subscribe(data => {
      if (this.contractType === 'Approve') {
        this.viewContract = true;
        this.confirmApproval = true;
        this.confirmDecline = false;
        this.approveContract = false;
        this.declineContract = false;
      }
      if (this.contractType === 'Decline') {
        this.viewContract = true;
        this.confirmDecline = true;
        this.confirmApproval = false;
        this.approveContract = false;
        this.declineContract = false;
      }
      this.approveContract = false;
      this.declineContract = false;
      this.displayModal = 'none';
      this.contractType = '';
    });
  }

DisplayFirstEntryOfFilteredList(data) {
  this.contractDetailsForm = new FormGroup({
    // clientId: new FormControl(this.contractDetailsModel.ClientId),
    clientName: new FormControl(data.ClientId),
    unitRate: new FormControl(data.UnitRate),
    currency: new FormControl(data.CurrencyId),
    startDate: new FormControl(data.StartDate),
    endDate: new FormControl(data.EndDate),
    language: new FormControl(data.LanguageId),
    medium: new FormControl(data.MediumId),
    jobNature: new FormControl(data.NatureId),
    timeCategory: new FormControl(data.TimeCategoryId),
    // mediaCategory: new FormControl(this.contractDetails.MediaCategoryId),
    quality: new FormControl(data.QualityId),
    activityType: new FormControl(data.ActivityTypeId)
  });
}

}


