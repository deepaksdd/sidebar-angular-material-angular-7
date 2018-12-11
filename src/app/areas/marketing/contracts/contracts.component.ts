import { Component, OnInit, ViewChild } from '@angular/core';
import { AppUrlService } from 'src/app/shared/services/app-url.service';
import { ContractsService } from '../contracts/service/contracts.service';
import { GLOBAL } from 'src/app/shared/global';
import { Router } from '@angular/router';
import { ContractDetailsComponent } from './contract-details/contract-details.component';
import { CurrencyModel, ActivityTypeModel, ContractDetailsModel } from './model/contract-details.model';
import { ClientDetailsModel, FilterModel } from '../clients/model/client.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { debug } from 'util';
import { Activities } from '../../../shared/enum';
@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss']
})

export class ContractsComponent implements OnInit {

  filters = [
    { id: '1', Value: 'Equals' },
    { id: '2', Value: 'Greater Than' },
    { id: '3', Value: 'Less Than' }
  ];

  @ViewChild(ContractDetailsComponent) child: ContractDetailsComponent;
  showContractDetail = false;
  currencies: CurrencyModel[];
  activities: ActivityTypeModel[];
  clientList: ClientDetailsModel[];
  filterModel: FilterModel = {};
  colsm6 = 'col-sm-10 col-sm-offset-1';
  contractId: any;
  type: any = '';
  display = '';
  filtersForm: FormGroup;
  firstFilterContract = {};
  constructor(private contractsService: ContractsService, private appurl: AppUrlService, private router: Router) {
    this.initForm();
  }
  contractsList: ContractDetailsModel[];

  ngOnInit() {
    this.getContractsList();
    this.MasterPageValues();
    this.getClientList();
  }

  initForm() {
    this.filtersForm = new FormGroup({
      clientName: new FormControl(''),
      unitRate: new FormControl(''),
      currency: new FormControl(''),
      activity: new FormControl(''),
      filterType: new FormControl(''),
      contractId: new FormControl('')
    });
  }

  onSubmit(form: FormGroup) {
    this.filterModel.CurrencyId = this.filtersForm.value.currency;
    this.filterModel.ActivityTypeId = this.filtersForm.value.activity;
    this.filterModel.UnitRate = this.filtersForm.value.unitRate;
    this.filterModel.ClientName = this.filtersForm.value.clientName;
    this.filterModel.ContractId = this.filtersForm.value.contractId;
    this.filterModel.FilterType = this.filtersForm.value.filterType;
    // this.clientNameModel.find(c => c.ClientName === type).ClientId;
    // this.filterModel.ClientName = this.filtersForm.value.clientName;
    this.contractsService.GetFilteredList(this.appurl.getApiUrl() + GLOBAL.API_Contract_GetFilteredList, this.filterModel)
      .subscribe(result => {
        console.log(result.data.ContractDetails);
        this.closeModalDialog();
        this.contractsList = [];
        result.data.ContractDetails.forEach(element => {
          this.contractsList.push(element);
        });
        this.firstFilterContract = this.contractsList[0];
        this.child.DisplayFirstEntryOfFilteredList(this.firstFilterContract);
      });
  }

  getContractsList() {
    this.contractsList = [];
    this.contractsService.GetContractsList(this.appurl.getApiUrl() + GLOBAL.API_Job_GetContractsList).subscribe(data => {
      this.contractsList = data.data.ContractDetails;
      // data.data.ContractDetails.forEach(element => {
      //   this.contractsList.push({
      //     Activity: element.ActivityTypeId === 13 ? 'Broadcasting' : 'Production'
      //   });

      // });
    });
  }

  getContractsFirstList() {
    this.contractsList = [];
    this.contractsService.GetContractsList(this.appurl.getApiUrl() + GLOBAL.API_Job_GetContractsList).subscribe(data => {
      this.contractsList = data.data.ContractDetails;
      this.firstFilterContract = this.contractsList[0];
      this.child.DisplayFirstEntryOfFilteredList(this.firstFilterContract);
      // data.data.ContractDetails.forEach(element => {
      //   this.contractsList.push({
      //     Activity: element.ActivityTypeId === 13 ? 'Broadcasting' : 'Production'
      //   });

      // });
    });
  }
  getClientList() {
    this.contractsService.GetClientList(this.appurl.getApiUrl() + GLOBAL.API_Client_GetAllClient).subscribe(data => {
      this.clientList = data.data.ClientDetails;
    });
  }

  MasterPageValues() {
    // tslint:disable-next-line:max-line-length
    this.contractsService.GetMasterPagesList(this.appurl.getApiUrl() + GLOBAL.API_Contract_GetMasterPagesValues).subscribe(data => {
      this.currencies = data.data.Currencies;
      this.activities = data.data.ActivityTypes;
    });
  }

  // onItemClick(data: any, type) {
  //   this.showContractDetail = this.type === type ? !this.showContractDetail : this.showContractDetail;
  //   this.colsm6 = this.showContractDetail ? 'col-sm-6' : 'col-sm-10 col-sm-offset-1';
  //   this.type = type;
  //   this.child.contractDetails = {};
  //   this.child.AddNewContract();
  // }

  // GetContractDetailsById(type, contractId) {
  //   this.child.type = type;
  //   if ((this.contractId === contractId && this.type === type) || this.contractId === undefined) {

  //     this.showContractDetail = !this.showContractDetail;
  //   }

  //   this.contractId = contractId;
  //   this.child.GetContractById(this.contractId);

  //   if (this.type === type || this.type !== undefined) {
  //     this.colsm6 = this.showContractDetail ? 'col-sm-6' : 'col-sm-10 col-sm-offset-1';
  //   }


  // this.contractId = contractId;
  // this.showContractDetail = !this.showContractDetail;
  // this.colsm6 = this.showContractDetail ? 'col-sm-6' : 'col-sm-10 col-sm-offset-1';
  // }

  // addNewJob() {
  // }

  // GetContractList(e) {
  //   if (this.child.types === "Add") {
  //     this.contractsList.push(e);
  //   }
  //   if ( this.child.types === "Edit") {
  //     const index = this.contractsList.findIndex(r => r.ContractId === e.ContractId);
  //     this.contractsList.splice(index, 1);
  //     this.contractsList.push(e);
  //   }
  // }

  onItemClick(id: number) {
    this.closeModalDialog();
    this.filtersForm.reset();
    this.contractId = id;
    if (this.contractId === 0 || this.contractId === undefined || this.contractId === null) {
      this.child.AddNewContract();
      // this.child.SetDefaultValues();
    }
    this.showProjectDetailPanel();
  }

  //#region "show/hide"
  showProjectDetailPanel() {
    this.showContractDetail = true;
    this.colsm6 = this.showContractDetail ? 'col-sm-6' : 'col-sm-10 col-sm-offset-1';
  }

  hideProjectDetailPanel() {
    this.showContractDetail = false;
    this.colsm6 = this.showContractDetail ? 'col-sm-6' : 'col-sm-10 col-sm-offset-1';
  }
  //#endregion

  //#region "Emit"
  hideDetailPanel(e) {
    this.hideProjectDetailPanel();
  }
  //#endregion

  onContractDeleted(id) {
    const index = this.contractsList.findIndex(r => r.ContractId === id.id);
    this.contractsList.splice(index, 1);
    this.child.AddNewContract();
    this.hideProjectDetailPanel();
  }

  DeleteClient(clientId) {
    this.contractsService.DeleteContract(this.appurl.getApiUrl() + GLOBAL.API_Contract_DeleteContract, clientId).subscribe(result => {
      this.getContractsList();
    });
  }

  addContractListById(e) {
    this.contractsList.push(e);
  }

  updateContractListById(e) {
    const index = this.contractsList.findIndex(r => r.ContractId === e.ContractId);
    if (index !== -1) {
      this.contractsList[index] = e;
    }
  }

  openModalFilter() {
    this.display = 'block';
  }

  closeModalDialog() {
    this.display = 'none';
  }

  RefreshFilters() {
    this.filterModel = {};
    this.firstFilterContract = {};
    this.filtersForm.reset();
    // this.contractsList = [];
    this.getContractsFirstList();
  }

  onChange(ev, value) {
    if (ev === 'contractId') {
      this.filterModel.ContractId = value;
    }
    if (ev === 'email') {
      this.filterModel.FilterType = value;
    }
    if (ev === 'clientName') {
      this.filterModel.ClientName = value;
    }
    if (ev === 'currency') {
      this.filterModel.CurrencyId = value;
    }
    if (ev === 'activity') {
      this.filterModel.ActivityTypeId = value;
    }
    if (ev === 'unitRate') {
      this.filterModel.UnitRate = value;
    }
    if (ev === 'filterType') {
      this.filterModel.FilterType = value;
    }
    this.contractsService.GetFilteredList(this.appurl.getApiUrl() + GLOBAL.API_Contract_GetFilteredList, this.filterModel)
      .subscribe(result => {
        console.log(result.data.ContractDetails);
        // this.closeModalDialog();
        this.contractsList = [];
        result.data.ContractDetails.forEach(element => {
          this.contractsList.push(element);
        });
        this.firstFilterContract = this.contractsList[0];
        this.child.DisplayFirstEntryOfFilteredList(this.firstFilterContract);
      });
  }
}
