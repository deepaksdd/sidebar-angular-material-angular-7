import { Injectable } from '@angular/core';
import { GlobalService } from '../../../../shared/services/global-services.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private globalService: GlobalService) { }
  GetClientsList(url): Observable<any> {
    return  this.globalService.getList(url);
   }

   GetCategory(url): Observable<any> {
    return  this.globalService.getList(url);
   }

   DeleteClient(url, data): Observable<any> {
     return this.globalService.post(url, data);
   }

   GetClientById(url, data): Observable<any> {
    return this.globalService.post(url, data);
  }

  EditClient(url, data): Observable<any> {
    return this.globalService.post(url, data);
  }
}
