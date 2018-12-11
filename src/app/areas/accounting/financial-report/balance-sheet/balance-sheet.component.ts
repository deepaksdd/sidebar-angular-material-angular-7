import { Component, OnInit } from '@angular/core';
import { AccountHeadTypes_Enum, AccountCategory_Enum } from '../../../../shared/enum';
import { AccountTypeModel } from '../models/financial-report.model';
import { GlobalService } from '../../../../shared/services/global-services.service';
import { AppUrlService } from '../../../../shared/services/app-url.service';
import { GLOBAL } from '../../../../shared/global';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-balance-sheet',
  templateUrl: './balance-sheet.component.html',
  styleUrls: ['./balance-sheet.component.scss']
})
export class BalanceSheetComponent implements OnInit {

  //#region "variables"

  //CONST
  ASSETS_ID: number = AccountHeadTypes_Enum.Assets;
  LIABILITY_ID: number = AccountHeadTypes_Enum.Liabilities;
  DONORS_EQUITY_ID: number = AccountHeadTypes_Enum.OwnersEquity;

  //DATASOURCE 
  assetsList: AccountTypeModel[] = [];
  liabilitiesList: AccountTypeModel[] = [];
  donorsEquityList: AccountTypeModel[] = [];

  //FLAG
  inputFieldAssetsFlag: boolean = false;
  inputFieldLiabilitiesFlag: boolean = false;
  inputFieldDonorsEquityFlag: boolean = false;

  //#endregion


  constructor(
    private globalService: GlobalService,
    private appUrl: AppUrlService,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.getBalanceSheetAccountTypes();
  }

  //#region "get"
  getBalanceSheetAccountTypes() {

    this.globalService.getListById(this.appUrl.getApiUrl() + GLOBAL.API_Code_GetAllAccountTypeByCategory, AccountCategory_Enum.BalanceSheet).subscribe(
      data => {
        if (data.StatusCode == 200) {
          if (data.data.AccountTypeList != null) {
            if (data.data.AccountTypeList.length > 0) {
              console.log('success get Http hit');

              let dataList: AccountTypeModel[] = [];

              data.data.AccountTypeList.forEach(element => {
                dataList.push({
                  Id: element.AccountTypeId,
                  Name: element.AccountTypeName,
                  AccountCategory: element.AccountCategory,
                  AccountHeadTypeId: element.AccountHeadTypeId
                });
              });

              this.assetsList = dataList.filter(x => x.AccountHeadTypeId == this.ASSETS_ID);
              this.liabilitiesList = dataList.filter(x => x.AccountHeadTypeId == this.LIABILITY_ID);
              this.donorsEquityList = dataList.filter(x => x.AccountHeadTypeId == this.DONORS_EQUITY_ID);

              dataList = []; //empty

            }
          }
        }
        else if (data.StatusCode == 400) {
          console.log(data.Message);
          this.snackBar.open("Something went wrong ! Try Again", 'Cancel', {
            duration: 2000,
          });
        }
      }
    );
  }
  //#endregion

  //#region "add"
  addBalanceSheetAccountTypes(model: any) {
    let obj: any = {};

    let index = model._index;
    let accountHeadTypeId = model.AccountHeadTypeId

    //error handling
    if (accountHeadTypeId === this.ASSETS_ID) {
      this.assetsList[index]._error = false;
    }
    else if (accountHeadTypeId === this.LIABILITY_ID) {
      this.liabilitiesList[index]._error = false;
    }
    else if (accountHeadTypeId === this.DONORS_EQUITY_ID) {
      this.donorsEquityList[index]._error = false;
    }

    obj = {
      AccountTypeId: model.Id,
      AccountHeadTypeId: model.AccountHeadTypeId,
      AccountCategory: model.AccountCategory,
      AccountTypeName: model.Name
    };

    this.globalService.post(this.appUrl.getApiUrl() + GLOBAL.API_Code_AddAccountType, obj).subscribe(
      data => {
        if (data.StatusCode === 200) {
          console.log('success Http hit');

          //error handling
          if (accountHeadTypeId === this.ASSETS_ID) {
            this.assetsList[index].Id = data.CommonId.Id;
            console.log(this.assetsList[index]);
          }
          else if (accountHeadTypeId === this.LIABILITY_ID) {
            this.liabilitiesList[index].Id = data.CommonId.Id;
            console.log(this.liabilitiesList[index]);
          }
          else if (accountHeadTypeId === this.DONORS_EQUITY_ID) {
            this.donorsEquityList[index].Id = data.CommonId.Id;
            console.log(this.donorsEquityList[index]);
          }

        }
        else if (data.StatusCode == 400) {
          console.log(data.Message);

        }
      },
      error => {
        if (accountHeadTypeId === this.ASSETS_ID) {
          this.assetsList[index]._error = true;
        }
        else if (accountHeadTypeId === this.LIABILITY_ID) {
          this.liabilitiesList[index]._error = true;
        }
        else if (accountHeadTypeId === this.DONORS_EQUITY_ID) {
          this.donorsEquityList[index]._error = true;
        }

        console.log(error);
        this.snackBar.open("Something went wrong ! Try Again", 'Cancel', {
          duration: 2000,
        });
      }
    );
  }
  //#endregion

  //#region "edit"
  editBalanceSheetAccountTypes(model: any) {
    let obj: any = {};
    // let accountHeadTypeId = model.AccountHeadTypeId

    obj = {
      AccountTypeId: model.Id,
      AccountHeadTypeId: model.AccountHeadTypeId,
      AccountCategory: model.AccountCategory,
      AccountTypeName: model.Name,
      _error: false
    };

    //#region "error handling"

    if (model.AccountHeadTypeId === this.ASSETS_ID) {
      let item = this.assetsList.find(x => x.Id == model.Id);
      const index = this.assetsList.indexOf(item);
      this.assetsList[index]._error = false;
    }
    else if (model.AccountHeadTypeId === this.LIABILITY_ID) {
      let item = this.liabilitiesList.find(x => x.Id == model.Id);
      const index = this.liabilitiesList.indexOf(item);
      this.liabilitiesList[index]._error = false;
    }
    else if (model.AccountHeadTypeId === this.DONORS_EQUITY_ID) {
      let item = this.donorsEquityList.find(x => x.Id == model.Id);
      const index = this.donorsEquityList.indexOf(item);
      this.donorsEquityList[index]._error = false;
    }

    //#endregion

    this.globalService.post(this.appUrl.getApiUrl() + GLOBAL.API_Code_EditAccountType, obj).subscribe(
      data => {
        if (data.StatusCode === 200) {
          console.log('success Http hit');
        }
        else if (data.StatusCode == 400) {

          //#region "error handling"
          if (model.AccountHeadTypeId === this.ASSETS_ID) {
            let item = this.assetsList.find(x => x.Id == model.Id);
            const index = this.assetsList.indexOf(item);
            this.assetsList[index]._error = true;
          }
          else if (model.AccountHeadTypeId === this.LIABILITY_ID) {
            let item = this.liabilitiesList.find(x => x.Id == model.Id);
            const index = this.liabilitiesList.indexOf(item);
            this.liabilitiesList[index]._error = true;
          }
          else if (model.AccountHeadTypeId === this.DONORS_EQUITY_ID) {
            let item = this.donorsEquityList.find(x => x.Id == model.Id);
            const index = this.donorsEquityList.indexOf(item);
            this.donorsEquityList[index]._error = true;
          }
          //#endregion 

          this.snackBar.open("'" + obj.AccountTypeName + "'" + data.Message, 'Cancel', {
            duration: 2000,
          });
          console.log(data.Message);
        }
      },
      error => {
        //#region "error handling"
        if (model.AccountHeadTypeId === this.ASSETS_ID) {
          let item = this.assetsList.find(x => x.Id == model.Id);
          const index = this.assetsList.indexOf(item);
          this.assetsList[index]._error = true;
        }
        else if (model.AccountHeadTypeId === this.LIABILITY_ID) {
          let item = this.liabilitiesList.find(x => x.Id == model.Id);
          const index = this.liabilitiesList.indexOf(item);
          this.liabilitiesList[index]._error = true;
        }
        else if (model.AccountHeadTypeId === this.DONORS_EQUITY_ID) {
          let item = this.donorsEquityList.find(x => x.Id == model.Id);
          const index = this.donorsEquityList.indexOf(item);
          this.donorsEquityList[index]._error = true;
        }
        //#endregion 

        console.log(error);
        this.snackBar.open("Something went wrong !", 'Cancel', {
          duration: 2000,
        });
      }
    );
  }
  //#endregion

  //#region "onAdd"
  onAdd(type: number, value: string) {
    let obj: AccountTypeModel = {};
    if (type === this.ASSETS_ID) {
      this.toggleInputFieldAssets();

      obj = {
        Id: 0,
        AccountHeadTypeId: this.ASSETS_ID,
        AccountCategory: AccountCategory_Enum.BalanceSheet,
        Name: value,
        _index: this.assetsList.length
      };
      this.assetsList.push(obj);
    }
    else if (type === this.LIABILITY_ID) {
      this.toggleInputFieldLiabilities();

      obj = {
        Id: 0,
        AccountHeadTypeId: this.LIABILITY_ID,
        AccountCategory: AccountCategory_Enum.BalanceSheet,
        Name: value,
        _index: this.liabilitiesList.length
      };
      this.liabilitiesList.push(obj);
    }
    else if (type === this.DONORS_EQUITY_ID) {
      this.toggleInputFieldDonorsEquity();

      obj = {
        Id: 0,
        AccountHeadTypeId: this.DONORS_EQUITY_ID,
        AccountCategory: AccountCategory_Enum.BalanceSheet,
        Name: value,
        _index: this.donorsEquityList.length
      };

      this.donorsEquityList.push(obj);
    }

    this.addBalanceSheetAccountTypes(obj);
    console.log(value);
  }
  //#endregion

  //#region "Emit"
  onValueChangeEmit(data) {
    console.log(this.donorsEquityList);
    console.log(data);
    console.log(data.Id, data.Name);
    this.editBalanceSheetAccountTypes(data);
  }

  addActionEmit(data) {
    console.log(data);
    console.log(data.Id, data.Name);
    this.addBalanceSheetAccountTypes(data);
  }
  //#endregion

  //#region "show / hide"
  toggleInputFieldAssets() {
    this.inputFieldAssetsFlag = !this.inputFieldAssetsFlag;
  }

  toggleInputFieldLiabilities() {
    this.inputFieldLiabilitiesFlag = !this.inputFieldLiabilitiesFlag;
  }

  toggleInputFieldDonorsEquity() {
    this.inputFieldDonorsEquityFlag = !this.inputFieldDonorsEquityFlag;
  }
  //#endregion


}
