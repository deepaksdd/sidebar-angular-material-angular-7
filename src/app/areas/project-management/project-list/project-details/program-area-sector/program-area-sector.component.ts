import { ProjectProgramModel, ProjectAreaModel, ProjectSectorModel, ProvinceModel, ProjectProvinceModel, ProjectOtherDetailModel, OfficeModel, SecurityModel, strengthModel, GenderConsiderationvalueModel, DonorModel, CurrencyModel } from './../models/project-details.model';
import { FormsModule, Validators } from '@angular/forms';
import { Component, OnInit, Input, Inject, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { AppUrlService } from 'src/app/shared/services/app-url.service';
import { ProjectListService } from '../../service/project-list.service';
import { GLOBAL } from 'src/app/shared/global';
import { SectorModel, ProgramModel, AreaModel } from '../models/project-details.model';
import { FormControl } from '@angular/forms';
import { Observable, from } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MAT_DIALOG_DATA } from '@angular/material';
import { AutoComplete, OverlayPanel, SelectItem } from 'primeng/primeng';
import { DebugRenderer2 } from '@angular/core/src/view/services';
@Component({
  selector: 'app-program-area-sector',
  templateUrl: './program-area-sector.component.html',
  styleUrls: ['./program-area-sector.component.scss']
})
export class ProgramAreaSectorComponent implements OnInit {
  //#region variables
  unamePattern = "^[a-zA-Z]{2,}$";

  opportunityNo = new FormControl('', [Validators.required, Validators.pattern(this.unamePattern)]);
  opportunity = new FormControl('', [Validators.required]);
  opportunitydescription = new FormControl('', [Validators.required]);
  budget = new FormControl('', [Validators.required]);
  beneficiaryMale = new FormControl('', [Validators.required]);
  beneficiaryFemale = new FormControl('', [Validators.required]);
  projectGoal = new FormControl('', [Validators.required]);
  projectObjective = new FormControl('', [Validators.required]);
  mainActivities = new FormControl('', [Validators.required]);
  GenderRemarks = new FormControl('', [Validators.required]);
  SecurityRemarks = new FormControl('', [Validators.required]);
  //#endregion

  StartDate: any;
  EndDate: any;
  REOIReceiveDate: any;
  SubmissionDate: any;

  private autoComplete: AutoComplete;
  private autoCompleteArea: AutoComplete;
  private autoCompletesector: AutoComplete;
  private autoCompleteProvince: AutoComplete;
  private autoCompleteoffice: AutoComplete;
  private autoCompletestrength: AutoComplete;
  private autoCompleteSecurity: AutoComplete;
  private autoCompleteDonor: AutoComplete;
  private autoCompleteCurrency: AutoComplete;
  Sectorlist: SectorModel[];
  Programlist: ProgramModel[];
  Arealist: AreaModel[];
  Area: string[];
  Program: string[];
  Sector: string[];
  Programvalue: any[];
  Areavalue: any[];
  Sectorvalue: any[];

  AreaName: string;
  ProgramName: string;
  ProgramId: number;
  AreaId: number;
  SectorId: number;
  ProjectId: number;
  Provincevalue: any[];
  //ProjectProvinceModel:ProjectProvinceModel[];
  ProgramModel: ProgramModel;
  selectedProvince: string[] = [];
  getprovinceList: string[] = [];
  Province: SelectItem[];
  SecurityConsideration: SelectItem[];
  selectedSecurityConsideration: string[] = [];
  ProvinceId: any[];
  DistrictModel: SelectItem[];
  selectedDistrict: string[] = [];
  projectotherDetail: ProjectOtherDetailModel;
  Office: string[];
  Officevalue: any[];
  Officelist: OfficeModel[];
  SecurityName:string;
  Security: string[];
  Securityvalue: any[];
  Securitylist: SecurityModel[];
  strength: string[];
  strengthvalue: any[];
  strengthlist: strengthModel[];
  GenderConsideration: string[];
  GenderConsiderationvalue: any[];
  GenderConsiderationvaluelist: GenderConsiderationvalueModel[];
  Donor: string[];
  DonorName:string;
  Donorvalue: any[];
  DonorList: DonorModel[];
  CurrencyList: CurrencyModel[];
  Currency: string[];
  Currencyvalue: any[];
  DonorId: number;
  Strength:string;
  OfficeName:string;
  OtherProjectList: any[];
  GenderConsiderationName:string;
  constructor(
    private routeActive: ActivatedRoute,
    private route: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public projectListService: ProjectListService,
    private appurl: AppUrlService,
    public router: Router, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.ProjectId = this.data.id;
    this.getProjectProgramById();
    this.getProjectAreaById();
    this.getProjectSectorById();
    this.GetAllProgramList();
    this.GetAllAreaList();
    this.GetAllSectorList();
    this.getAllProvinceList();
    this.GetAllCurrency();
    this.GetAllStrengthConsiderationDetails();
    this.GetAllSecurityDetails();
    this.GetAllGenderConsiderationDetails();
    this.GetAllDonorList();
    this.GetAllSecurityConsideration();
    this.GetAllOfficeList();
    this.initProjectOtherDetail();
    
  }
  //#region 
  initProjectOtherDetail() {
    this.projectotherDetail = {
      ProjectId: this.ProjectId,
      ProjectOtherDetailId: 0,
      opportunityNo: null,
      opportunity: null,
      opportunitydescription: null,
      beneficiaryMale: null,
      beneficiaryFemale: null,
      projectGoal: null,
      projectObjective: null,
      mainActivities: null,
      GenderRemarks: null,
      SecurityRemarks: null,
      StrengthConsiderationId: null,
      SecurityId: null,
      GenderConsiderationId: null,
    }
  }
  //#endregion

  //#region
  closeProgramAreaSectorModal() {
    this.dialog.closeAll();
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }
  // endregion
  //   onFocus(event): void {
  //     this.autoComplete.show();
  // }
  //#region Program
  GetAllProgramList() {
    this.Programlist = [];
    this.projectListService.GetAllProgramList(this.appurl.getApiUrl() + GLOBAL.API_Project_GetAllProgramList)
      .subscribe(
        (data) => {
          if (data != null) {
            if (data.data.programDetails != null) {
              data.data.programDetails.forEach(element => {
                this.Programlist.push({
                  ProgramId: element.ProgramId,
                  ProgramName: element.ProgramName
                });
              });
            }
          }
        });
  }
  AddProgram(data: any) {
    let ProgramModel: ProgramModel = {
      ProgramName: data
    };
    if (ProgramModel.ProgramName !== undefined) {
      this.projectListService.AddProgramDetail(this.appurl.getApiUrl() + GLOBAL.API_Project_AddProgramDetails, ProgramModel)
        .subscribe(
          (response) => {
            if (response.StatusCode === 200) {
              this.GetAllProgramList();
              this.snackBar.open("Program Added Successfully!!!", "action", {
                duration: 3000,
              });
              this.Program = [];
            }
            if (response.StatusCode === 420) {
              this.snackBar.open(response.Message, "action", {
                duration: 3000,
              });
            }
          }
        );
    }
  }
  getProjectProgramById() {
    let Id = this.ProjectId
    this.projectListService.getProjectProgramById(this.appurl.getApiUrl() + GLOBAL.API_Project_getProjectProgramById, Id)
      .subscribe(
        (data) => {
          if (data != null) {
            if (data.data.projectProgram != null) {
              let filtered: any[] = [];
              for (let i = 0; i < this.Programlist.length; i++) {
                if (data.data.projectProgram.ProgramId === this.Programlist[i].ProgramId) {
                  filtered.push(this.Programlist[i]);
                }
              }
              this.Program = filtered[0].ProgramName;
              return this.Programvalue = this.getProgramSaveValue(filtered[0].ProgramName);
            }
          }
        });
  }
  getProgramSaveValue(data: any) {
    return this.Programvalue = this.filterProgram(data, this.Programlist);
  }

  filterProgramSingle(event) {
    let query = event.query;
    return this.Programvalue = this.filterProgram(query, this.Programlist);

  }
  filterProgram(query, Programlist: any[]): any[] {
    // in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    for (let i = 0; i < Programlist.length; i++) {
      let Program = Programlist[i];
      if (query == null) {
        filtered.push(Program.ProgramName);
      } else if (Program.ProgramName.toLowerCase().indexOf(query.toLowerCase()) != -1) {
        filtered.push(Program.ProgramName);
      }
    }
    return filtered;
  }
  AddeditSelectProjectProgramvalue(event: any) {
    for (let i = 0; i < this.Programlist.length; i++) {
      if (event == this.Programlist[i].ProgramName) {
        this.ProgramId = this.Programlist[i].ProgramId;
      }
    }
    let ProjectProgramModel: ProjectProgramModel = {
      ProjectId: this.ProjectId,
      ProgramId: this.ProgramId
    };
    // tslint:disable-next-line:max-line-length
    this.projectListService.AddeditSelectProjectProgramvalue(this.appurl.getApiUrl() + GLOBAL.API_Project_AddEditProjectProgram, ProjectProgramModel)
      .subscribe(
        (response) => {
          if (response.StatusCode === 200) {
            this.GetAllProgramList();
            this.snackBar.open("Project Program Added Successfully!!!", "action", {
              duration: 3000,
            });
            this.Program = [];
          }
        });
  }


  //#endregion

  //#region Area
  GetAllAreaList() {
    this.Arealist = [];
    this.projectListService.GetAllAreaList(this.appurl.getApiUrl() + GLOBAL.API_Project_GetAllAreaList)
      .subscribe(
        (data) => {
          if (data != null) {
            if (data.data.AreaDetail != null) {
              data.data.AreaDetail.forEach(element => {
                this.Arealist.push({
                  AreaId: element.AreaId,
                  AreaName: element.AreaName
                });
              });
              this.AreaName = '';
            }
          }
        });
  }
  AddAreaDeatil(data: any) {
    let AreaModel: AreaModel = {
      AreaName: data
    };
    if (AreaModel.AreaName !== undefined) {
      this.projectListService.AddAreaDetail(this.appurl.getApiUrl() + GLOBAL.API_Project_AddAreaDetails, AreaModel)
        .subscribe(
          (response) => {
            if (response.StatusCode === 200) {
              this.GetAllAreaList();
              this.snackBar.open("Area Added Successfully!!!", "action", {
                duration: 3000,
              });
              this.Area = [];
            }
            if (response.StatusCode === 420) {
              this.snackBar.open(response.Message, "action", {
                duration: 3000,
              });
            }
          }

        );
    }
  }
  getProjectAreaById() {
    let Id = this.ProjectId
    this.projectListService.getProjectAreaById(this.appurl.getApiUrl() + GLOBAL.API_Project_getProjectAreaById, Id)
      .subscribe(
        (data) => {
          if (data != null) {
            if (data.data.projectArea != null) {

              let filtered: any[] = [];
              for (let i = 0; i < this.Arealist.length; i++) {
                if (data.data.projectArea.AreaId === this.Arealist[i].AreaId) {
                  filtered.push(this.Arealist[i]);
                }
              }
              this.Area = filtered[0].AreaName;
              return this.Areavalue = this.getAreaSaveValue(filtered[0].AreaName);

            }
          }
        });
  }
  getAreaSaveValue(data: any) {
    return this.Areavalue = this.filterArea(data, this.Arealist);
  }

  filterAreaSingle(event) {
    let query = event.query;
    return this.Areavalue = this.filterArea(query, this.Arealist);

  }
  AddeditSelectAreaProgramvalue(event: any) {
    for (let i = 0; i < this.Arealist.length; i++) {
      if (event === this.Arealist[i].AreaName) {
        this.AreaId = this.Arealist[i].AreaId;
      }
    }
    let ProjectAreaModel: ProjectAreaModel = {
      ProjectId: this.ProjectId,
      AreaId: this.AreaId
    };
    this.projectListService.AddeditSelectAreaProgramvalue(this.appurl.getApiUrl() + GLOBAL.API_Project_AddEditProjectArea, ProjectAreaModel)
      .subscribe(
        (response) => {
          if (response.StatusCode === 200) {
            this.GetAllAreaList();
            this.snackBar.open("Project Area Added Successfully!!!", "action", {
              duration: 3000,
            });
            this.Program = [];
          }
        });
  }

  filterArea(query, Arealist: any[]): any[] {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    for (let i = 0; i < Arealist.length; i++) {
      let Area = Arealist[i];
      if (query == null) {
        filtered.push(Area.AreaName);
      } else if (Area.AreaName.toLowerCase().indexOf(query.toLowerCase()) != -1) {
        filtered.push(Area.AreaName);
      }
    }
    return filtered;
  }
  //#endregion
  //#region Sector
  GetAllSectorList() {
    this.Sectorlist = [];
    this.projectListService.GetAllSectorList(this.appurl.getApiUrl() + GLOBAL.API_Project_GetAllSectorList)
      .subscribe(
        (data) => {
          if (data != null) {
            if (data.data.sectorDetails != null) {
              data.data.sectorDetails.forEach(element => {
                this.Sectorlist.push({
                  SectorId: element.SectorId,
                  SectorName: element.SectorName
                });
              });
            }
          }
        });
  }
  AddSectorDeatil(data: any) {
    let SectorModel: SectorModel = {
      SectorName: data
    };
    if (SectorModel.SectorName !== undefined) {
      this.projectListService.AddSectorDetail(this.appurl.getApiUrl() + GLOBAL.API_Project_AddSectorDetails, SectorModel)
        .subscribe(
          (response) => {
            if (response.StatusCode === 200) {
              this.GetAllSectorList();
              this.snackBar.open("Sector Added Successfully!!!", "action", {
                duration: 3000,
              });
              this.Sector = [];
            }
            if (response.StatusCode === 420) {
              this.snackBar.open(response.Message, "action", {
                duration: 3000,
              });
            }
          });
    }
  }
  getProjectSectorById() {
    let Id = this.ProjectId
    this.projectListService.getProjectSectorById(this.appurl.getApiUrl() + GLOBAL.API_Project_getProjectSectorById, Id)
      .subscribe(
        (data) => {
          if (data != null) {
            if (data.data.projectSector != null) {
              let filtered: any[] = [];
              for (let i = 0; i < this.Sectorlist.length; i++) {
                if (data.data.projectSector.SectorId === this.Sectorlist[i].SectorId) {
                  filtered.push(this.Sectorlist[i]);
                }
              }

              this.Sector = filtered.length > 0 ? filtered[0].SectorName : [];
              return this.Sectorvalue = this.getSectorSaveValue(filtered[0].SectorName);
            }
          }
        });
  }

  getSectorSaveValue(data: any) {
    return this.Sectorvalue = this.filterArea(data, this.Sectorlist);
  }
  filterSectorSingle(event) {
    let query = event.query;
    return this.Sectorvalue = this.filterSector(query, this.Sectorlist);

  }
  AddeditSelectSectorvalue(event: any) {
    for (let i = 0; i < this.Sectorlist.length; i++) {
      if (event === this.Sectorlist[i].SectorName) {
        this.SectorId = this.Sectorlist[i].SectorId;
      }
    }
    let ProjectAreaModel: ProjectSectorModel = {
      ProjectId: this.ProjectId,
      SectorId: this.SectorId
    };
    this.projectListService.AddeditSelectSectorvalue(this.appurl.getApiUrl() + GLOBAL.API_Project_AddEditProjectSector, ProjectAreaModel)
      .subscribe(
        (response) => {
          if (response.StatusCode === 200) {
            this.GetAllSectorList();
            this.snackBar.open("Project Sector Added Successfully!!!", "action", {
              duration: 3000,
            });
            this.Sector = [];
          }
        });
  }

  filterSector(query, Sectorlist: any[]): any[] {
    // in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    for (let i = 0; i < Sectorlist.length; i++) {
      let Sector = Sectorlist[i];
      if (query == null) {
        filtered.push(Sector.SectorName);
      } else if (Sector.SectorName.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
        filtered.push(Sector.SectorName);
      }
    }
    return filtered;
  }
  //#endregion

  //#region GetAllProvinceList

  getAllProvinceList() {
    this.Province = [];
    this.projectListService.getAllProvinceList(this.appurl.getApiUrl() + GLOBAL.API_Project_GetAllProvinceDetails)
      .subscribe(
        (data) => {
          if (data != null) {
            if (data.data.ProvinceDetailsList != null) {
              data.data.ProvinceDetailsList.forEach(element => {
                this.Province.push({
                  value: element.ProvinceId,
                  label: element.ProvinceName
                });
              });
            }
          }
        });
  }
  selectedProvinceValue(event: any) {
    if (event.value.length > 0)
      this.GetAllDistrictvalueByProvinceId(event.value);
  }
  GetAllDistrictvalueByProvinceId(ProvinceId: any) {
    let id = ProvinceId;
    this.DistrictModel = [];
    this.projectListService.GetAllDistrictvalueByProvinceId(this.appurl.getApiUrl() + GLOBAL.API_Project_GetAllDistrictvalueByProvinceId, id)
      .subscribe(
        (data) => {
          if (data != null) {
            if (data.data.Districtlist != null) {
              data.data.Districtlist.forEach(element => {
                this.DistrictModel.push({
                  value: element.DistrictID,
                  label: element.District
                });
              });
            }
          }
        });
  }
  //#region 
  GetAllStrengthConsiderationDetails() {
    this.strengthlist = [];
    this.projectListService.GetAllStrengthConsiderationDetails(this.appurl.getApiUrl() + GLOBAL.API_Project_GetAllStrengthConsiderationDetails)
      .subscribe(
        (data) => {
          if (data != null) {
            if (data.data.StrengthConsiderationDetail != null) {
              data.data.StrengthConsiderationDetail.forEach(element => {
                this.strengthlist.push({
                  StrengthConsiderationId: element.StrengthConsiderationId,
                  StrengthConsiderationName: element.StrengthConsiderationName
                });
              });
              this.GetOtherProjectDetailById(this.ProjectId);
            }
          }
        });
  }
  filterstrengthSingle(event) {
    let query = event.query;
    return this.strengthvalue = this.filterstrength(query, this.strengthlist);
  }
  filterstrength(query, strengthlist: any[]): any[] {
    // in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    for (let i = 0; i < strengthlist.length; i++) {
      let strength = strengthlist[i];
      if (query == null) {
        filtered.push(strength.StrengthConsiderationName);
      } else if (strength.StrengthConsiderationName.toLowerCase().indexOf(query.toLowerCase()) != -1) {
        filtered.push(strength.StrengthConsiderationName);
      }
    }
    return filtered;
  }
  //#endregion
  //#region
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
  filterCurrencySingle(event) {
    let query = event.query;
    return this.Currencyvalue = this.filterCurrency(query, this.CurrencyList);
  }
  filterCurrency(query, CurrencyList: any[]): any[] {
    // in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    for (let i = 0; i < CurrencyList.length; i++) {
      let Currency = CurrencyList[i];
      if (query == null) {
        filtered.push(Currency.CurrencyCode);
      } else if (Currency.CurrencyCode.toLowerCase().indexOf(query.toLowerCase()) != -1) {
        filtered.push(Currency.CurrencyCode);
      }
    }
    return filtered;
  }
  //#endregion
  //#region GenderConsideration
  GetAllGenderConsiderationDetails() {
    this.GenderConsiderationvaluelist = [];
    this.projectListService.GetAllGender(this.appurl.getApiUrl() + GLOBAL.API_Project_GetAllGenderConsiderationDetails)
      .subscribe(
        (data) => {
          if (data != null) {
            if (data.data.GenderConsiderationDetail != null) {
              data.data.GenderConsiderationDetail.forEach(element => {
                this.GenderConsiderationvaluelist.push({
                  GenderConsiderationId: element.GenderConsiderationId,
                  GenderConsiderationName: element.GenderConsiderationName
                });
              });
              this.GetOtherProjectDetailById(this.ProjectId);
            }
          }
        });
  }
  filterGenderConsiderationSingle(event) {
    let query = event.query;
    return this.GenderConsiderationvalue = this.filterGenderConsideration(query, this.GenderConsiderationvaluelist);
  }
  filterGenderConsideration(query, GenderConsiderationvaluelist: any[]): any[] {
    // in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    for (let i = 0; i < GenderConsiderationvaluelist.length; i++) {
      let GenderConsideration = GenderConsiderationvaluelist[i];
      if (query == null) {
        filtered.push(GenderConsideration.GenderConsiderationName);
      } else if (GenderConsideration.GenderConsiderationName.toLowerCase().indexOf(query.toLowerCase()) != -1) {
        filtered.push(GenderConsideration.GenderConsiderationName);
      }
    }
    return filtered;
  }
  //#endregion

  //#region Get All Security
  GetAllSecurityDetails() {
    this.Securitylist = [];
    this.projectListService.GetAllSecurityDetails(this.appurl.getApiUrl() + GLOBAL.API_Project_GetAllSecurityDetails)
      .subscribe(
        (data) => {
          if (data != null) {
            if (data.data.SecurityDetail != null) {
              data.data.SecurityDetail.forEach(element => {
                this.Securitylist.push({
                  SecurityId: element.SecurityId,
                  SecurityName: element.SecurityName
                });
              });
              this.GetOtherProjectDetailById(this.ProjectId);
            }
          }
        });
  }
  filterSecuritySingle(event) {
    let query = event.query;
    return this.Securityvalue = this.filterSecurity(query, this.Securitylist);
  }
  filterSecurity(query, Securitylist: any[]): any[] {
    // in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    for (let i = 0; i < Securitylist.length; i++) {
      let Security = Securitylist[i];
      if (query == null) {
        filtered.push(Security.SecurityName);
      } else if (Security.SecurityName.toLowerCase().indexOf(query.toLowerCase()) != -1) {
        filtered.push(Security.SecurityName);
      }
    }
    return filtered;
  }
  //#endregion

  //#region 
  GetAllDonorList() {
    this.DonorList = [];
    this.projectListService.GetAllDonorList(this.appurl.getApiUrl() + GLOBAL.API_Project_GetAllDonorList)
      .subscribe(
        (data) => {
          if (data != null) {
            if (data.data.DonorDetail != null) {
              data.data.DonorDetail.forEach(element => {
                this.DonorList.push({
                  DonorId: element.DonorId,
                  Name: element.Name
                });
              });
              this.GetOtherProjectDetailById(this.ProjectId);
            }
          }
        });
  }
  filterDonorSingle(event) {
    let query = event.query;
    return this.Donorvalue = this.filterDonor(query, this.DonorList);

    //this.onProjectotherDetailsChange(event,this.Donorvalue)
  }
  filterDonor(query, DonorList: any[]): any[] {
    // in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    for (let i = 0; i < DonorList.length; i++) {
      let Donor = DonorList[i];
      if (query == null) {
        filtered.push(Donor.Name);
      } else if (Donor.Name.toLowerCase().indexOf(query.toLowerCase()) != -1) {
        filtered.push(Donor.Name);
      }
    }
    return filtered;
  }


  // filterDonor(query, DonorList: any[]): any[] {
  //   // in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
  //   let filtered: any[] = [];
  //   for (let i = 0; i < DonorList.length; i++) {
  //     let Donor = DonorList[i];
  //     if (query == null) {
  //       filtered.push(Donor.Name);
  //      // filtered.push(Donor.DonorId);
  //      var DonorId= Donor.DonorId;
  //       let projectotherDetail: ProjectOtherDetailModel = {
  //         ProjectId: this.ProjectId,
  //         ProjectOtherDetailId: this.projectotherDetail.ProjectOtherDetailId,
  //         DonorId: Donor.DonorId
  //       }
  //        ;
  //       if (this.DonorId != null) {
  //          ;
  //         this.AddEditOtherProjectDetails(this.projectotherDetail);
  //       }
  //     } else if (Donor.Name.toLowerCase().indexOf(query.toLowerCase()) != -1) {
  //       filtered.push(Donor.Name);
  //     }
  //   }
  //   return filtered;
  // }
  // //#endregion

  //#endregion


  GetAllSecurityConsideration() {
    this.SecurityConsideration = [];
    this.projectListService.GetAllSecurityConsideration(this.appurl.getApiUrl() + GLOBAL.API_Project_GetAllSecurityConsiderationDetails)
      .subscribe(
        (data) => {
          if (data != null) {
            if (data.data.SecurityConsiderationDetail != null) {
              data.data.SecurityConsiderationDetail.forEach(element => {
                this.SecurityConsideration.push({
                  value: element.SecurityConsiderationId,
                  label: element.SecurityConsiderationName
                });
              });
              this.GetOtherProjectDetailById(this.ProjectId);
            }
          }
        });
  }

  //#endregion



  //#region GetProjectOtherDetailById

  GetOtherProjectDetailById(ProjectId: number) {
     ;
    
    this.OtherProjectList = [];
    if (ProjectId != null && ProjectId != undefined && ProjectId != 0) {
      this.projectListService.GetOtherProjectDetailsByProjectId(this.appurl.getApiUrl() + GLOBAL.API_GetProjectOtherDetailById, ProjectId)
        .subscribe(
          (data) => {
            if (data != null) {
              if (data.data.OtherProjectDetailById != null) {
                 
                this.projectotherDetail.ProjectOtherDetailId = data.data.OtherProjectDetailById.ProjectOtherDetailId;
                this.projectotherDetail.opportunityNo = data.data.OtherProjectDetailById.opportunityNo;
                this.projectotherDetail.opportunity = data.data.OtherProjectDetailById.opportunity;
                this.projectotherDetail.opportunitydescription = data.data.OtherProjectDetailById.opportunitydescription;
                this.projectotherDetail.ProjectId = data.data.OtherProjectDetailById.ProjectId;
                this.projectotherDetail.ProvinceId = data.data.OtherProjectDetailById.ProvinceId;
                this.projectotherDetail.DistrictID = data.data.OtherProjectDetailById.DistrictID;
                this.projectotherDetail.StartDate = data.data.OtherProjectDetailById.StartDate;
                this.projectotherDetail.EndDate = data.data.OtherProjectDetailById.EndDate;
                this.projectotherDetail.OfficeId =data.data.OtherProjectDetailById.OfficeId;
               this.OfficeName=this.Officelist.find(x => x.OfficeId === data.data.OtherProjectDetailById.OfficeId).OfficeName;
               
                // this.projectotherDetail.CurrencyId = data.data.OtherProjectDetailById.CurrencyId;
                this.projectotherDetail.DonorId = data.data.OtherProjectDetailById.DonorId;
                this.DonorName=this.DonorList.find(x => x.DonorId===data.data.OtherProjectDetailById.DonorId).Name;
                //this.projectotherDetail.budget = data.data.OtherProjectDetailById.budget;
                this.projectotherDetail.StrengthConsiderationId = data.data.OtherProjectDetailById.StrengthConsiderationId;
                this.Strength=this.strengthlist.find(x => x.StrengthConsiderationId === data.data.OtherProjectDetailById.StrengthConsiderationId).StrengthConsiderationName;
               
                this.projectotherDetail.beneficiaryMale = data.data.OtherProjectDetailById.beneficiaryMale;
                this.projectotherDetail.beneficiaryFemale = data.data.OtherProjectDetailById.beneficiaryFemale;
                this.projectotherDetail.projectGoal = data.data.OtherProjectDetailById.projectGoal;
                this.projectotherDetail.projectObjective = data.data.OtherProjectDetailById.projectObjective;
                this.projectotherDetail.mainActivities = data.data.OtherProjectDetailById.mainActivities;
                this.projectotherDetail.SubmissionDate = data.data.OtherProjectDetailById.SubmissionDate;
                this.projectotherDetail.REOIReceiveDate = data.data.OtherProjectDetailById.REOIReceiveDate;
                 this.projectotherDetail.GenderConsiderationId = data.data.OtherProjectDetailById.GenderConsiderationId;
                this.GenderConsiderationName=this.GenderConsiderationvaluelist.find(x => x.GenderConsiderationId === data.data.OtherProjectDetailById.GenderConsiderationId).GenderConsiderationName;
                this.projectotherDetail.GenderRemarks = data.data.OtherProjectDetailById.GenderRemarks;
                this.projectotherDetail.SecurityId = data.data.OtherProjectDetailById.SecurityId;
                this.SecurityName=this.Securitylist.find(x => x.SecurityId === data.data.OtherProjectDetailById.SecurityId).SecurityName;
                this.projectotherDetail.SecurityConsiderationId = data.data.OtherProjectDetailById.SecurityConsiderationId;
               
                this.projectotherDetail.SecurityRemarks = data.data.OtherProjectDetailById.SecurityRemarks;
               
               
                 
                // to get multiselect value of province
                var selectedprovince = data.data.OtherProjectDetailById.ProvinceId.split(',');
                if (selectedprovince.length > 0) {
                   
                  selectedprovince.forEach(element => {
                    this.selectedProvince.push(element);
                  });
                  // this.selectedProvince=[data.data.OtherProjectDetailById.ProvinceId];
                }

                var selectedSecurity= data.data.OtherProjectDetailById.SecurityConsiderationId.split(',');
                 if (selectedSecurity.length > 0) {
                    
                   selectedSecurity.forEach(element => {
                     this.selectedSecurityConsideration.push(element);
                   });
                }
                var selectedDist = data.data.OtherProjectDetailById.DistrictID.split(',');
                if (selectedDist.length > 0) {
                   
                  selectedDist.forEach(element => {
                    this.selectedDistrict.push(element);
                  });
                }
                


              }
            }
          })
    }
  }
  //#endregion

  //#region  add/edit other project 
  AddEditOtherProjectDetails(model: any) {
    let obj: ProjectOtherDetailModel = {
      ProjectOtherDetailId: model.ProjectOtherDetailId,
      opportunityNo: model.opportunityNo,
      opportunity: model.opportunity,
      opportunitydescription: model.opportunitydescription,
      ProjectId: model.ProjectId,
      ProvinceId: model.ProvinceId,
      DistrictID: model.DistrictID,
      OfficeId: model.OfficeId,
      StartDate: model.StartDate,
      EndDate: model.EndDate,
      CurrencyId: model.CurrencyId,
      budget: model.budget,
      beneficiaryMale: model.beneficiaryMale,
      beneficiaryFemale: model.beneficiaryFemale,
      projectGoal: model.projectGoal,
      projectObjective: model.projectObjective,
      mainActivities: model.mainActivities,
      DonorId: model.DonorId,
      SubmissionDate: model.SubmissionDate,
      REOIReceiveDate: model.REOIReceiveDate,
      StrengthConsiderationId: model.StrengthConsiderationId,
      GenderConsiderationId: model.GenderConsiderationId,
      GenderRemarks: model.GenderRemarks,
      SecurityId: model.SecurityId,
      SecurityConsiderationId: model.SecurityConsiderationId,
      SecurityRemarks: model.SecurityRemarks,

    }
    console.log(obj);

    this.projectListService.AddEditProjectotherDetail(this.appurl.getApiUrl() + GLOBAL.API_Project_AddEditProjectotherDetail, obj)
      .subscribe(
        (response) => {
          if (response.StatusCode == 200) {
            this.projectotherDetail.ProjectOtherDetailId = response.CommonId.Id;
            // let projectname = this.projectDetail.ProjectName;
            // let projectDes = this.projectDetail.ProjectDescription;
            // this.snackBar.open("Project other Details Added Successfully!!!", "action", {
            //   duration: 2000,               
            // });
            // this.selectedProvince=["59"];
          }
        }
      )


  }
  //#endregion

  //#region to add/Edit project other detail
  onProjectotherDetailsChange(ev, data: any) {

    // this.selectedProvinceValue(ev);
    let projectotherDetail: ProjectOtherDetailModel = {
      ProjectId: this.ProjectId,
      ProjectOtherDetailId: this.projectotherDetail.ProjectOtherDetailId
    };
    if (data != null && data != "" && data != undefined) {

       
      if (ev == 'Donor') {
         
        this.projectotherDetail.DonorId = this.DonorList.find(x => x.Name.toUpperCase() === data.toUpperCase()).DonorId;
        // console.log(this.projectotherDetail.DonorId);
        this.AddEditOtherProjectDetails(this.projectotherDetail);
      }


      if (ev == 'opportunityNo') {
        if (this.opportunityNo.valid) {
           

          this.projectotherDetail.opportunityNo = data;
        }
        this.AddEditOtherProjectDetails(this.projectotherDetail);
      }


      if (ev == 'opportunity') {
        if (this.opportunity.valid) {
          this.projectotherDetail.opportunity = data;
           
        }
        this.AddEditOtherProjectDetails(this.projectotherDetail);

      }
      if (ev == 'opportunitydescription') {
        if (this.opportunitydescription.valid) {
          this.projectotherDetail.opportunitydescription = data;
           
        }
        this.AddEditOtherProjectDetails(this.projectotherDetail);

      }
      if (ev == 'selectedProvince') {
         


        this.projectotherDetail.ProvinceId = data.toString();

        // console.log( this.projectotherDetail.ProvinceId);
        this.AddEditOtherProjectDetails(this.projectotherDetail);
         
        this.GetAllDistrictvalueByProvinceId(data);
        // this.selectedProvince=["59"]

      }
      if (ev == 'selectedDistrict') {
         
        this.projectotherDetail.DistrictID = data.toString();
        // console.log( this.projectotherDetail.ProvinceId);
        this.AddEditOtherProjectDetails(this.projectotherDetail);
      }
      if (ev == 'Office') {
        // if (projectotherDetail.OfficeId == data) {
        //   this.projectotherDetail.OfficeId = data;
        // }
        // else {
        this.projectotherDetail.OfficeId = this.Officelist.find(x => x.OfficeName.toUpperCase() === data.toUpperCase()).OfficeId;
        // }

        this.AddEditOtherProjectDetails(this.projectotherDetail);
      }
      if (ev == 'startDate') {
        this.projectotherDetail.StartDate = data != null ? this.setDateTime(data) : null;
        this.AddEditOtherProjectDetails(this.projectotherDetail);
      }

      if (ev == 'endDate') {
        this.projectotherDetail.EndDate = data != null ? this.setDateTime(data) : null;
        this.AddEditOtherProjectDetails(this.projectotherDetail);
      }
      // if (ev == 'Currency') {
      //   this.projectotherDetail.CurrencyId = this.CurrencyList.find(x => x.CurrencyCode.toUpperCase() === data.toUpperCase()).CurrencyId;

      //   this.AddEditOtherProjectDetails(this.projectotherDetail);
      // }
      // if (ev == 'budget') {
      //   if (this.budget.valid) {
      //     this.projectotherDetail.budget = data;
      //   }
      //   this.AddEditOtherProjectDetails(this.projectotherDetail);

      // }
      if (ev == 'beneficiaryMale') {
        if (this.beneficiaryMale.valid) {
          this.projectotherDetail.beneficiaryMale = data;
        }
        this.AddEditOtherProjectDetails(this.projectotherDetail);

      }
      if (ev == 'beneficiaryFemale') {
        if (this.beneficiaryFemale.valid) {
          this.projectotherDetail.beneficiaryFemale = data;
        }
        this.AddEditOtherProjectDetails(this.projectotherDetail);
      }
      if (ev == 'projectGoal') {
        if (this.projectGoal.valid) {
          this.projectotherDetail.projectGoal = data;
        }
        this.AddEditOtherProjectDetails(this.projectotherDetail);
      }
      if (ev == 'projectObjective') {
        if (this.projectObjective.valid) {
          this.projectotherDetail.projectObjective = data;
        }
        this.AddEditOtherProjectDetails(this.projectotherDetail);
      }
      if (ev == 'mainActivities') {
        if (this.mainActivities.valid) {
          this.projectotherDetail.mainActivities = data;
        }
        this.AddEditOtherProjectDetails(this.projectotherDetail);
      }

      if (ev == 'submissionDate') {
        this.projectotherDetail.SubmissionDate = data != null ? this.setDateTime(data) : null;
        this.AddEditOtherProjectDetails(this.projectotherDetail);
      }
      if (ev == 'rEOIReceiveDate') {
        this.projectotherDetail.REOIReceiveDate = data != null ? this.setDateTime(data) : null;
        this.AddEditOtherProjectDetails(this.projectotherDetail);
      }
      if (ev == 'strength') {

         
        this.projectotherDetail.StrengthConsiderationId = this.strengthlist.find(x => x.StrengthConsiderationName.toUpperCase() === data.toUpperCase()).StrengthConsiderationId;
        console.log(this.projectotherDetail.StrengthConsiderationId);
        this.AddEditOtherProjectDetails(this.projectotherDetail);
      }
      if (ev == 'genderConsideration') {

         
        this.projectotherDetail.GenderConsiderationId = this.GenderConsiderationvaluelist.find(x => x.GenderConsiderationName.toUpperCase() === data.toUpperCase()).GenderConsiderationId;
        console.log(this.projectotherDetail.GenderConsiderationId);
        this.AddEditOtherProjectDetails(this.projectotherDetail);
      }
      if (ev == 'GenderRemarks') {
        if (this.GenderRemarks.valid) {
          this.projectotherDetail.GenderRemarks = data;
        }
        this.AddEditOtherProjectDetails(this.projectotherDetail);

      }
      if (ev == 'Security') {

         
        this.projectotherDetail.SecurityId = this.Securitylist.find(x => x.SecurityName.toUpperCase() === data.toUpperCase()).SecurityId;
        console.log(this.projectotherDetail.SecurityId);
        this.AddEditOtherProjectDetails(this.projectotherDetail);
      }
      if (ev == 'selectedSecurityConsideration') {

        this.projectotherDetail.SecurityConsiderationId = data.toString();
        // console.log( this.projectotherDetail.ProvinceId);
        this.AddEditOtherProjectDetails(this.projectotherDetail);
      }
      if (ev == 'SecurityRemarks') {
        if (this.SecurityRemarks.valid) {
          this.projectotherDetail.SecurityRemarks = data;
        }
        this.AddEditOtherProjectDetails(this.projectotherDetail);


      }





      // this.snackBar.open(data, 'close', {
      //   duration: 2000,
      // });
      // // this.service  = 
      //  
      // this.projectListService.AddEditProjectotherDetail(this.appurl.getApiUrl() + GLOBAL.API_Project_AddEditProjectotherDetail, this.projectotherDetail)
      //   .subscribe(
      //     (response) => {
      //       if (response.StatusCode == 200) {
      //         this.projectotherDetail.ProjectId = response.CommonId.Id;
      //         // let projectname = this.projectDetail.ProjectName;
      //         // let projectDes = this.projectDetail.ProjectDescription;
      //         // this.snackBar.open("Project other Details Added Successfully!!!", "action", {
      //         //   duration: 2000,               
      //         // });

      //       }
      //     }
      //   )
    }

  }
  //#endregion 

  // #region
  //to unsbscribe the the service code
  //this.service.unsubscribe();

  GetAllOfficeList() {
    this.Officelist = [];
    this.projectListService.GetAllOfficeList(this.appurl.getApiUrl() + GLOBAL.API_code_GetAllOffice)
      .subscribe(
        (data) => {
          if (data != null) {
            if (data.data.OfficeDetailsList != null) {
              data.data.OfficeDetailsList.forEach(element => {
                this.Officelist.push({
                  OfficeId: element.OfficeId,
                  OfficeName: element.OfficeName
                });
              });
              this.GetOtherProjectDetailById(this.ProjectId);
            }
          }
        });
  }
  filterOfficeSingle(event) {
    let query = event.query;
    return this.Officevalue = this.filterOffice(query, this.Officelist);
  }
  filterOffice(query, Officelist: any[]): any[] {
    // in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    for (let i = 0; i < Officelist.length; i++) {
      let Office = Officelist[i];
      if (query == null) {
        filtered.push(Office.OfficeName);
      } else if (Office.OfficeName.toLowerCase().indexOf(query.toLowerCase()) != -1) {
        filtered.push(Office.OfficeName);
      }
    }
    return filtered;
  }

  //#endregion



  setDateTime(data): any {
    return new Date(new Date(data).getFullYear(), new Date(data).getMonth(), new Date(data).getDate(), new Date().getHours(), new Date().getMinutes(), new Date().getSeconds());
  }

}
