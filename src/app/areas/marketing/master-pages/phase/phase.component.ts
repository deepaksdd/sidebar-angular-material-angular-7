import { Component, OnInit, ViewChild } from '@angular/core';
import { AppUrlService } from 'src/app/shared/services/app-url.service';
import { GLOBAL } from 'src/app/shared/global';
import {MasterPageServiceService} from '../service/master-page-service.service';
import { PhaseModel } from '../model/mastrer-pages.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PhaseDetailsComponent } from './phase-details/phase-details.component';

@Component({
  selector: 'app-phase',
  templateUrl: './phase.component.html',
  styleUrls: ['./phase.component.scss']
})
export class PhaseComponent implements OnInit {
  phase;
  phaseId;
  showPhaseDetail = false;
  colsm6 = 'col-sm-10 col-sm-offset-1';
  @ViewChild(PhaseDetailsComponent) child: PhaseDetailsComponent;
  constructor(private appurl: AppUrlService, private masterService: MasterPageServiceService) { }

  getPhaseList: PhaseModel[];
  model: PhaseModel = {};

  ngOnInit() {
    this.init();
    this.getPhase();
  }

  init() {
    // this.jobsList = [];
  }

  getPhase() {
    this.getPhaseList = [];
    this.masterService.GetPhases(this.appurl.getApiUrl() + GLOBAL.API_Contract_GetPhase).subscribe(data => {
    this.getPhaseList =  data.data.JobPhases;
    });
  }

  onItemClick(id: number) {
    this.phaseId = id;
    if (this.phaseId === 0 || this.phaseId === undefined || this.phaseId === null) {
      this.child.ResetFormOnAddNewPhase();
    }
    this.showProjectDetailPanel();
  }

  //#region "show/hide"
  showProjectDetailPanel() {
    this.showPhaseDetail = true;
    this.colsm6 = this.showPhaseDetail ? 'col-sm-6' : 'col-sm-10 col-sm-offset-1';
  }

  hideProjectDetailPanel() {
    this.showPhaseDetail = false;
    this.colsm6 = this.showPhaseDetail ? 'col-sm-6' : 'col-sm-10 col-sm-offset-1';
  }
  //#endregion

  //#region "Emit"
  hideDetailPanel(event) {
    this.hideProjectDetailPanel();
  }
  //#endregion

  onPhaseDeleted(id) {
    const index = this.getPhaseList.findIndex(r => r.JobPhaseId === id.id);
    this.getPhaseList.splice(index, 1);
    this.child.ResetFormOnAddNewPhase();
    this.hideProjectDetailPanel();
  }

  addPhaseList(e) {
    this.getPhaseList.push(e);
  }

  updatePhaseList(e) {
    const index = this.getPhaseList.findIndex(r => r.JobPhaseId === e.JobPhaseId);
    if (index !== -1) {
      this.getPhaseList[index] = e;
    }
  }
}
