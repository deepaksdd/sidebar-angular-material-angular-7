import { Injectable } from '@angular/core';
import { GlobalService } from '../../../../shared/services/global-services.service';
import { Observable } from 'rxjs';
import { MarketingJobDetailModel } from '../model/marketing-jobs.model';
@Injectable({
  providedIn: 'root'
})
export class MarketingJobsService {

  constructor(private globalService: GlobalService) {}

  GetJobsList(url): Observable<any> {
   return  this.globalService.getList(url);
  }

  AddJobDetail(url: string, data: MarketingJobDetailModel) {
    return this.globalService.post(url, data);
  }

  GetPhases(url): Observable<any> {
    return  this.globalService.getList(url);
  }

  GetContracts(url): Observable<any> {
    return  this.globalService.getList(url);
  }

}
