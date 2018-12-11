import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CategoryModel, ClientDetailsModel } from '../model/client.model';
import { AppUrlService } from 'src/app/shared/services/app-url.service';
import { ClientsService } from '../service/clients.service';
import { GLOBAL } from 'src/app/shared/global';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit, OnChanges {

  //#region "variables"

  categories: CategoryModel[];
  @Input() clientId: number;

  @Output() deleteClient = new EventEmitter<any>();
  @Output() addClientList = new EventEmitter<any>();
  @Output() updateClientList = new EventEmitter<any>();
  @Output() hideDetailPanel = new EventEmitter<any>();
  archiveButton = false;
  clientDetails: ClientDetailsModel = {};
  clientDetailsForm;
  validateForm: boolean;
  selectedclientId: any;
  formErrors = {
    'clientName': '',
  };
  validationMessages = {
    'clientName': {
      'required': 'Client Name is required.',
      'minlength': 'Client Name must be at least 2 characters long.',
      'maxlength': 'Client Name cannot be more than 25 characters long.'
    }
  };
  isSubmitted = false;

  //#endregion

  constructor(private appurl: AppUrlService, private clientsService: ClientsService) { }

  ngOnChanges(): void {
    this.initForm();
    this.GetCategory();
    if (this.clientId !== 0 && this.clientId !== undefined) {
      this.archiveButton = true;
      this.GetClientDetailsById(this.clientId);
    } else {
      this.archiveButton = false;
      // this.CreateClientonAddNew();
      // this.clientDetails = {};
    }
  }

  ngOnInit() {

  }

  CreateClientonAddNew() {
    this.clientDetails = {};
    this.clientsService.EditClient(this.appurl.getApiUrl() + GLOBAL.API_Client_AddEditClient, this.clientDetails)
    .subscribe(result => {
      this.clientDetails = {};
      this.clientDetails = result.data.clientDetailsById;
      this.addClientList.emit(this.clientDetails);
      this.archiveButton = true;
    });
  }

  initForm() {
    this.clientDetailsForm = new FormGroup({
      clientName: new FormControl('', [Validators.required]),
      focalPoint: new FormControl(''),
      position: new FormControl(''),
      phone: new FormControl(''),
      email: new FormControl(''),
      category: new FormControl(''),
      history: new FormControl(''),
      physicialAddress: new FormControl(''),
      clientBackground: new FormControl(''),
    });
    // this.clientDetailsForm.valueChanges
    //   .subscribe(data => this.onValueChanged(data));

    // this.onValueChanged(); // (re)set validation messages now
  }

ResetFormOnAddNewClient() {
  this.clientDetails = {};
  this.clientDetailsForm.reset();
}

  //#region "GetClientDetailsById"
  GetClientDetailsById(clientId: number) {
    this.clientsService.GetClientById(this.appurl.getApiUrl() + GLOBAL.API_Client_GetClientDetails, clientId).subscribe(result => {

      this.clientDetails = result.data.clientDetailsById;
      this.clientDetailsForm = new FormGroup({
        clientName: new FormControl(this.clientDetails.ClientName, [Validators.required]),
        focalPoint: new FormControl(this.clientDetails.FocalPoint),
        position: new FormControl(this.clientDetails.Position),
        phone: new FormControl(this.clientDetails.Phone),
        email: new FormControl(this.clientDetails.Email),
        category: new FormControl(this.clientDetails.CategoryId),
        history: new FormControl(this.clientDetails.History),
        physicialAddress: new FormControl(this.clientDetails.PhysicialAddress),
        clientBackground: new FormControl(this.clientDetails.ClientBackground),
      });
      this.clientDetails = result.data.clientDetailsById;
      this.selectedclientId = this.clientDetails.ClientId;
    });
  }
  //#endregion

  //#region "GetCategory"
  GetCategory() {
    // tslint:disable-next-line:max-line-length
    this.clientsService.GetCategory(this.appurl.getApiUrl() + GLOBAL.API_Client_GetCategory).subscribe(result => {
      this.categories = result.data.Categories;
    });
  }
  //#endregion

  //#region "DeleteClient"
  DeleteClient(id) {
    this.clientsService.DeleteClient(this.appurl.getApiUrl() + GLOBAL.API_Client_DeleteClient, id).subscribe(result => {
      this.deleteClient.emit({ id: id });
    });
  }
  //#endregion

  onChange(ev, data) {
    // console.log( this.clientDetailsForm.value.focalPoint.v);
    if (ev === 'clientName') {
      this.clientDetails.ClientName = data;
    }
    if (ev === 'category') {
      this.clientDetails.CategoryId = data;
    }
    if (ev === 'clientBackground') {
      this.clientDetails.ClientBackground = data;
    }
    if (ev === 'email') {
      this.clientDetails.Email = data;
    }
    if (ev === 'focalPoint') {
      this.clientDetails.FocalPoint = data;
    }
    if (ev === 'history') {
      this.clientDetails.History = data;
    }
    if (ev === 'phone') {
      this.clientDetails.Phone = data;
    }
    if (ev === 'physicialAddress') {
      this.clientDetails.PhysicialAddress = data;
    }
    if (ev === 'position') {
      this.clientDetails.Position = data;
    }
    this.onValueChanged();
    if (this.clientDetailsForm.value.clientName === '' || this.clientDetailsForm.value.clientName === undefined) {
      this.validateForm = false;
    } else {
      if (this.clientDetails.ClientId === 0 || this.clientDetails.ClientId === undefined || this.clientDetails.ClientId === null) {
        this.AddNewClient();
      } else {
        this.EditClient();
      }
    }
  }

  AddNewClient() {
    this.clientsService.EditClient(this.appurl.getApiUrl() + GLOBAL.API_Client_AddEditClient, this.clientDetails)
      .subscribe(result => {
        this.clientDetails = {};

        this.clientDetails = result.data.clientDetailsById;
        this.addClientList.emit(this.clientDetails);
        this.archiveButton = true;
      });
  }
  EditClient() {
    this.clientsService.EditClient(this.appurl.getApiUrl() + GLOBAL.API_Client_AddEditClient, this.clientDetails)
      .subscribe(result => {
        this.clientDetails = {};

        this.clientDetails = result.data.clientDetailsById;
        this.updateClientList.emit(this.clientDetails);
      });
  }



  //#region "emit"
  onHideDetailPanel() {
    this.hideDetailPanel.emit();
  }
  //#endregion
  getErrorMessage() {
    return this.clientDetailsForm.clientName.hasError('required') ? 'You must enter a value' : '';
  }
  onValueChanged(data?: any) {

    if (!this.clientDetailsForm) { return; }
    const form = this.clientDetailsForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  DisplayFirstEntryOfFilteredList(data) {
    this.clientDetailsForm = new FormGroup({
      clientName: new FormControl(data.ClientName),
      focalPoint: new FormControl(data.FocalPoint),
      position: new FormControl(data.Position),
      phone: new FormControl(data.Phone),
      email: new FormControl(data.Email),
      category: new FormControl(data.CategoryId),
      history: new FormControl(data.History),
      physicialAddress: new FormControl(data.PhysicialAddress),
      clientBackground: new FormControl(data.ClientBackground),
    });
  }


}
