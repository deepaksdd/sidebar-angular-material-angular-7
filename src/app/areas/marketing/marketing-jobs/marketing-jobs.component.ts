import { Component, OnInit } from '@angular/core';
import { MarketingJobsService } from '../marketing-jobs/service/marketing-jobs.service';
import { AppUrlService } from 'src/app/shared/services/app-url.service';
import { GLOBAL } from 'src/app/shared/global';
import { Router } from '@angular/router';

@Component({
  selector: 'app-marketing-jobs',
  templateUrl: './marketing-jobs.component.html',
  styleUrls: ['./marketing-jobs.component.scss']
})
export class MarketingJobsComponent implements OnInit {

  //#region Variables
  jobsList: any[];
  showJobDetail = false;
  colsm6 = 'col-sm-10 col-sm-offset-1';

  //#endregion

  constructor(
    private marketingJobService: MarketingJobsService,
    private appurl: AppUrlService,
    private router: Router
  ) { }

  ngOnInit() {



    console.log(this.router.url);

    // NOTE: To hide the header
    // this.router.url.includes('/marketing/jobs/') ? true : false;





    this.init();
    this.getJobsList();
  }

  init() {
    // this.jobsList = [];
  }

  getJobsList() {
    this.jobsList = [];
    this.marketingJobService.GetJobsList(this.appurl.getApiUrl() + GLOBAL.API_Job_GetJobsList).subscribe(data => {
      this.jobsList = data.data.JobDetailsModel;
    });
  }


  onItemClick(data: any) {
    this.showJobDetail = !this.showJobDetail;
    this.colsm6 = this.showJobDetail ? 'col-sm-6' : 'col-sm-10 col-sm-offset-1';
    if (this.showJobDetail) {
      this.router.navigate(['marketing', 'jobs', 0]);
    } else {
      this.router.navigate(['marketing', 'jobs']);
    }
  }


}
