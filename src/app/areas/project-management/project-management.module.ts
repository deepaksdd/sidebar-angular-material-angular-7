import { ProjectListComponent } from './project-list/project-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectManagementComponent } from './project-management.component';
import { ProjectManagementRoutingModule } from './project-management-routing.module';
import { ProposalsComponent } from './proposals/proposals.component';
import { ProjectDetailsComponent } from './project-list/project-details/project-details.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
// import { projectManagementReducers } from './shared/prioject-management.state';
// import { ProjectListEffects } from './project-list/state-manager/effects/project-list.effects';
import { ProjectListService } from './project-list/service/project-list.service';
import { MetadataComponent } from './project-list/metadata/metadata.component';
import { ProposalComponent } from './project-list/proposal/proposal.component';
import { BiddingCommitteeComponent } from './project-list/bidding-committee/bidding-committee.component';
import { BudgetlinesComponent } from './project-list/budgetlines/budgetlines.component';
import { ChatboxComponent } from './project-list/project-details/chatbox/chatbox.component';
import { DonorMasterComponent } from './project-list/donor-master/donor-master.component';
import { ProgramAreaSectorComponent } from './project-list/project-details/program-area-sector/program-area-sector.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MultiSelectModule } from 'primeng/multiselect';
import { DonorMasterListComponent } from './project-list/donor-master-list/donor-master-list.component';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { AcceptProposalComponent } from './project-list/accept-proposal/accept-proposal.component';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { ProjectOtherDetailComponent } from './project-list/project-details/project-other-detail/project-other-detail.component';
import { FileDropModule } from 'ngx-file-drop';
import { CriteriaEvaluationComponent } from './project-list/criteria-evaluation/criteria-evaluation.component';
import { ModuleExportModule } from '../../shared/module-export/module-export.module';

@NgModule({
  imports: [
    CommonModule,
    ProjectManagementRoutingModule,
    ModuleExportModule,

    AutoCompleteModule,
    PaginatorModule,
    TableModule,
    MultiSelectModule,
    CalendarModule,
    DropdownModule,
    FileDropModule
    // StoreModule.forFeature('project-management', projectManagementReducers),
    // EffectsModule.forFeature([ProjectListEffects]),
  ],
  declarations: [
    ProjectManagementComponent,
    ProposalsComponent,
    ProjectListComponent,
    ProjectDetailsComponent,
    MetadataComponent,
    ProposalComponent,
    BiddingCommitteeComponent,
    BudgetlinesComponent,
    ChatboxComponent,
    DonorMasterComponent,
    DonorMasterListComponent,
    ProgramAreaSectorComponent,
    AcceptProposalComponent,
    ProjectOtherDetailComponent,
    CriteriaEvaluationComponent
  ],
  providers: [
    // AuthGuard, // Auth Guard,
    ProjectListService
  ],
})
export class ProjectManagementModule { }
