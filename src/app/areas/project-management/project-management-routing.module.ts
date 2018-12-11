import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectManagementComponent } from './project-management.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProposalsComponent } from './proposals/proposals.component';
import { ProjectDetailsComponent } from './project-list/project-details/project-details.component';
import { DonorMasterComponent } from './project-list/donor-master/donor-master.component';
import { ProgramAreaSectorComponent } from './project-list/project-details/program-area-sector/program-area-sector.component';
import { DonorMasterListComponent } from './project-list/donor-master-list/donor-master-list.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectManagementComponent,
    children: [
       {
        path: 'projects',
        component: ProjectListComponent
      },
      {
        // NOTE: Best Routing for changeing the URL by working on show / Hide component
        // DISCLAMER: Dont change this
        path: 'Donorlist',
        component: DonorMasterListComponent
      },
      {
        path: 'donor-master/:id',
        component: DonorMasterComponent
      },
      {
        path: 'donormasterlist',
        component: DonorMasterListComponent
      },
      // {
      //     path: 'donormaster/:id', component: DonorMasterComponent,
      // },
      {
        path: 'project/:id',
        component: ProjectDetailsComponent
      },
      {
        path: 'proposals',
        component: ProposalsComponent
      },
      { path: 'donormaster/:id', component: DonorMasterComponent },
      { path: 'programAreaSector/:id', component: ProgramAreaSectorComponent },
      {
        path: '',
        redirectTo: 'projects',
        pathMatch: 'full'
      },
    ]
  },
  // { path: 'projects', component: ProjectListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule] // important to export
})
export class ProjectManagementRoutingModule {}
