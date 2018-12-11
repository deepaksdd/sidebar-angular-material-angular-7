import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import {
  ProjectDetailModel,
  ApproveProjectDetailModel,
  WinApprovalDetailModel
} from './models/project-details.model';
import { Store } from '@ngrx/store';
import { ProjectListService } from '../service/project-list.service';
import { GLOBAL } from 'src/app/shared/global';
import { AppUrlService } from 'src/app/shared/services/app-url.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { DonorMasterComponent } from '../donor-master/donor-master.component';
import { ProgramAreaSectorComponent } from './program-area-sector/program-area-sector.component';
import { stringify } from '@angular/core/src/util';
import { DebugRenderer2 } from '@angular/core/src/view/services';
import { UIModuleHeaders } from '../../../../shared/enum';
// import { ProjectManagementState } from '../../shared/prioject-management.state';
// import * as actions from '../state-manager/actions/project-list.actions';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  //#region "Variables"

  setSelectedHeader = UIModuleHeaders.ProjectModuleDetail;
  setProjectHeader: string;

  projectName = 'Projetc Name';
  currentProjectId: number;
  projectDetail: ProjectDetailModel;
  approvalDetail: ApproveProjectDetailModel;
  winapprovalDetail: WinApprovalDetailModel;
  projectDet: Observable<ProjectDetailModel>;
  service: Subscription;
  assignToBlueclicked = false;
  assignToUsershow = true;
  openProposalcompcheck = false;
  completeProp = true;
  projectId: any;
  assignedTowin = true;
  assignedTowinBlue = false;
  winProjectFlag = false;
  completePropIsAprove: boolean;
  // hide: boolean;
  // val = 'ppp'
  //#endregion

  //#region Input output variable
  @Input() ProjectId = this.routeActive.snapshot.paramMap.get('id');
  //#endregion

  // val = 'ppp'
  //#endregion
  constructor(
    private routeActive: ActivatedRoute,
    private route: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public projectListService: ProjectListService,
    private appurl: AppUrlService,
    public router: Router
  ) {}

  ngOnInit() {
    this.initProjectDetail();
    this.initApprovalDetail();
    this.initWinApprovalDetail();
    // var gh= this.store.select('projectDetail');

    // this.projectDet = this.route.paramMap.pipe(

    //   switchMap(params => {
    //     // (+) before `params.get()` turns the string into a number
    //     this.currentProjectId = + params.get('id');
    //     return this.projectListService.GetProjectDetailsByProjectId(this.appurl.getApiUrl() +
    // GLOBAL.API_Project_GetProjectListById, this.currentProjectId);
    //   })
    // );
    const id = this.routeActive.snapshot.paramMap.get('id');
    this.projectId = id;
    this.GetProjectDetail(+id);
    // this.ProjectId=id;
  }

  //#region initilize models
  initProjectDetail() {
    this.projectDetail = {
      ProjectId: 0,
      ProjectCode: null,
      ProjectName: null,
      StartData: null,
      EndDate: null,
      ProjectPhaseDetailsId: null,
      IsProposalComplate: null,
      IsApproved: null,
      IsWin: null,
      TotalDaysinHours: null,
      ProjectPhase: null,
      ProjectDescription: null
    };
  }

  initApprovalDetail() {
    this.approvalDetail = {
      ProjectId: 0,
      CommentText: null,
      FileName: null,
      FilePath: null,
      IsApproved: false
    };
  }

  initWinApprovalDetail() {
    this.winapprovalDetail = {
      ProjectId: 0,
      CommentText: null,
      FileName: null,
      FilePath: null,
      IsWin: false
    };
  }

  //#endregion

  //#endregion "addNewProject"
  // addNewDonor(data:number) {
  //   this.projectListService.onShowHideHeader(false);
  //   this.router.navigate(['/donormaster', data]);
  // }
  //#endregion

  //#region open popup for add new donor
  addNewDonor() {
    const dialogRef = this.dialog.open(DonorMasterComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  //#endregion

  //#region
  openFormModal(value) {
    const dialogRef = this.dialog.open(ProgramAreaSectorComponent, {
      height: '600px',
      width: '1000px',
      data: { id: this.ProjectId }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  // endregion

  //#region Get project details by  project id

  GetProjectDetail(projectId: number) {
    setTimeout(() => {
      this.projectListService
        .GetProjectDetailsByProjectId(
          this.appurl.getApiUrl() + GLOBAL.API_Project_GetProjectListById,
          projectId
        )
        .subscribe(data => {
          if (data != null) {
            if (data.data.ProjectDetailModel1 != null) {
              this.projectDetail = data.data.ProjectDetailModel1;
              this.completePropIsAprove = this.projectDetail.IsApproved;
              if (this.completePropIsAprove === false) {
                this.completeProp = true;
              } else if (this.completePropIsAprove === true) {
                this.completeProp = false;
              }

              // set header Name
              this.setProjectHeader = this.projectDetail.ProjectName;
            }
          }
        });
    }, 1000);
  }

  //#endregion

  //#region to add name of the project
  onNameChange(ev, data: any) {
    const projectDetail: ProjectDetailModel = {
      ProjectId: this.projectDetail.ProjectId
    };
    if (data != null && data !== '' && data !== undefined) {
      if (ev.srcElement.name === 'projectName') {
        this.projectDetail.ProjectName = data;
      }
      if (ev.srcElement.name === 'projectDescription') {
        this.projectDetail.ProjectDescription = data;
      }

      // this.snackBar.open(data, 'close', {
      //   duration: 2000,
      // });
      // this.service  =
      this.projectListService
        .AddProjectDetail(
          this.appurl.getApiUrl() + GLOBAL.API_Project_AddEditProjectDetail,
          this.projectDetail
        )
        .subscribe(response => {
          if (response.StatusCode === 200) {
            this.projectDetail.ProjectId = response.CommonId.Id;
            const projectname = this.projectDetail.ProjectName;
            const projectDes = this.projectDetail.ProjectDescription;
            // this.snackBar.open("Project Details Added Successfully!!!", "action", {
            //   duration: 2000,

            // });
            // latestProjectId=this.projectDetail.ProjectId
            this.GetProjectDetail(this.projectDetail.ProjectId);

            // if (projectname != null && projectDes != null) {
            // this.router.navigate(['projects']);

            // }
          }
        });
    }
    // to unsbscribe the the service code
    // this.service.unsubscribe();
  }

  //#endregion

  //#region "backToProject"
  backToProject() {
    this.route.navigate(['/projects']);
    this.projectListService.onShowHideHeader(true);
  }
  //#endregion
  // for destroy service
  // ngOnDestroy(): void {
  //   this.service.unsubscribe();
  // }

  //#region check proposal hide and show div
  checkProposal() {
    this.assignToBlueclicked = true;
    this.assignToUsershow = false;
    this.completeProp = false;

    // this.hide=false
  }
  // endregion

  //#region check proposal hide and show div
  openPropsalComponent() {
    this.openProposalcompcheck = true;
  }

  openPropsalWinComponent() {
    this.openProposalcompcheck = true;
    this.winProjectFlag = true;
  }

  //#endregion

  //#region add approval and reject
  OnapprovelAdd(data) {
    if (data != null && data !== '' && data !== undefined) {
      if (this.projectDetail.ProjectId > 0) {
        this.approvalDetail.ProjectId = this.projectDetail.ProjectId;
        this.approvalDetail.CommentText = data.text.CommentText;
        this.approvalDetail.IsApproved = data.tr;
      }
      this.projectListService
        .AddProjectApprovalDetail(
          this.appurl.getApiUrl() + GLOBAL.API_Project_AddApprovalProjectDetail,
          this.approvalDetail
        )
        .subscribe(response => {
          if (response.StatusCode === 200) {
            // this.snackBar.open("Project approved  Successfully!!!", "action", {
            // duration: 2000,
            this.approvalDetail.IsApproved = response.CommonId.IsApproved;
            if (this.approvalDetail.IsApproved === true) {
              this.assignedTowin = false;
              this.assignedTowinBlue = true;
              this.assignToUsershow = true;
              this.assignToBlueclicked = false;
              this.openProposalcompcheck = false;
            } else if (this.approvalDetail.IsApproved === false) {
              this.openProposalcompcheck = false;
            }

            // if (projectname != null && projectDes != null) {
            // this.router.navigate(['projects']);

            // }
          }
        });
    }
  }
  //#endregion

  //#region  on approval win and loss
  OnWinApproval(data) {
    if (data != null && data !== '' && data !== undefined) {
      if (this.projectDetail.ProjectId > 0) {
        this.winapprovalDetail.ProjectId = this.projectDetail.ProjectId;
        this.winapprovalDetail.CommentText = data.text.CommentText;
        this.winapprovalDetail.IsWin = data.tr;
      }
      this.projectListService
        .WinProjectApprovalDetail(
          this.appurl.getApiUrl() + GLOBAL.API_Project_WinApprovalProjectDetail,
          this.winapprovalDetail
        )
        .subscribe(response => {
          if (response.StatusCode === 200) {
            // this.snackBar.open("Project approved  Successfully!!!", "action", {
            // duration: 2000,
            this.winapprovalDetail.IsWin = response.CommonId.IsApproved;
            if (this.winapprovalDetail.IsWin === true) {
              this.assignedTowin = true;
              this.assignedTowinBlue = false;
              this.assignToUsershow = true;
              //  this.assignToBlueclicked = true;
              this.openProposalcompcheck = false;
            } else if (this.winapprovalDetail.IsWin === false) {
              this.openProposalcompcheck = false;
            }
            // if (projectname != null && projectDes != null) {
            // this.router.navigate(['projects']);

            // }
          }
        });
    }
  }

  //#endregion
}
