import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProjectListService } from '../service/project-list.service';
import { AppUrlService } from 'src/app/shared/services/app-url.service';
import { GLOBAL } from 'src/app/shared/global';
import { MatDialog, MatButtonModule, MatInputModule } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DonorDetailModel } from './Models/donar-detail.model';
import { Subscription } from 'rxjs';
import { auditTime } from 'rxjs/operators';
//import { ServerRequest } from 'http';
@Component({
  selector: 'app-donor-master',
  templateUrl: './donor-master.component.html',
  styleUrls: ['./donor-master.component.scss']
})

export class DonorMasterComponent implements OnInit {
  //#region 
  [x: string]: any;
  projectList: any[];
  donarDetail: DonorDetailModel;
  seletedDonorId: number;
  flag: boolean = false;
  pageLoad: boolean = false;
  DonarIds: string;
  service: Subscription;
  donorForm: FormGroup;
  donorList: any[];
  private alive: boolean;
  subscription = new Subscription;
  //#endregion

  //#region Input/Output emit

  @Input() routeId: string;
  @Output() onDeleted = new EventEmitter();

  //#endregion
  //#region Constructor
  constructor(public router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private routeActive: ActivatedRoute,
    public projectListService: ProjectListService,
    private appurl: AppUrlService, ) {
    this.donorForm = this.fb.group({
      'DonorId': '',
      'Name': ['', Validators.required],
      'ContactDesignation': ['', Validators.required],
      'ContactPerson': ['', Validators.required],
      'ContactPersonEmail': ['', [Validators.required, Validators.email]],
      'ContactPersonCell': ['', Validators.required],
    });
    this.donorForm.valueChanges.pipe(auditTime(10000)).subscribe(formData => {
      if (this.pageLoad == true) {
        this.onSubmitDonarDetail(formData, true);
      }
      this.pageLoad = true;
    });
  }
  //#endregion

  ngOnInit() {
    this.alive = true;
    this.seletedDonorId = +this.routeId;
    if (this.seletedDonorId != null && this.seletedDonorId != undefined) {
    }
    else {
      this.formReset();
    }
    //let id = this.routeActive.snapshot.paramMap.get('id');
    this.GetDonarDetailById(+this.seletedDonorId);

    //this.getAllDonorList();    
  }

  //#region "getAllDonorList"
  getAllDonorList() {
    this.donorList = [];
    this.projectListService.GetAllDonorList(this.appurl.getApiUrl() + GLOBAL.API_Project_GetAllDonorList).subscribe(
      (data) => {
        if (data.data.DonorDetail.length > 0 && data.StatusCode == 200) {
          data.data.DonorDetail.forEach(element => {
            this.donorList.push({
              DonorId: element.DonorId,
              Name: element.Name,
              ContactPerson: element.ContactPerson,
              ContactDesignation: element.ContactDesignation,
              ContactPersonEmail: element.ContactPersonEmail,
              ContactPersonCell: element.ContactPersonCell,
            })
          });
        }
      });

  }
  //#endregion

  //  //#region "editdonorDetail"
  //  EditDonorPopup(data:number) {
  //   this.projectListService.onShowHideHeader(false);
  //   this.router.navigate(['/project', data]);
  // }
  // //#endregion

  //#region  method to reset the form values for  both add and edit 
  formReset() {
    this.donorForm.reset();
  }
  //#endregion

  //#region add /edit donorDetail
  onSubmitDonarDetail(data, flag) {

    if (data != null && data != undefined && data != "" && (data.ContactPersonCell != null || data.ContactPersonEmail != null || data.ContactDesignation != null || data.ContactPerson != null || data.Name != null)) {
      var donarDetail: DonorDetailModel = {
        DonorId: this.DonarIds = data.DonorId == "" ? "0" : data.DonorId,
        Name: data.Name,
        ContactPerson: data.ContactPerson,
        ContactDesignation: data.ContactDesignation,
        ContactPersonEmail: data.ContactPersonEmail,
        ContactPersonCell: data.ContactPersonCell
      };

      this.subscription = this.projectListService.AddDonorDetail(this.appurl.getApiUrl() + GLOBAL.API_Project_AddEditDonorDetails, donarDetail)
        .subscribe(
          (response) => {
            if (response.StatusCode == 200) {
              if (data.DonorId > 0) {
                this.snackBar.open("Donar Details updated Successfully!!!", "action", {
                  duration: 2000,

                });
                this.counter = this.counter + 1;
                this.onsubmit.emit({ data });
              }
              else {
                this.donorForm.setValue({
                  DonorId: response.data.DonorDetailById.DonorId,
                  Name: response.data.DonorDetailById.Name,
                  ContactPerson: response.data.DonorDetailById.ContactPerson,
                  ContactDesignation: response.data.DonorDetailById.ContactDesignation,
                  ContactPersonEmail: response.data.DonorDetailById.ContactPersonEmail,
                  ContactPersonCell: response.data.DonorDetailById.ContactPersonCell,
                });
                this.snackBar.open("Donar Details Added Successfully!!!", "action", {
                  duration: 2000,
                });
                this.counter = this.counter + 1;
                this.onsubmit.emit({ data });
              }
              if (flag == false) {
                this.donorForm.reset();
              } else {
                // if(data.DonorId>0){
                // this.snackBar.open("Donar Details Added Successfully!!!", "action", {        
                //   duration: 2000,
                //   });
                // }else{
                //   this.snackBar.open("Donar Details Updated Successfully!!!", "action", {        
                //     duration: 2000,
                //     });
                // }
              }
            }
            //  this.counter = this.counter + 1;
            // this.onsubmit.emit(this.counter)
          }
        )
    }

  }
  //#endregion

  //#region Get Donar Detailby id
  GetDonarDetailById(donarId: number) {
    this.donarlist = [];
    if (donarId != null && donarId != undefined && donarId != 0) {
      this.projectListService.GetDonarDetailsByDonarId(this.appurl.getApiUrl() + GLOBAL.API_Project_GetDonarListById, donarId)
        .subscribe(
          (data) => {
            if (data != null) {
              if (data.data.DonorDetailById != null) {
                this.donorForm.setValue({
                  DonorId: data.data.DonorDetailById.DonorId,
                  Name: data.data.DonorDetailById.Name,
                  ContactPerson: data.data.DonorDetailById.ContactPerson,
                  ContactDesignation: data.data.DonorDetailById.ContactDesignation,
                  ContactPersonEmail: data.data.DonorDetailById.ContactPersonEmail,
                  ContactPersonCell: data.data.DonorDetailById.ContactPersonCell,
                });
              }

            }

          })
    }
  }

  //#endregion

  //#region delete donar datail
  DeleteDonarById() {
    this.unSubscribeAddDonor();
    this.onDeleted.emit(this.seletedDonorId);

    if (this.seletedDonorId != null && this.seletedDonorId != undefined && this.seletedDonorId != 0) {
      this.projectListService.DeleteDonorDetail(this.appurl.getApiUrl() + GLOBAL.API_Project_DeleteDonorDetails, this.seletedDonorId)
        .subscribe(
          (response) => {
            if (response.StatusCode == 200) {
              this.snackBar.open("Donar Details Deleted Successfully!!!", "action", {
                duration: 2000,
              });
              this.formReset();
              // this.onDeleted.emit(this.seletedDonorId);
              // this.getAllDonorList();
            }
          }
        )
    }
  }

  //#endregion

  //#region edit donor form not needed
  donorEditFormSubmit(model) {
    var obj: any = {};
    this.DonorId = this.data.DonorDetailById.DonorId;
    var editDonor: DonorDetailModel = {
      Name: model.Name,
      ContactPerson: model.ContactPerson,
      ContactDesignation: model.ContactDesignation,
      ContactPersonEmail: model.ContactPersonEmail,
      ContactPersonCell: model.ContactPersonCell
    };

    this.projectListService.EditDonorDetail(this.setting.getBaseUrl() + GLOBAL.API_Project_EditDonorDetails, editDonor).subscribe(
      data => {
        if (data.StatusCode == 200) //Success
        {
          this.toastr.success("Donor Updated Successfully!!!");
          this.getAllDonorList();
        }
        else {
          this.toastr.error("Error!!!");
        }

      },
      error => {
        //error message
      }
    );

  }

  //#endregion
  //#region value change of arrow and onsubmit emitt parent
  @Output() onsubmit = new EventEmitter();
  @Output() valueChange = new EventEmitter();
  @Output() routeValue = new EventEmitter();
  counter = 0;
  valueChanged() {
    this.routeValue = undefined;
    this.counter = this.counter + 1;
    this.valueChange.emit(this.counter);
  }
  //#endregion
  //#region to unsbscribe the onAddsubmitbutton
  unSubscribeAddDonor() {
    this.subscription.unsubscribe();
  }
  //#endregion
  //#region

  //#endregion

}
