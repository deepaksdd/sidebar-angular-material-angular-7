import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { catchError, finalize } from 'rxjs/operators';
import { GlobalErrorHandler } from './global-error-handler';
import { CommonLoaderService } from '../../components/common-loader/common-loader.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  errHandler: GlobalErrorHandler;

  // Global Header Flag
  setSelectedHeader: number;


  constructor(private http: HttpClient, private loader: CommonLoaderService) { }

  //#region  "POST"
  post(url: string, data): Observable<any> {
    // console.log('Loader');
    this.loader.showLoader();
    return this.http.post<any>(url, data).pipe(
      map((response) => response),
      finalize(() => {
        this.loader.hideLoader();
      })

      // catchError(this.errHandler.handleError('dfdf', []))
      // catchError((error) => { console.log(error); return ""; })
    );
  }
  //#endregion

  //#region "GET_LIST"
  getList(url: string): Observable<any> {
    console.log('Loader');
    this.loader.showLoader();
    return this.http.get<any>(url).pipe(
      map((response) => response),
      finalize(() => {
        this.loader.hideLoader();
      })
    );
  }
  //#endregion

  //#region "GET_LIST_BY_ID"
  getListById(url: string, id: number): Observable<any> {
    // console.log('Loader');
    this.loader.showLoader();
    return this.http.post<any>(url, id).pipe(
      map((response) => response),
      finalize(() => {
        this.loader.hideLoader();
      })
    );
  }

  getListByListId(url: string, id: any): Observable<any> {
    console.log('Loader');
    this.loader.showLoader();
    return this.http.post<any>(url, id).pipe(
      map((response) => response),
      finalize(() => {
        this.loader.hideLoader();
      })
    );
  }
}
