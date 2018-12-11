import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-db-sidebar',
  templateUrl: './db-sidebar.component.html',
  styleUrls: ['./db-sidebar.component.scss']
})
export class DbSidebarComponent implements OnInit {


  // accountingModule = UIModuleHeaders.AccountingModule;
  // projectModule = UIModuleHeaders.ProjectModule;
  // marketingModule = UIModuleHeaders.MarketingModule;
  // projectModuleDetail = UIModuleHeaders.ProjectModuleDetail;

  // flag
  sidebarFlag = false;

  constructor(
    private router: Router,
    // private globalService: GlobalService

  ) { }

  ngOnInit() {
    // $(".icon-wrap").click(function () {
    //   $(this).find(".bar").toggleClass("open")

    // });
    // $(".icon-wrap").click(function () {
    //   $(".nav-side-menu").toggleClass("open")
    // });
  }

  onsideBarLinkClicked(routePath: string) {
    // this.globalService.selectedModule = selectedModule;
    // console.log(this.globalService.selectedModule);
    this.router.navigate([routePath]);
  }



  // showHideSideBar() {
  //   this.sidebarFlag = !this.sidebarFlag;
  // }



}
