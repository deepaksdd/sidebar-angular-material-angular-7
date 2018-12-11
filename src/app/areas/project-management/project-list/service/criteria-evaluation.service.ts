import { Injectable } from '@angular/core';
import { DonorCEModel } from '../project-details/models/project-details.model';
import { GlobalService } from 'src/app/shared/services/global-services.service';

@Injectable({
  providedIn: 'root'
})
export class CriteriaEvaluationService {


  constructor(private globalService: GlobalService) { }
  //#region get criteria evaluation detail by projectId
  GetCriteriaEvalDetailsByProjectId(url: string, id: number) {
    return this.globalService.getListById(url, id);
  }
  //#endregion

  //#region "AddEditDonorCriteriaEvaluation Details" 
  AddEditDonorCriteriaEvaluationForm(url: string, data: DonorCEModel) {
    return this.globalService.post(url, data);
  };
  //#endregion
 //#region "AddEditDonorCriteriaEvaluation Details" 
  AddEditProductServiceCEForm(url: string, data: DonorCEModel) {
    return this.globalService.post(url, data);
  };
  //#endregion

}
