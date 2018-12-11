import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GLOBAL } from 'src/app/shared/global';
import { AppUrlService } from 'src/app/shared/services/app-url.service';
import { ProjectListService } from '../service/project-list.service';
import { UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { ProposalDocModel, CurrencyModel, UserListModel } from '../project-details/models/project-details.model';
import { TooltipPosition } from '@angular/material';

import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-proposal',
  templateUrl: './proposal.component.html',
  styleUrls: ['./proposal.component.scss']
})
export class ProposalComponent implements OnInit {
  Projectid: string;
  public files: UploadFile[] = [];
  ProposalWebLink: string;
  EDIFileWebLink: string;
  BudgetFileWebLink: string;
  ConceptFileWebLink: string;
  PresentationFileWebLink: string;
  ProposalStartDate: any;
  ProposalExtType: string;
  EDIFileExtType: string;
  BudgetFileExtType: string;
  ConceptFileExtType: string;
  PresentationExtType: string;
  ProposalBudget: any;
  ProposalDueDate: any;
  ProjectAssignTo: string;
  Currency:string;
  IsProposalAccept: boolean;
  ProposalModel: ProposalDocModel;
  Isproposaltrue: boolean = false;
  CurrencyList: CurrencyModel[];
  UserList: UserListModel[]
  constructor(private routeActive: ActivatedRoute,
    private appurl: AppUrlService,
    public projectListService: ProjectListService) { }

  ngOnInit() {
    this.Projectid = this.routeActive.snapshot.paramMap.get('id');
    this.GetAllUserList();
    //this.GetProposal(this.Projectid);
    this.initProposalDocModel();
    this.GetAllCurrency();

  }

  initProposalDocModel() {
    this.ProposalModel = {
      ProjectId: parseInt(this.Projectid),
      ProposalStartDate: null,
      ProposalBudget: null,
      ProposalDueDate: null,
      ProjectAssignTo: 0,
      IsProposalAccept: false,
      CurrencyId:0
    }
  }
  positionOptions: TooltipPosition[] = ['above'];
  position = new FormControl(this.positionOptions[0]);
  GetProposal(Projectid) {
    let Id = Projectid;
    this.Isproposaltrue = false;
    let ProposalModel: ProposalDocModel = {};
   // ProposalModel.UserId=this.UserList.find(x => x.Username ===this.ProjectAssignTo).UserID;
   // ProposalModel.CurrencyId=this.CurrencyList.find(x => x.CurrencyCode ===this.Currency).CurrencyId;
    this.projectListService.GetProjectproposalById(this.appurl.getApiUrl() + GLOBAL.API_Project_GetProjectproposalsById, Id)
      .subscribe(
        (data) => {
          if (data != null) {
            if (data.StatusCode == 200) {
              if (data.data.ProjectProposalDetail != null) {
                this.ProposalWebLink = data.data.ProjectProposalDetail.ProposalWebLink;
                this.EDIFileWebLink = data.data.ProjectProposalDetail.EDIFileWebLink;
                this.BudgetFileWebLink = data.data.ProjectProposalDetail.BudgetFileWebLink;
                this.ConceptFileWebLink = data.data.ProjectProposalDetail.ConceptFileWebLink;
                this.PresentationFileWebLink = data.data.ProjectProposalDetail.PresentationFileWebLink;
                this.ProposalStartDate = data.data.ProjectProposalDetail.CreatedDate == null ? null : data.data.ProjectProposalDetail.CreatedDate;
                this.EDIFileExtType = data.data.ProjectProposalDetail.EDIFileExtType == null ? data.data.ProjectProposalDetail.EDIFileExtType : data.data.ProjectProposalDetail.EDIFileExtType.trim();
                this.BudgetFileExtType = data.data.ProjectProposalDetail.BudgetFileExtType == null ? data.data.ProjectProposalDetail.BudgetFileExtType : data.data.ProjectProposalDetail.BudgetFileExtType.trim();
                this.ConceptFileExtType = data.data.ProjectProposalDetail.ConceptFileExtType == null ? data.data.ProjectProposalDetail.ConceptFileExtType : data.data.ProjectProposalDetail.ConceptFileExtType.trim();
                this.PresentationExtType = data.data.ProjectProposalDetail.PresentationExtType == null ? data.data.ProjectProposalDetail.PresentationExtType : data.data.ProjectProposalDetail.PresentationExtType.trim();
                this.ProposalModel.ProposalDueDate = data.data.ProjectProposalDetail.ProposalDueDate;
                this.ProposalModel.ProposalBudget = data.data.ProjectProposalDetail.ProposalBudget;
                this.ProjectAssignTo = this.UserList.find(x => x.UserID === data.data.ProjectProposalDetail.UserId).Username; //data.data.ProjectProposalDetail.UserId;
                this.ProposalModel.UserId=data.data.ProjectProposalDetail.UserId;
                this.IsProposalAccept = data.data.ProjectProposalDetail.IsProposalAccept == null ? false : data.data.ProjectProposalDetail.IsProposalAccept;
                this.Currency=this.CurrencyList.find(x => x.CurrencyId === data.data.ProjectProposalDetail.CurrencyId).CurrencyCode;
                this.ProposalModel.CurrencyId=data.data.ProjectProposalDetail.CurrencyId;
                if (this.ProposalWebLink != null && this.EDIFileWebLink != null && this.BudgetFileWebLink != null &&
                  this.ConceptFileWebLink != null && this.PresentationFileWebLink != null
                  //&& this.ProposalModel.ProposalDueDate!=null && this.ProposalModel.ProposalStartDate!=null
                ) {
                  this.Isproposaltrue = true;
                }
              }
            }
          }
          else if (data.StatusCode == 4440) {

          }
        });
  }

  StartProposal() {
    let Id = parseInt(this.Projectid)
    this.projectListService.CreateProjectproposal(this.appurl.getApiUrl() + GLOBAL.API_Project_AddEditProjectproposals, Id)
      .subscribe(
        (data) => {
          if (data != null) {
            if (data.data.ProjectProposalModel != null) {
              if (data.data.ProjectProposalModel.ProposalWebLink != null) {
                this.ProposalWebLink = data.data.ProjectProposalModel.ProposalWebLink;
                window.open(data.data.ProjectProposalModel.ProposalWebLink, '_blank');
                this.GetProposal(this.Projectid);
              }
            }
          }
        });
  }
  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }
  public dropped(event: UploadEvent, data: any) {
    this.files = event.files;
    for (const droppedFile of event.files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log(droppedFile.relativePath, file);
          // You could upload it like this:
          const formData = new FormData()
          let path = droppedFile.relativePath + "_" + parseInt(this.Projectid) + "_" + data;
          let Id = parseInt(this.Projectid)
          formData.append('File', file, path);
          this.projectListService.uploadEDIFile(this.appurl.getApiUrl() + GLOBAL.API_Project_UploadEDIProposalFile, Id, formData)
            .subscribe(
              (data) => {
                if (data.StatusCode == 200) {
                  this.GetProposal(this.Projectid);
                }
              });
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }
  ProposalDetailsChange(ev, data: any) {
    
    let Id = parseInt(this.Projectid);
    let ProposalModel: ProposalDocModel = {};
    ProposalModel = {
      ProjectId: Id
    };
    if (data != null && data != "" && data != undefined) {
      if (ev == 'proposalStartDate') {
        this.ProposalModel.ProposalStartDate = data != null ? this.setDateTime(data) : null;
        this.AddEditProjectProposal(this.ProposalModel);
      }
      if (ev == 'dueDate') {
        this.ProposalModel.ProposalDueDate = data != null ? this.setDateTime(data) : null;
        this.AddEditProjectProposal(this.ProposalModel);
      }
      if (ev == 'proposalAccept') {
        this.ProposalModel.IsProposalAccept = data;
        this.AddEditProjectProposal(this.ProposalModel);
      }
      if (ev == 'proposalBudget') {
        this.ProposalModel.ProposalBudget = data;
        this.AddEditProjectProposal(this.ProposalModel);
      }
      if (ev == 'Currency') {
        this.ProposalModel.CurrencyId = this.CurrencyList.find(x => x.CurrencyCode.toUpperCase() === data.toUpperCase()).CurrencyId;

        this.AddEditProjectProposal(this.ProposalModel);
      }
      if (ev == 'Assigned') {
        this.ProposalModel.UserId = data;// this.UserList.find(x => x.UserID.toUpperCase() === data.toUpperCase()).CurrencyId;

        this.AddEditProjectProposal(this.ProposalModel);
      }
    }
  }
  //#region  add/edit other project 
  AddEditProjectProposal(model: any) {
    let ProposalDocModel: ProposalDocModel = {
      ProposalStartDate: model.ProposalStartDate,
      ProjectId: model.ProjectId,
      ProposalBudget: model.ProposalBudget,
      ProposalDueDate: model.ProposalDueDate,
      ProjectAssignTo: model.ProjectAssignTo,
      IsProposalAccept: model.IsProposalAccept,
      CurrencyId: model.CurrencyId,
      UserId: model.UserId
    }
    console.log(ProposalDocModel);
    this.projectListService.AddEditProjectProposalDetail(this.appurl.getApiUrl() + GLOBAL.API_Project_AddEditProjectProposalDetail, ProposalDocModel)
      .subscribe(
        (response) => {
          if (response.StatusCode == 200) {
            this.GetProposal(model.ProjectId);
            //this.projectotherDetail.ProjectOtherDetailId = response.CommonId.Id;
            // let projectname = this.projectDetail.ProjectName;
            // let projectDes = this.projectDetail.ProjectDescription;
            // this.snackBar.open("Project other Details Added Successfully!!!", "action", {
            //   duration: 2000,               
            // });

          }
        }
      )
  }
  //#endregion
  setDateTime(data): any {
    return new Date(new Date(data).getFullYear(), new Date(data).getMonth(), new Date(data).getDate(), new Date().getHours(), new Date().getMinutes(), new Date().getSeconds());
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  GetAllCurrency() {
    this.CurrencyList = [];
    this.projectListService.GetAllCurrency(this.appurl.getApiUrl() + GLOBAL.API_code_GetAllCurrency)
      .subscribe(
        (data) => {
          if (data != null) {
            if (data.data.CurrencyList != null) {
              data.data.CurrencyList.forEach(element => {
                this.CurrencyList.push({
                  CurrencyId: element.CurrencyId,
                  CurrencyCode: element.CurrencyCode
                });
              });
            }
          }
        });
  }

  GetAllUserList() {
    this.UserList = [];
    this.projectListService.GetAllUserList(this.appurl.getApiUrl() + GLOBAL.API_Account_GetAllUserDetails)
      .subscribe(
        (data) => {
          if (data != null) {
            if (data.data.UserDetailsList != null) {
              data.data.UserDetailsList.forEach(element => {
                this.UserList.push({
                  UserID: element.UserID,
                  Username: element.FirstName + ' ' + element.LastName
                });

                this.GetProposal(this.Projectid);
              });
            }
          }
        });
  }
}
