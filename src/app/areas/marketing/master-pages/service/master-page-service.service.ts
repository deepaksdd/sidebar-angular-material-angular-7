import { Injectable } from '@angular/core';
import { GlobalService } from '../../../../shared/services/global-services.service';
import { Observable } from 'rxjs';
import { ActivityTypeModel } from '../model/mastrer-pages.model';

@Injectable({
  providedIn: 'root'
})
export class MasterPageServiceService {

  constructor(private globalService: GlobalService) { }
  GetActivityTypes(url): Observable<any> {
    return this.globalService.getList(url);
  }

  DeleteActivityType(url, data): Observable<any> {
    return this.globalService.post(url, data);
  }

  AddActivityType(url, data): Observable<any> {
    return this.globalService.post(url, data);
  }

  AddMedium(url, data): Observable<any> {
    return this.globalService.post(url, data);
  }

  AddMediaCategory(url, data): Observable<any> {
    return this.globalService.post(url, data);
  }

  AddTimeCategory(url, data): Observable<any> {
    return this.globalService.post(url, data);
  }

  AddNature(url, data): Observable<any> {
    return this.globalService.post(url, data);
  }

  AddPhase(url, data): Observable<any> {
    return this.globalService.post(url, data);
  }

  DeleteMediaCategory(url, data): Observable<any> {
    return this.globalService.post(url, data);
  }

  DeleteTimeCategory(url, data): Observable<any> {
    return this.globalService.post(url, data);
  }

  DeleteNature(url, data): Observable<any> {
    return this.globalService.post(url, data);
  }

  DeletePhase(url, data): Observable<any> {
    return this.globalService.post(url, data);
  }

  DeleteMedium(url, data): Observable<any> {
    return this.globalService.post(url, data);
  }

  DeleteQuality(url, data): Observable<any> {
    return this.globalService.post(url, data);
  }

  GetPhases(url): Observable<any> {
    return this.globalService.getList(url);
  }

  GetMediaCategory(url): Observable<any> {
    return this.globalService.getList(url);
  }

  GetMediaCategoryById(url, data): Observable<any> {
    return this.globalService.post(url, data);
  }

  GetMediumById(url, data): Observable<any> {
    return this.globalService.post(url, data);
  }

  GetTimeCategoryById(url, data): Observable<any> {
    return this.globalService.post(url, data);
  }

  GetNatureById(url, data): Observable<any> {
    return this.globalService.post(url, data);
  }

  GetActivityById(url, data): Observable<any> {
    return this.globalService.post(url, data);
  }


  GetPhaseById(url, data): Observable<any> {
    return this.globalService.post(url, data);
  }

  GetQualityById(url, data): Observable<any> {
    return this.globalService.post(url, data);
  }

  GetMedium(url): Observable<any> {
    return this.globalService.getList(url);
  }

  GetQuality(url): Observable<any> {
    return this.globalService.getList(url);
  }

  GetNature(url): Observable<any> {
    return this.globalService.getList(url);
  }

  GetTimeCategory(url): Observable<any> {
    return this.globalService.getList(url);
  }

  AddUnitRate(url, data): Observable<any> {
    return this.globalService.post(url, data);
  }

  GetUnitRate(url): Observable<any> {
    return this.globalService.getList(url);
  }

  GetUnitRateById(url, data): Observable<any> {
    return this.globalService.post(url, data);
  }

  AddQuality(url, data): Observable<any> {
    return this.globalService.post(url, data);
  }
}
