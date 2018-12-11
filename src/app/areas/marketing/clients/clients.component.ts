import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientsService } from './service/clients.service';
import { GLOBAL } from 'src/app/shared/global';
import { AppUrlService } from 'src/app/shared/services/app-url.service';
import { ClientDetailsModel, FilterModel, FilterClientModel, CategoryModel } from './model/client.model';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { FormGroup, FormControl } from '@angular/forms';
import { ContractsService } from '../contracts/service/contracts.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  filters = [
    { id: '1', Value: 'Equals' },
    { id: '2', Value: 'Greater Than' },
    { id: '3', Value: 'Less Than' }
  ];

  @ViewChild(ClientDetailsComponent) child: ClientDetailsComponent;
  showClientDetail = false;
  firstClient = {};
  clientListDetails: ClientDetailsModel[];
  colsm6 = 'col-sm-10 col-sm-offset-1';
  type: any = '';
  clientId = 0;
  display = '';
  filtersForm: FormGroup;
  filterModel: FilterClientModel = {};
  categories: CategoryModel[];
  constructor(private appurl: AppUrlService, private clientsService: ClientsService, private contractsService: ContractsService) { }

  initForm() {
    this.filtersForm = new FormGroup({
      clientName: new FormControl(''),
      email: new FormControl(''),
      category: new FormControl(''),
      position: new FormControl(''),
      clientId: new FormControl('')
    });
  }

  onSubmit(form: FormGroup) {
    this.filterModel.CategoryId = this.filtersForm.value.category;
    this.filterModel.Email = this.filtersForm.value.email;
    this.filterModel.Position = this.filtersForm.value.position;
    this.filterModel.ClientName = this.filtersForm.value.clientName;
    this.filterModel.ClientId = this.filtersForm.value.clientId;
    this.contractsService.GetFilteredList(this.appurl.getApiUrl() + GLOBAL.API_Client_GetFilteredList, this.filterModel)
      .subscribe(result => {
        console.log(result.data.ClientDetails);
        this.closeModalDialog();
        this.clientListDetails = [];
        result.data.ClientDetails.forEach
          (element => {
            this.clientListDetails.push(element);
          });
        this.firstClient = this.clientListDetails[0];
        this.child.DisplayFirstEntryOfFilteredList(this.firstClient);
      });
  }

  ngOnInit() {
    this.GetAllClients();
    this.GetCategory();
    this.initForm();
  }

  GetAllClients() {
    // tslint:disable-next-line:max-line-length
    this.clientsService.GetClientsList(this.appurl.getApiUrl() + GLOBAL.API_Client_GetAllClient).subscribe(result => {
      this.clientListDetails = result.data.ClientDetails;
    });
  }

  GetCategory() {
    // tslint:disable-next-line:max-line-length
    this.clientsService.GetCategory(this.appurl.getApiUrl() + GLOBAL.API_Client_GetCategory).subscribe(result => {
      this.categories = result.data.Categories;
    });
  }

  onItemClick(id: number) {
    this.closeModalDialog();
    this.filtersForm.reset();
    this.clientId = id;
    if (this.clientId === 0 || this.clientId === undefined || this.clientId === null) {
      this.child.ResetFormOnAddNewClient();
      this.child.CreateClientonAddNew();
    }
    this.showProjectDetailPanel();
  }

  //#region "show/hide"
  showProjectDetailPanel() {
    this.showClientDetail = true;
    this.colsm6 = this.showClientDetail ? 'col-sm-6' : 'col-sm-10 col-sm-offset-1';
  }

  hideProjectDetailPanel() {
    this.showClientDetail = false;
    this.colsm6 = this.showClientDetail ? 'col-sm-6' : 'col-sm-10 col-sm-offset-1';
  }
  //#endregion

  //#region "Emit"
  hideDetailPanel(event) {
    this.hideProjectDetailPanel();
  }
  //#endregion

  onClientDeleted(id) {
    console.log(id);
    const index = this.clientListDetails.findIndex(r => r.ClientId === id.id);
    this.clientListDetails.splice(index, 1);
    this.child.ResetFormOnAddNewClient();
    this.hideProjectDetailPanel();
  }

  DeleteClient(clientId) {
    this.clientsService.DeleteClient(this.appurl.getApiUrl() + GLOBAL.API_Client_DeleteClient, clientId).subscribe(result => {
      this.GetAllClients();
    });
  }

  addClientListById(e) {
    this.clientListDetails.push(e);
  }

  updateClientListById(e) {
    const index = this.clientListDetails.findIndex(r => r.ClientId === e.ClientId);
    if (index !== -1) {
      this.clientListDetails[index] = e;
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
    this.filtersForm.reset();
    this.clientListDetails = [];
    this.getClientsFirstList();
  }

  getClientsFirstList() {
    // tslint:disable-next-line:max-line-length
    this.clientsService.GetClientsList(this.appurl.getApiUrl() + GLOBAL.API_Client_GetAllClient).subscribe(result => {
      this.clientListDetails = result.data.ClientDetails;
      this.firstClient = this.clientListDetails[0];
      this.child.DisplayFirstEntryOfFilteredList(this.firstClient);
    });
  }

  onChange(ev, value) {
    if (ev === 'clientId') {
      this.filterModel.ClientId = value;
    }
    if (ev === 'clientName') {
      this.filterModel.ClientName = value;
    }
    if (ev === 'category') {
      this.filterModel.CategoryId = value;
    }
    if (ev === 'position') {
      this.filterModel.Position = value;
    }
    if (ev === 'email') {
      this.filterModel.Email = value;
    } this.contractsService.GetFilteredList(this.appurl.getApiUrl() + GLOBAL.API_Client_GetFilteredList, this.filterModel)
      .subscribe(result => {
        console.log(result.data.ClientDetails);
        // this.closeModalDialog();
        this.clientListDetails = [];
        result.data.ClientDetails.forEach
          (element => {
            this.clientListDetails.push(element);
          });
        this.firstClient = this.clientListDetails[0];
        this.child.DisplayFirstEntryOfFilteredList(this.firstClient);
      });
  }

}



