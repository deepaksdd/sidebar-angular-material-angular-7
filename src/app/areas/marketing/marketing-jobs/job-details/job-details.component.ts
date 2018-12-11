import { Component, OnInit } from '@angular/core';
import { MarketingJobDetailModel, PhaseDetailsModel, ContractDetailsModel } from '../model/marketing-jobs.model';
import { MatSnackBar } from '@angular/material';
import { MarketingJobsService } from '../service/marketing-jobs.service';
import { GLOBAL } from 'src/app/shared/global';
import { AppUrlService } from 'src/app/shared/services/app-url.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {

  contractsList: any[];
  jobDetails: MarketingJobDetailModel = {};
  id: number;


  constructor(
    public snackBar: MatSnackBar,
    public marketingJobService: MarketingJobsService,
    public appurl: AppUrlService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.id = + this.route.snapshot.paramMap.get('id');
  }
  phases: PhaseDetailsModel[];

  ngOnInit() {
    this.getJobPhase();
    this.getContracts();
  }

  getJobPhase() {
    this.marketingJobService.GetPhases(this.appurl.getApiUrl() + GLOBAL.API_Job_GetPhaseList).subscribe(data1 => {
      this.phases = data1.data.JobPhases;
    });
  }

  getContracts() {
    this.marketingJobService.GetContracts(this.appurl.getApiUrl() + GLOBAL.API_Job_GetContractList).subscribe(data1 => {
      this.contractsList = data1.data.ContractDetails;
    });
  }

  onJobDetailUpdate(ev, data) {
    if (ev === 'jobName') {
      this.jobDetails.JobName = data;
    }
    if (ev === 'jobCode') {
      this.jobDetails.JobCode = data;
    }
    if (ev === 'jobDescription') {
      this.jobDetails.JobDescription = data;
    }
    if (ev === 'unitRate') {
      this.jobDetails.UnitRate = data;
    }
    if (ev === 'unitPrice') {
      this.jobDetails.UnitPrice = data;
    }
    if (ev === 'finalRate') {
      this.jobDetails.FinalRate = data;
    }
    if (ev === 'phase') {
      this.jobDetails.JobPhaseId = data;
    }
    if (ev === 'contract') {
      this.jobDetails.ContractId = data;
    }
    if (ev === 'finalPrice') {
      this.jobDetails.FinalPrice = data;
    }
    if (ev === 'totalPrice') {
      this.jobDetails.TotalPrice = data;
    }
    if (ev === 'discount') {
      this.jobDetails.Discount = data;
    }
    if (ev === 'discountPercent') {
      this.jobDetails.DiscountPercent = data;
    }
    this.snackBar.open(data, 'close', {
      duration: 2000,
    });
    // tslint:disable-next-line:max-line-length
    this.marketingJobService.AddJobDetail(this.appurl.getApiUrl() + GLOBAL.API_Job_AddJob, this.jobDetails).subscribe(data1 => {
      console.log(data1);
    });


  }

  // onNameChange(ev, data: any) {
  //   let projectDetail: ProjectDetailModel = {  };
  //   if(ev.srcElement.name == 'projectName'){
  //     this.projectDetail.ProjectName = data.value;
  //   }
  //   if(ev.srcElement.name == 'projectDescription'){
  //     this.projectDetail.ProjectDescription = data.value;
  //   }
  //   this.snackBar.open(data, 'close', {
  //     duration: 2000,
  //   });

  //   this.projectListService.AddProjectDetail(this.appurl.getApiUrl() + GLOBAL.API_Project_AddEditProjectDetail, projectDetail).subscribe(

  //     (data) => {


  //     }
  //   );

  // }
}
