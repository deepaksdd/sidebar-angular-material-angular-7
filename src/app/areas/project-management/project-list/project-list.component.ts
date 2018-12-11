import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ProjectListService } from './service/project-list.service';
import { AppUrlService } from 'src/app/shared/services/app-url.service';
import { GLOBAL } from 'src/app/shared/global';
import { UIModuleHeaders } from '../../../shared/enum';
// import * as state from '../shared/prioject-management.state';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {


  setSelectedHeader = UIModuleHeaders.ProjectModule;
  setProjectHeader = 'PROJECTS';

  Showaddproject = true;
  hideproject = false;
  projectList: any[];
  ProjectDescription: string;

  constructor(
    public router: Router,
    public snackBar: MatSnackBar,
    public projectListService: ProjectListService,
    private appurl: AppUrlService,
    // private store: Store<state.ProjectManagementState>
  ) { }



  ngOnInit() {
    this.getAllProjectList();
  }


  //#region "getAllProjectList"
  getAllProjectList() {
    this.projectList = [];
    this.projectListService.GetProjectDetails(this.appurl.getApiUrl() + GLOBAL.API_Project_GetAllProjectList).subscribe(
      (data) => {
        if (data.data.ProjectDetailModel.length > 0 && data.StatusCode === 200) {
          data.data.ProjectDetailModel.forEach(element => {
            this.projectList.push({
              ProjectId: element.ProjectId,
              ProjectName: element.ProjectName,
              ProjectPhase: element.ProjectPhase,
              TotalDaysinHours: element.TotalDaysinHours,
              ProjectCode: element.ProjectCode,
              ProjectDescription: element.ProjectDescription
            });
          });
        }
      });
    // this.projectList = this.store.select(state => state.projectList);
  }
  //#endregion


  //#endregion "addNewProject"
  addNewProject(data: number) {
    this.projectListService.onShowHideHeader(false);
    this.router.navigate(['/project', data]);
  }
  //#endregion


  onProjectClicked(e) {
    this.projectListService.onShowHideHeader(false);
    this.snackBar.open(e.ProjectCode + ' ' + e.ProjectName + ' ' + e.hours, 'Cancel', {
      duration: 2000,
    });
  }
  addproject() {
    this.Showaddproject = false;
  }
  backlistproject() {
    this.Showaddproject = true;
  }

}

