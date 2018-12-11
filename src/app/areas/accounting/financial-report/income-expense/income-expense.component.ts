import { Component, OnInit } from '@angular/core';
import { AccountHeadTypes_Enum, AccountCategory_Enum } from '../../../../shared/enum';
import { AccountTypeModel } from '../models/financial-report.model';
import { GlobalService } from '../../../../shared/services/global-services.service';
import { AppUrlService } from '../../../../shared/services/app-url.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GLOBAL } from '../../../../shared/global';

@Component({
  selector: 'app-income-expense',
  templateUrl: './income-expense.component.html',
  styleUrls: ['./income-expense.component.scss']
})
export class IncomeExpenseComponent implements OnInit {
  //#region "variables"

  //CONST
  INCOME_ID: number = AccountHeadTypes_Enum.Income;
  EXPENSE_ID: number = AccountHeadTypes_Enum.Expense;

  //DATASOURCE 
  incomeList: AccountTypeModel[] = [];
  expenseList: AccountTypeModel[] = [];

  //FLAG
  inputFieldIncomeFlag: boolean = false;
  inputFieldExpenseFlag: boolean = false;

  //#endregion


  constructor(
    private globalService: GlobalService,
    private appUrl: AppUrlService,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.getIncomeExpenseAccountTypes();
  }

  //#region "get"
  getIncomeExpenseAccountTypes() {

    this.globalService.getListById(this.appUrl.getApiUrl() + GLOBAL.API_Code_GetAllAccountTypeByCategory, AccountCategory_Enum.IncomeExpenseReport).subscribe(
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

              this.incomeList = dataList.filter(x => x.AccountHeadTypeId == this.INCOME_ID);
              this.expenseList = dataList.filter(x => x.AccountHeadTypeId == this.EXPENSE_ID);

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
  addIncomeExpenseAccountTypes(model: any) {
    let obj: any = {};

    let index = model._index;
    let accountHeadTypeId = model.AccountHeadTypeId

    //error handling
    if (accountHeadTypeId === this.INCOME_ID) {
      this.incomeList[index]._error = false;
    }
    else if (accountHeadTypeId === this.EXPENSE_ID) {
      this.expenseList[index]._error = false;
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

          if (accountHeadTypeId === this.INCOME_ID) {
            this.incomeList[index].Id = data.CommonId.Id;
            console.log(this.incomeList[index]);
          }
          else if (accountHeadTypeId === this.EXPENSE_ID) {
            this.expenseList[index].Id = data.CommonId.Id;
            console.log(this.expenseList[index]);
          }

        }
        else if (data.StatusCode == 400) {
          console.log(data.Message);
          this.snackBar.open(data.Message, 'Cancel', {
            duration: 2000,
          });
        }
      },
      error => {
        //error handling
        if (accountHeadTypeId === this.INCOME_ID) {
          this.incomeList[index]._error = true;
        }
        else if (accountHeadTypeId === this.EXPENSE_ID) {
          this.expenseList[index]._error = true;
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
  editIncomeExpenseAccountTypes(model: any) {
    let obj: any = {};
    // let accountHeadTypeId = model.AccountHeadTypeId

    obj = {
      AccountTypeId: model.Id,
      AccountHeadTypeId: model.AccountHeadTypeId,
      AccountCategory: model.AccountCategory,
      AccountTypeName: model.Name
    };

    //#region "error handling"
    if (model.AccountHeadTypeId === this.INCOME_ID) {
      let item = this.incomeList.find(x => x.Id == model.Id);
      const index = this.incomeList.indexOf(item);
      this.incomeList[index]._error = false;
    }
    else if (model.AccountHeadTypeId === this.EXPENSE_ID) {
      let item = this.expenseList.find(x => x.Id == model.Id);
      const index = this.expenseList.indexOf(item);
      this.expenseList[index]._error = false;
    }
    //#endregion 

    this.globalService.post(this.appUrl.getApiUrl() + GLOBAL.API_Code_EditAccountType, obj).subscribe(
      data => {
        if (data.StatusCode === 200) {
          console.log('success Http hit');
        }
        else if (data.StatusCode == 400) {

          //#region "error handling"
          if (model.AccountHeadTypeId === this.INCOME_ID) {
            
            let item = this.incomeList.find(x => x.Id == model.Id);
            const index = this.incomeList.indexOf(item);
            this.incomeList[index]._error = true;
          }
          else if (model.AccountHeadTypeId === this.EXPENSE_ID) {
            let item = this.expenseList.find(x => x.Id == model.Id);
            const index = this.expenseList.indexOf(item);
            this.expenseList[index]._error = true;
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
        if (model.AccountHeadTypeId === this.INCOME_ID) {
          let item = this.incomeList.find(x => x.Id == model.Id);
          const index = this.incomeList.indexOf(item);
          this.incomeList[index]._error = true;
        }
        else if (model.AccountHeadTypeId === this.EXPENSE_ID) {
          let item = this.expenseList.find(x => x.Id == model.Id);
          const index = this.expenseList.indexOf(item);
          this.expenseList[index]._error = true;
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
    if (type === this.INCOME_ID) {
      this.toggleInputFieldIncome();

      obj = {
        Id: 0,
        AccountHeadTypeId: this.INCOME_ID,
        AccountCategory: AccountCategory_Enum.IncomeExpenseReport,
        Name: value,
        _index: this.incomeList.length,
        _error: false
      };
      this.incomeList.push(obj);
    }
    else if (type === this.EXPENSE_ID) {
      this.toggleInputFieldExpense();

      obj = {
        Id: 0,
        AccountHeadTypeId: this.EXPENSE_ID,
        AccountCategory: AccountCategory_Enum.IncomeExpenseReport,
        Name: value,
        _index: this.expenseList.length,
        _error: false
      };
      this.expenseList.push(obj);
    }

    this.addIncomeExpenseAccountTypes(obj);
    console.log(value);
  }
  //#endregion

  //#region "Emit"
  onValueChangeEmit(data) {
    console.log(data);
    console.log(data.Id, data.Name);
    this.editIncomeExpenseAccountTypes(data);
  }

  addActionEmit(data) {
    console.log(data);
    console.log(data.Id, data.Name);
    this.addIncomeExpenseAccountTypes(data);
  }
  //#endregion



  //#region "show / hide"
  toggleInputFieldIncome() {
    this.inputFieldIncomeFlag = !this.inputFieldIncomeFlag;
  }

  toggleInputFieldExpense() {
    this.inputFieldExpenseFlag = !this.inputFieldExpenseFlag;
  }
  //#endregion

}
