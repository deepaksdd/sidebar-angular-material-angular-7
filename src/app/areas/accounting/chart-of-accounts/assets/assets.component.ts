import { Component, OnInit } from '@angular/core';
import {
  ChartOfAccountModel,
  AccountFilterTypeModel,
  AccountTypeModel
} from '../models/chart-of-account.model';
import { GlobalService } from '../../../../shared/services/global-services.service';
import { AppUrlService } from '../../../../shared/services/app-url.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GLOBAL } from '../../../../shared/global';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { AccountLevels, AccountHeadTypes_Enum } from '../../../../shared/enum';
import { CommonLoaderService } from '../../../../components/common-loader/common-loader.service';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss']
})
export class AssetsComponent implements OnInit {
  //#region "variables"
  ACCOUNT_HEAD_TYPE = AccountHeadTypes_Enum.Assets;

  // Form
  mainLevelList: ChartOfAccountModel[];
  mainLevelAccountName = new FormControl('', [Validators.required]);
  controlLevelForm = this.fb.group({
    AccountName: ['', [Validators.required]],
    FilterTypeId: ['', [Validators.required]],
    AccountTypeId: ['', [Validators.required]]
  });

  //  {    validators: Validators.required,    updateOn: 'blur'  });

  chartOfAccountList: ChartOfAccountModel[] = [];
  accountFilterTypeList: AccountFilterTypeModel[];
  accountTypeList: AccountTypeModel[];

  // flag
  showAddMainLevelAccountFlag = false;

  //#endregion

  constructor(
    private globalService: GlobalService,
    private appUrl: AppUrlService,
    public snackBar: MatSnackBar,
    private fb: FormBuilder,
    public commonLoaderService: CommonLoaderService
  ) {}

  ngOnInit() {
    this.initList();
    this.getAllAccountFilterType();
    this.getAllAccountTypeByCategory();
    this.getMainLevelAccount(this.ACCOUNT_HEAD_TYPE);
  }
  initList() {}

  //#region "on main level click, get control level account"
  onMainLevelClicked(model: any) {
    console.log(model.ChartOfAccountNewId, model.AccountName);
    // this.getAccountByParentId(data);

    this.commonLoaderService.showLoader();

    this.globalService
      .getListById(
        this.appUrl.getApiUrl() + GLOBAL.API_Account_GetAllAccountsByParentId,
        model.ChartOfAccountNewId
      )
      .subscribe(
        data => {
          if (data.StatusCode === 200) {
            if (data.data.AllAccountList != null) {
              if (data.data.AllAccountList.length > 0) {
                console.log('success Main level ----');

                // Main Level
                const mainLevelItem = this.chartOfAccountList.find(
                  x => x.ChartOfAccountNewId === model.ChartOfAccountNewId
                );
                const mainLevelIndex = this.chartOfAccountList.indexOf(
                  mainLevelItem
                );

                this.chartOfAccountList[mainLevelIndex].Children = []; // intitialize

                data.data.AllAccountList.forEach(element => {
                  this.chartOfAccountList[mainLevelIndex].Children.push({
                    ChartOfAccountNewId: element.ChartOfAccountNewId,
                    AccountName: element.AccountName,
                    ChartOfAccountNewCode: element.ChartOfAccountNewCode,
                    ParentID: element.ParentID,
                    AccountHeadTypeId: element.AccountHeadTypeId,
                    AccountLevelId: element.AccountLevelId,
                    AccountTypeId: element.AccountTypeId,
                    AccountFilterTypeId: element.AccountFilterTypeId
                  });
                });
              }
            }
          }

          this.commonLoaderService.hideLoader();
        },
        error => {
          this.commonLoaderService.hideLoader();
        }
      );
  }
  //#endregion

  //#region "on control level click, get sub level account"
  onControlLevelClicked(mainLevel: any, model: any) {
    console.log(mainLevel);
    console.log(model);

    console.log(mainLevel.ChartOfAccountNewId, model.AccountName);

    this.commonLoaderService.showLoader();

    this.globalService
      .getListById(
        this.appUrl.getApiUrl() + GLOBAL.API_Account_GetAllAccountsByParentId,
        model.ChartOfAccountNewId
      )
      .subscribe(
        data => {
          if (data.StatusCode === 200) {
            if (data.data.AllAccountList != null) {
              if (data.data.AllAccountList.length > 0) {
                console.log('success Control level ----');

                // Main Level
                const mainLevelItem = this.chartOfAccountList.find(
                  x => x.ParentID === mainLevel.ChartOfAccountNewId
                );
                const mainLevelIndex = this.chartOfAccountList.indexOf(
                  mainLevelItem
                );

                // Control Level
                const controlLevelItem = this.chartOfAccountList[
                  mainLevelIndex
                ].Children.find(
                  x => x.ChartOfAccountNewId === model.ChartOfAccountNewId
                );
                const controlLevelIndex = this.chartOfAccountList[
                  mainLevelIndex
                ].Children.indexOf(controlLevelItem);

                this.chartOfAccountList[mainLevelIndex].Children[
                  controlLevelIndex
                ].Children = []; // intitialize

                data.data.AllAccountList.forEach(element => {
                  this.chartOfAccountList[mainLevelIndex].Children[
                    controlLevelIndex
                  ].Children.push({
                    ChartOfAccountNewId: element.ChartOfAccountNewId,
                    AccountName: element.AccountName,
                    ChartOfAccountNewCode: element.ChartOfAccountNewCode,
                    ParentID: element.ParentID,
                    AccountHeadTypeId: element.AccountHeadTypeId,
                    AccountLevelId: element.AccountLevelId,
                    AccountTypeId: element.AccountTypeId,
                    AccountFilterTypeId: element.AccountFilterTypeId
                  });
                });
              }
            }
          }

          this.commonLoaderService.hideLoader();
        },
        error => {
          this.commonLoaderService.hideLoader();
        }
      );
  }
  //#endregion

  //#region "on sub level click, get input level account"
  onSubLevelClicked(mainLevel, controlLevel, model) {
    console.log(mainLevel);
    console.log(controlLevel);
    console.log(model);

    console.log(model.ChartOfAccountNewId, model.AccountName);

    this.commonLoaderService.showLoader();

    this.globalService
      .getListById(
        this.appUrl.getApiUrl() + GLOBAL.API_Account_GetAllAccountsByParentId,
        model.ChartOfAccountNewId
      )
      .subscribe(
        data => {
          if (data.StatusCode === 200) {
            if (data.data.AllAccountList != null) {
              if (data.data.AllAccountList.length > 0) {
                console.log('success Control level ----');

                // Main Level
                const mainLevelItem = this.chartOfAccountList.find(
                  x => x.ParentID === mainLevel.ChartOfAccountNewId
                );
                const mainLevelIndex = this.chartOfAccountList.indexOf(
                  mainLevelItem
                );

                // Control Level
                const controlLevelItem = this.chartOfAccountList[
                  mainLevelIndex
                ].Children.find(
                  x =>
                    x.ChartOfAccountNewId === controlLevel.ChartOfAccountNewId
                );
                const controlLevelIndex = this.chartOfAccountList[
                  mainLevelIndex
                ].Children.indexOf(controlLevelItem);

                // Sub Level
                const subLevelItem = this.chartOfAccountList[
                  mainLevelIndex
                ].Children[controlLevelIndex].Children.find(
                  x => x.ChartOfAccountNewId === model.ChartOfAccountNewId
                );
                const subLevelIndex = this.chartOfAccountList[
                  mainLevelIndex
                ].Children[controlLevelIndex].Children.indexOf(subLevelItem);

                this.chartOfAccountList[mainLevelIndex].Children[
                  controlLevelIndex
                ].Children[subLevelIndex].Children = []; // intitialize

                data.data.AllAccountList.forEach(element => {
                  this.chartOfAccountList[mainLevelIndex].Children[
                    controlLevelIndex
                  ].Children[subLevelIndex].Children.push({
                    ChartOfAccountNewId: element.ChartOfAccountNewId,
                    AccountName: element.AccountName,
                    ChartOfAccountNewCode: element.ChartOfAccountNewCode,
                    ParentID: element.ParentID,
                    AccountHeadTypeId: element.AccountHeadTypeId,
                    AccountLevelId: element.AccountLevelId,
                    AccountTypeId: element.AccountTypeId,
                    AccountFilterTypeId: element.AccountFilterTypeId
                  });
                });
              }
            }
          }
          this.commonLoaderService.hideLoader();
        },
        error => {
          this.commonLoaderService.hideLoader();
        }
      );
  }
  //#endregion

  //#region "on input level click"
  onInputLevelClicked(mainLevel, controlLevel, subLevel, data) {
    console.log(mainLevel);
    console.log(controlLevel);
    console.log(subLevel);
    console.log(data);
  }
  //#endregion

  //#region "getAllAccountFilterType"
  getAllAccountFilterType() {
    this.accountFilterTypeList = [];

    this.commonLoaderService.showLoader();

    this.globalService
      .getList(this.appUrl.getApiUrl() + GLOBAL.API_Account_GetAllAccountFilter)
      .subscribe(
        data => {
          if (data.StatusCode === 200) {
            if (data.data.AllAccountFilterList != null) {
              if (data.data.AllAccountFilterList.length > 0) {
                console.log('success get Http hit');

                data.data.AllAccountFilterList.forEach(element => {
                  this.accountFilterTypeList.push({
                    AccountFilterTypeId: element.AccountFilterTypeId,
                    AccountFilterTypeName: element.AccountFilterTypeName
                  });
                });
              }
            }
          } else if (data.StatusCode === 400) {
            console.log(data.Message);
            this.snackBar.open('Something went wrong ! Try Again', 'Cancel', {
              duration: 2000
            });
          }

          this.commonLoaderService.hideLoader();
        },
        error => {
          this.commonLoaderService.hideLoader();
        }
      );
  }
  //#endregion

  //#region "getAllAccountTypeByCategory"
  getAllAccountTypeByCategory() {
    this.accountTypeList = [];
    this.globalService
      .getListById(
        this.appUrl.getApiUrl() +
          GLOBAL.API_Code_GetAllAccountByAccountHeadTypeId,
        this.ACCOUNT_HEAD_TYPE
      )
      .subscribe(data => {
        if (data.StatusCode === 200) {
          if (data.data.AccountTypeList != null) {
            if (data.data.AccountTypeList.length > 0) {
              console.log(data.data.AccountTypeList);

              data.data.AccountTypeList.forEach(element => {
                this.accountTypeList.push({
                  AccountTypeId: element.AccountTypeId,
                  AccountTypeName: element.AccountTypeName,
                  AccountCategory: element.AccountCategory,
                  AccountHeadTypeId: element.AccountHeadTypeId
                });
              });
            }
          }
        } else if (data.StatusCode === 400) {
          console.log(data.Message);
          this.snackBar.open('Something went wrong ! Try Again', 'Cancel', {
            duration: 2000
          });
        }
      });
  }
  //#endregion

  //#region "get"
  getMainLevelAccount(id: number) {
    this.chartOfAccountList = [];

    this.commonLoaderService.showLoader();

    this.globalService
      .getListById(
        this.appUrl.getApiUrl() + GLOBAL.API_Account_GetMainLevelAccount,
        id
      )
      .subscribe(
        data => {
          if (data.StatusCode === 200) {
            if (data.data.MainLevelAccountList != null) {
              if (data.data.MainLevelAccountList.length > 0) {
                console.log('success get Http hit');

                data.data.MainLevelAccountList.forEach(element => {
                  this.chartOfAccountList.push({
                    ChartOfAccountNewId: element.ChartOfAccountNewId,
                    AccountName: element.AccountName,
                    ChartOfAccountNewCode: element.ChartOfAccountNewCode,
                    ParentID: element.ParentID,
                    AccountHeadTypeId: element.AccountHeadTypeId,
                    AccountLevelId: element.AccountLevelId,
                    AccountTypeId: element.AccountTypeId,
                    AccountFilterTypeId: element.AccountFilterTypeId
                  });
                });
              }
            }
          } else if (data.StatusCode === 400) {
            console.log(data.Message);
            this.snackBar.open('Something went wrong ! Try Again', 'Cancel', {
              duration: 2000
            });
          }

          this.commonLoaderService.hideLoader();
        },
        error => {
          this.commonLoaderService.hideLoader();
        }
      );
  }
  //#endregion

  //#region "add"
  addAccountDetail(model: any) {
    const obj: ChartOfAccountModel = {
      ChartOfAccountNewId: model.ChartOfAccountNewId,
      AccountName: model.AccountName,
      ParentID: model.ParentID,
      AccountLevelId: model.AccountLevelId,
      AccountHeadTypeId: model.AccountHeadTypeId,
      AccountTypeId: model.AccountTypeId,
      AccountFilterTypeId: model.AccountFilterTypeId
    };

    this.commonLoaderService.showLoader();

    this.globalService
      .post(this.appUrl.getApiUrl() + GLOBAL.API_Account_AddChartOfAccount, obj)
      .subscribe(
        data => {
          if (data.StatusCode === 200) {
            console.log('success Http hit');
            this.mainLevelAccountName.reset();
            this.onShowAddMainLevelAccount(); // hide
            this.getMainLevelAccount(this.ACCOUNT_HEAD_TYPE);
          } else if (data.StatusCode === 400) {
            console.log(data.Message);
            this.snackBar.open(data.Message, 'Cancel', {
              duration: 2000
            });
          }

          this.commonLoaderService.hideLoader();
        },
        error => {
          // error handling

          console.log(error);
          this.snackBar.open('Something went wrong ! Try Again', 'Cancel', {
            duration: 2000
          });

          this.commonLoaderService.hideLoader();
        }
      );
  }
  //#endregion

  //#region " addAny"
  addAnyAccountDetail(model: any) {
    const obj: ChartOfAccountModel = {
      ChartOfAccountNewId: model.ChartOfAccountNewId,
      AccountName: model.AccountName,
      ParentID: model.ParentID,
      AccountLevelId: model.AccountLevelId,
      AccountHeadTypeId: model.AccountHeadTypeId,
      AccountTypeId: model.AccountTypeId,
      AccountFilterTypeId: model.AccountFilterTypeId
    };

    this.commonLoaderService.showLoader();

    this.globalService
      .post(this.appUrl.getApiUrl() + GLOBAL.API_Account_AddChartOfAccount, obj)
      .subscribe(
        data => {
          if (data.StatusCode === 200) {
            console.log('success Http hit');
            this.getMainLevelAccount(this.ACCOUNT_HEAD_TYPE);
            console.log(data.CommonId.LongId);
          } else if (data.StatusCode === 400) {
            console.log(data.Message);
            this.snackBar.open(data.Message, 'Cancel', {
              duration: 2000
            });
          }

          this.commonLoaderService.hideLoader();
        },
        error => {
          // error handling

          console.log(error);
          this.snackBar.open('Something went wrong ! Try Again', 'Cancel', {
            duration: 2000
          });

          this.commonLoaderService.hideLoader();
        }
      );
  }
  //#endregion

  //#region "editAny"
  editAnyAccountDetail(model: any) {
    const obj: ChartOfAccountModel = {
      ChartOfAccountNewId: model.ChartOfAccountNewId,
      AccountName: model.AccountName,
      ParentID: model.ParentID,
      AccountLevelId: model.AccountLevelId,
      AccountHeadTypeId: model.AccountHeadTypeId,
      AccountTypeId: model.AccountTypeId,
      AccountFilterTypeId: model.AccountFilterTypeId
    };

    this.commonLoaderService.showLoader();

    this.globalService
      .post(
        this.appUrl.getApiUrl() + GLOBAL.API_Account_EditChartOfAccount,
        obj
      )
      .subscribe(
        data => {
          if (data.StatusCode === 200) {
            console.log('success Http hit');
            this.getMainLevelAccount(this.ACCOUNT_HEAD_TYPE);
            console.log(data.CommonId.LongId);
          } else if (data.StatusCode === 400) {
            console.log(data.Message);
            this.snackBar.open(data.Message, 'Cancel', {
              duration: 2000
            });
          }

          this.commonLoaderService.hideLoader();
        },
        error => {
          // error handling

          console.log(error);
          this.snackBar.open('Something went wrong ! Try Again', 'Cancel', {
            duration: 2000
          });

          this.commonLoaderService.hideLoader();
        }
      );
  }
  //#endregion

  //#region "onAddMainLevelAccount"
  onAddMainLevelAccount(data: string) {
    if (this.mainLevelAccountName.valid) {
      console.log(data);
      const obj: ChartOfAccountModel = {
        ChartOfAccountNewId: 0,
        AccountName: data,
        ParentID: -1,
        AccountHeadTypeId: AccountLevels.MainLevel,
        AccountLevelId: AccountLevels.MainLevel,
        AccountTypeId: AccountHeadTypes_Enum.Assets,
        AccountFilterTypeId: null
      };
      this.addAccountDetail(obj);
    }
  }
  //#endregion

  //#region "onAddSubLevelClicked"
  onAddSubLevelClicked(mainLevelData: any, controlLevelData: any, data: any) {
    console.log(data);
  }
  //#endregion

  //#region "onAddControlLevelAccount"
  onAddControlLevelAccount(mainLevelData: ChartOfAccountModel) {
    console.log(mainLevelData);
    const obj: ChartOfAccountModel = {
      ChartOfAccountNewId: 0,
      AccountName: '',
      ParentID: mainLevelData.ChartOfAccountNewId,
      AccountLevelId: AccountLevels.ControlLevel,
      AccountHeadTypeId: AccountHeadTypes_Enum.Assets,
      AccountTypeId: null,
      AccountFilterTypeId: null
    };
    this.addAnyAccountDetail(obj);
  }
  //#endregion

  //#region "onAddMainLevelAccount"
  onAddSubLevelAccount(
    mainLevelData: any,
    controlLevelData: ChartOfAccountModel
  ) {
    console.log(mainLevelData);
    console.log(controlLevelData);
    const obj: ChartOfAccountModel = {
      ChartOfAccountNewId: 0,
      AccountName: '',
      ParentID: controlLevelData.ChartOfAccountNewId,
      AccountLevelId: AccountLevels.SubLevel,
      AccountHeadTypeId: AccountHeadTypes_Enum.Assets,
      AccountTypeId: null,
      AccountFilterTypeId: null
    };
    this.addAnyAccountDetail(obj);
  }
  //#endregion

  //#region "onAddInputLevelAccount"
  onAddInputLevelAccount(
    mainLevelData: ChartOfAccountModel,
    controlLevelData: ChartOfAccountModel,
    subLevelData: ChartOfAccountModel
  ) {
    console.log(mainLevelData);
    console.log(controlLevelData);
    const obj: ChartOfAccountModel = {
      ChartOfAccountNewId: 0,
      AccountName: '',
      ParentID: subLevelData.ChartOfAccountNewId,
      AccountLevelId: AccountLevels.InputLevel,
      AccountHeadTypeId: AccountHeadTypes_Enum.Assets,
      AccountTypeId: null,
      AccountFilterTypeId: null
    };
    this.addAnyAccountDetail(obj);
  }
  //#endregion

  //#region "onBlurAddControlLevel"
  onBlurAddControlLevel(mainLevelData: any, data: any) {
    if (data !== '') {
      console.log(data);

      const controlLevelDetail: ChartOfAccountModel = {
        ChartOfAccountNewId: 0,
        AccountName: data,
        ParentID: mainLevelData.ChartOfAccountNewId,
        AccountLevelId: AccountLevels.ControlLevel,
        AccountHeadTypeId: this.ACCOUNT_HEAD_TYPE,
        AccountTypeId: null,
        AccountFilterTypeId: null
      };

      this.addAnyAccountDetail(controlLevelDetail);
      console.log('Id=======>>>>');
    }
  }
  //#endregion

  //#region "onBlurEditMainLevel_AccountName"
  onBlurEditMainLevelAccountName(mainLevelData: any, data: any) {
    if (data !== '') {
      console.log(mainLevelData);
      console.log(data);

      const mainLevelDetail: ChartOfAccountModel = {
        ChartOfAccountNewId: mainLevelData.ChartOfAccountNewId,
        AccountName: data,
        ParentID: mainLevelData.ParentID,
        AccountLevelId: AccountLevels.MainLevel,
        AccountHeadTypeId: this.ACCOUNT_HEAD_TYPE,
        AccountTypeId: mainLevelData.AccountTypeId,
        AccountFilterTypeId: mainLevelData.AccountFilterTypeId
      };

      this.editAnyAccountDetail(mainLevelDetail);
    }
  }
  //#endregion

  //#region "onBlurEditControlLevel_AccountName"
  onBlurEditControlLevelAccountName(controlLevelData: any, data: any) {
    if (data !== '') {
      console.log(controlLevelData);
      console.log(data);

      const controlLevelDetail: ChartOfAccountModel = {
        ChartOfAccountNewId: controlLevelData.ChartOfAccountNewId,
        AccountName: data,
        ParentID: controlLevelData.ParentID,
        AccountLevelId: AccountLevels.ControlLevel,
        AccountHeadTypeId: this.ACCOUNT_HEAD_TYPE,
        AccountTypeId: controlLevelData.AccountTypeId,
        AccountFilterTypeId: controlLevelData.AccountFilterTypeId
      };

      this.editAnyAccountDetail(controlLevelDetail);
    }
  }
  //#endregion

  //#region "onBlurEditSubLevel_AccountName"
  onBlurEditSubLevelAccountName(subLevelData: any, data: any) {
    if (data !== '') {
      console.log(subLevelData);
      console.log(data);

      const subLevelDetail: ChartOfAccountModel = {
        ChartOfAccountNewId: subLevelData.ChartOfAccountNewId,
        AccountName: data,
        ParentID: subLevelData.ParentID,
        AccountLevelId: AccountLevels.SubLevel,
        AccountHeadTypeId: this.ACCOUNT_HEAD_TYPE,
        AccountTypeId: subLevelData.AccountTypeId,
        AccountFilterTypeId: subLevelData.AccountFilterTypeId
      };

      this.editAnyAccountDetail(subLevelDetail);
    }
  }
  //#endregion

  //#region "onBlurEditSubLevel_AccountFilterType"
  onBlurEditSubLevelAccountFilterType(
    subLevelData: ChartOfAccountModel,
    data: any
  ) {
    if (data !== '') {
      console.log(subLevelData);
      console.log(data);

      const controlLevelDetail: ChartOfAccountModel = {
        ChartOfAccountNewId: subLevelData.ChartOfAccountNewId,
        AccountName: subLevelData.AccountName,
        ParentID: subLevelData.ParentID,
        AccountLevelId: AccountLevels.SubLevel,
        AccountHeadTypeId: this.ACCOUNT_HEAD_TYPE,
        AccountTypeId: subLevelData.AccountTypeId,
        AccountFilterTypeId: data
      };

      this.editAnyAccountDetail(controlLevelDetail);
    }
  }
  //#endregion

  //#region "onBlurEditSubLevel_AccountType"
  onBlurEditSubLevelAccountType(subLevelData: ChartOfAccountModel, data: any) {
    if (data !== '') {
      console.log(subLevelData);
      console.log(data);

      const controlLevelDetail: ChartOfAccountModel = {
        ChartOfAccountNewId: subLevelData.ChartOfAccountNewId,
        AccountName: subLevelData.AccountName,
        ParentID: subLevelData.ParentID,
        AccountLevelId: AccountLevels.SubLevel,
        AccountHeadTypeId: this.ACCOUNT_HEAD_TYPE,
        AccountTypeId: data,
        AccountFilterTypeId: subLevelData.AccountFilterTypeId
      };

      this.editAnyAccountDetail(controlLevelDetail);
    }
  }
  //#endregion

  //#region "onBlurEditInputLevelAccountName"
  onBlurEditInputLevelAccountName(inputLevelData: any, data: any) {
    if (data !== '') {
      console.log(inputLevelData);
      console.log(data);

      const subLevelDetail: ChartOfAccountModel = {
        ChartOfAccountNewId: inputLevelData.ChartOfAccountNewId,
        AccountName: data,
        ParentID: inputLevelData.ParentID,
        AccountLevelId: AccountLevels.InputLevel,
        AccountHeadTypeId: this.ACCOUNT_HEAD_TYPE,
        AccountTypeId: inputLevelData.AccountTypeId,
        AccountFilterTypeId: inputLevelData.AccountFilterTypeId
      };

      this.editAnyAccountDetail(subLevelDetail);
    }
  }
  //#endregion

  //#region "show/hide"
  onShowAddMainLevelAccount() {
    this.showAddMainLevelAccountFlag = !this.showAddMainLevelAccountFlag;
  }
  //#endregion
}
