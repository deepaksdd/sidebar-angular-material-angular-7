import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ProjectListService } from '../service/project-list.service';
import { AppUrlService } from 'src/app/shared/services/app-url.service';
import { GLOBAL } from 'src/app/shared/global';
import { DonorMasterComponent } from '../donor-master/donor-master.component';
import { DebugRenderer2 } from '@angular/core/src/view/services';
import { findIndex } from 'rxjs/operators';
import { DonorDetailModel } from '../donor-master/Models/donar-detail.model';
import { UIModuleHeaders } from '../../../../shared/enum';

@Component({
  selector: 'app-donor-master-list',
  templateUrl: './donor-master-list.component.html',
  styleUrls: ['./donor-master-list.component.scss']
})
export class DonorMasterListComponent implements OnInit {

  setSelectedHeader = UIModuleHeaders.ProjectModule;
  setProjectHeader = 'PROJECTS';

  @Output() message: true;
  @ViewChild(DonorMasterComponent) child;
  donorList: any[];
  tottalRecord: number;
  donarlist: any[];
  cols: any[];
  firsts: number = 0;
  donorForm: FormGroup;
  showJobDetail = false;
  colsm6 = 'col-sm-10 col-sm-offset-1';
  routeId: any;
  selectedItem: any;
  DonorDetailModel: DonorDetailModel[];
  constructor(public router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public projectListService: ProjectListService,
    private appurl: AppUrlService) {

  }

  ngOnInit() {
    this.getAllDonorList();


  }

  paginate(event) {
    this.firsts = event.first / event.rows;
  }
  //#region "getAllDonorList"
  getAllDonorList() {
    this.donorList = [];
    this.projectListService.GetAllDonorList(this.appurl.getApiUrl() + GLOBAL.API_Project_GetAllDonorList).subscribe(
      (data) => {
        if (data.data.DonorDetail.length > 0 && data.StatusCode == 200) {
          this.tottalRecord = data.data.DonorDetail.length;
          data.data.DonorDetail.forEach(element => {
            this.donorList.push({
              DonorId: element.DonorId,
              Name: element.Name,
              ContactPerson: element.ContactPerson,
              ContactDesignation: element.ContactDesignation,
              ContactPersonEmail: element.ContactPersonEmail,
              ContactPersonCell: element.ContactPersonCell,
            })
            this.DonorDetailModel = this.donorList;
          });
          this.cols = [
            { field: 'Name', header: 'Donar Name' },
            { field: 'ContactPerson', header: 'Donar Contact Person Name' },
            { field: 'ContactDesignation', header: 'Donar Contact Designation' },
            { field: 'ContactPersonEmail', header: 'Donar Contact Person Email' },
            { field: 'ContactPersonCell', header: 'Donar Contact Person Cell' }
          ];
        }
      });

  }


  //#endregion
  //#region "on click of row data of donor detail list  "
  OnClickDonoRow(id) {
    this.routeId = id;
    if (this.showJobDetail == true) {
      this.child.GetDonarDetailById(this.routeId)
    }
    this.showJobDetail = true;
    this.colsm6 = 'col-sm-6';
    // this.showJobDetail = !this.showJobDetail;
    // this.colsm6 = this.showJobDetail ? 'col-sm-6' : 'col-sm-10 col-sm-offset-1';
    if (this.showJobDetail)
      this.projectListService.onShowHideHeader(false);
    //this.router.navigate(['/donormaster', data]);
    //this.router.navigate(['', '/donormaster/'+data]);

  }
  //#endregion

  //#region on click of add new donor
  onItemClick() {
    this.showJobDetail = true;
    this.routeId = undefined;

    if (this.colsm6 == 'col-sm-6') {
      this.child.formReset();
    }

    this.colsm6 = 'col-sm-6';

    //this.showJobDetail = !this.showJobDetail;
    // : 'col-sm-10 col-sm-offset-1';
    //  if (this.showJobDetail)
    //    this.router.navigate(['', 'donormasterlist']);
    //  else
    //    this.router.navigate(['', 'donormasterlist',this.routeId ]);
  }
  //#endregion

  //#region child to parent event binding on cancel click event
  displayCounter(count) {
    this.showJobDetail = false;
    this.colsm6 = 'col-sm-10 col-sm-offset-1';

  }
  //endregion

  //#region child to parent event binding on submit
  diplayList(obj) {
    for (let i = 0; i < this.DonorDetailModel.length; i++) {
      if (this.DonorDetailModel[i].DonorId == obj.data.DonorId) {
        this.donorList[i] = obj.data
      }
      else {
        // this.getAllDonorList();
        //this.donorList=obj.data
      }
    }
    this.showJobDetail = true;
    if (this.showJobDetail)
      this.colsm6 = 'col-sm-6';

  }
  //#endregion

  //#region "emit" to delete from list
  deletedDonor(id: number) {
    let item = this.donorList.find(x => x.DonorId == id);
    const index = this.donorList.indexOf(item);
    this.donorList.splice(index, 1);
  }
  //#endregion


}

