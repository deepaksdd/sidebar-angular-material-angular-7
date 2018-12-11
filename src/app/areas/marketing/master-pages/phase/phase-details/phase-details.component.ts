import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { GLOBAL } from 'src/app/shared/global';
import { MasterPageServiceService } from '../../service/master-page-service.service';
import { AppUrlService } from 'src/app/shared/services/app-url.service';
import { PhaseModel } from '../../model/mastrer-pages.model';
import { Validators, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-phase-details',
  templateUrl: './phase-details.component.html',
  styleUrls: ['./phase-details.component.scss']
})
export class PhaseDetailsComponent implements OnInit {
  @Input() phaseId: number;
  @Output() hideDetailPanel = new EventEmitter<any>();
  @Output() deletePhase = new EventEmitter<any>();
  @Output() addPhase = new EventEmitter<any>();
  @Output() updatePhase = new EventEmitter<any>();
  phaseDetailsForm;
  archiveButton = false;
  phaseDetail: PhaseModel = {};
  constructor(private phaseService: MasterPageServiceService, private appurl: AppUrlService) { }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(): void {
    this.initForm();
    // this.GetCategory();
    if (this.phaseId !== 0 && this.phaseId !== undefined) {
      this.archiveButton = true;
      this.GetPhaseById(this.phaseId);
    } else {
      this.archiveButton = false;
    }
  }

  initForm() {
    this.phaseDetailsForm = new FormGroup({
      phaseName: new FormControl('', [Validators.required])
    });
  }

  ResetFormOnAddNewPhase() {
    this.phaseDetail = {};
    this.phaseDetailsForm.reset();
    this.phaseId = 0;
  }

  ngOnInit() {
  }

  GetPhaseById(id) {
    // tslint:disable-next-line:max-line-length
    this.phaseService.GetPhaseById(this.appurl.getApiUrl() + GLOBAL.API_Job_GetPhaseById, id).subscribe(result => {
      this.phaseDetail = result.data.phaseById;
      this.phaseDetailsForm = new FormGroup({
        phaseName: new FormControl(this.phaseDetail.Phase, [Validators.required])
      });
    });
  }

  onChange(value) {
    this.phaseDetail.Phase = value;
    if (this.phaseId === 0 || this.phaseId === undefined || this.phaseId === null) {
      this.CreatePhase();
    } else {
      this.EditPhase();
    }
  }

  CreatePhase() {
    // tslint:disable-next-line:max-line-length
    this.phaseService.AddPhase(this.appurl.getApiUrl() + GLOBAL.API_Job_AddPhase, this.phaseDetail).subscribe(result => {
      this.phaseDetail = result.data.phaseById;
      this.phaseId =  result.data.phaseById.JobPhaseId;
      this.addPhase.emit(this.phaseDetail);
      this.archiveButton = true;
    });
  }

  EditPhase() {
    // tslint:disable-next-line:max-line-length
    this.phaseService.AddPhase(this.appurl.getApiUrl() + GLOBAL.API_Job_AddPhase, this.phaseDetail).subscribe(result => {
      this.phaseDetail = result.data.phaseById;
      this.updatePhase.emit(this.phaseDetail);
    });
  }

  //#region "emit"
  onHideDetailPanel() {
    this.hideDetailPanel.emit();
  }
  //#endregion

  DeletePhase(id) {
    // tslint:disable-next-line:max-line-length
    this.phaseService.DeletePhase(this.appurl.getApiUrl() + GLOBAL.API_Job_DeletePhase, id).subscribe(result => {
      this.deletePhase.emit({ id: id });
      this.phaseDetail = {};
      this.phaseId = 0;
    });
  }
}
