import { Injectable } from '@angular/core';
import { ProjectDetailModel, ProjectChatModel, ProgramModel, AreaModel, SectorModel, ProjectProgramModel, ProjectAreaModel, ProjectSectorModel, ApproveProjectDetailModel, WinApprovalDetailModel, ProjectOtherDetailModel, ProposalDocModel } from '../project-details/models/project-details.model';
import { GlobalService } from '../../../../shared/services/global-services.service';
import { Http, Headers, Response, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { DonorDetailModel } from '../donor-master/Models/donar-detail.model';
@Injectable({
  providedIn: 'root'
})
export class ProjectListService {



  showHideHeader = false;

  constructor(private globalService: GlobalService) { }

  //#region "AddProjectDetail" 
  AddProjectDetail(url: string, data: ProjectDetailModel) {
    return this.globalService.post(url, data);
  };
  //#endregion

  //#region "AddProjectChat" 
  AddProjectChat(url: string, data: ProjectChatModel) {
    return this.globalService.post(url, data);
  };
  //#endregion
  //#region "GetChatByProjectId" 
  GetChatByProjectId(url: string, id: number) {
    return this.globalService.getListById(url, id);
  };
  //#endregion

  GetProjectDetails(url: string) {
    return this.globalService.getList(url);
  }

  GetProjectDetailsByProjectId(url: string, id: number) {
    return this.globalService.getListById(url, id);
  }

  //#region  show/Hide
  onShowHideHeader(flag: boolean) {
    this.showHideHeader = flag;
  }
  //#endregion
  //#region Donor master 
  AddDonorDetail(url: string, data: DonorDetailModel) {
    return this.globalService.post(url, data);
  };
  GetAllDonorList(url: string) {
    return this.globalService.getList(url);
  }
  GetDonarDetailsByDonarId(url: string, id: number) {
    return this.globalService.getListById(url, id);
  }
  DeleteDonorDetail(url: string, id: number) {
    return this.globalService.post(url, id);
  };
  EditDonorDetail(url: string, data: DonorDetailModel) {
    return this.globalService.post(url, data)
  }
  //#endregion

  //#region 
  GetAllSectorList(url: string) {
    return this.globalService.getList(url);
  }


  GetAllAreaList(url: string) {
    return this.globalService.getList(url);
  }
  GetAllProgramList(url: string) {
    return this.globalService.getList(url);
  }
  //endregion
  //#region "AddProgramDetail" 
  AddProgramDetail(url: string, data: ProgramModel) {
    return this.globalService.post(url, data);
  };
  //#endregion
  //#region "AddAreaDetail" 
  AddAreaDetail(url: string, data: AreaModel) {
    return this.globalService.post(url, data);
  };
  //#endregion
  //#region "AddSectorDetail" 
  AddSectorDetail(url: string, data: SectorModel) {
    return this.globalService.post(url, data);
  };
  //#endregion
  //#region "AddeditSelectProjectProgramvalue" 
  AddeditSelectProjectProgramvalue(url: string, data: ProjectProgramModel) {
    return this.globalService.post(url, data);
  };
  //#endregion
  //#region "getProjectProgramById" 
  getProjectProgramById(url: string, Id: number) {
    return this.globalService.getListById(url, Id);
  };
  //#endregion
  //#region "getProjectAreaById" 
  getProjectAreaById(url: string, Id: number) {
    return this.globalService.getListById(url, Id);
  };
  //#endregion
  //#region "AddeditSelectProjectProgramvalue" 
  AddeditSelectAreaProgramvalue(url: string, data: ProjectAreaModel) {
    return this.globalService.post(url, data);
  };
  //#endregion

  //#region "AddeditSelectProjectProgramvalue" 
  AddeditSelectSectorvalue(url: string, data: ProjectSectorModel) {
    return this.globalService.post(url, data);
  };
  //#endregion

  //#region "getProjectSectorById" 
  getProjectSectorById(url: string, Id: number) {
    return this.globalService.getListById(url, Id);
  };
  //#endregion

  //#region 
  //#region "AddProjectDetail" 
  AddProjectApprovalDetail(url: string, data: ApproveProjectDetailModel) {
    return this.globalService.post(url, data);
  };
  //#endregion
  //#region "AddProjectDetail" 
  WinProjectApprovalDetail(url: string, data: WinApprovalDetailModel) {
    return this.globalService.post(url, data);
  };
  //#endregion

  //#endregion
  //#region "getAllProvinceList" 
  getAllProvinceList(url: string) {
    return this.globalService.getList(url);
  }
  //#endregion
  //#region "GetAllStrengthConsiderationDetails" 
  GetAllStrengthConsiderationDetails(url: string) {
    return this.globalService.getList(url);
  }
  //#endregion

  //#region "GetAllCurrency" 
  GetAllCurrency(url: string) {
    return this.globalService.getList(url);
  }
  //#endregion

  //#endregion
  //#region "GetAllstrength" 
  GetAllGender(url: string) {
    return this.globalService.getList(url);
  }
  //#endregion
  //#region "GetAllstrength" 
  GetAllSecurityDetails(url: string) {
    return this.globalService.getList(url);
  }
  //#endregion
  //#region "GetAllstrength" 
  GetAllSecurityConsideration(url: string) {
    return this.globalService.getList(url);
  }
  //#endregion

  //#region "GetAllDistrictvalueByProvinceId" 
  GetAllDistrictvalueByProvinceId(url: string, Id: any) {
    return this.globalService.getListByListId(url, Id);
  };
  //#endregion

  //#region "AddProjectDetail other details" 
  AddEditProjectotherDetail(url: string, data: ProjectOtherDetailModel) {
    return this.globalService.post(url, data);
  };
  //#endregion

  //#region GetotherprojectlistById
  GetOtherProjectDetailsByProjectId(url: string, id: number) {
    return this.globalService.getListById(url, id);
  }
  //#endregion

  //#region "AddProjectDetail" 
  GetAllOfficeList(url: string) {
    return this.globalService.getList(url);
  };
  //#region "GetAllDistrictvalueByProvinceId" 
  CreateProjectproposal(url: string, Id: any) {
    return this.globalService.getListById(url, Id);
  };
  //#endregion
  //#region "GetAllDistrictvalueByProvinceId" 
  GetProjectproposalById(url: string, Id: any) {
    return this.globalService.getListById(url, Id);
  };
  //#endregion
  //#region "uploadEDIFile" 
  uploadEDIFile(url: string, Id: number, Formdata: any): any {
    return this.globalService.post(url, Formdata);
  }
  //#endregion
  //#region "AddEditProjectProposalDetail" 
  AddEditProjectProposalDetail(url: string, data: ProposalDocModel) {
    return this.globalService.post(url, data);
  }
  //#endregion
//#region "GetAllCurrency" 
GetAllUserList(url: string) {
  return this.globalService.getList(url);
}
//#endregion

}
