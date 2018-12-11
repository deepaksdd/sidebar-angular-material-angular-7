import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketingComponent } from './marketing.component';
import { MarketingJobsComponent } from './marketing-jobs/marketing-jobs.component';
import { ContractsComponent } from './contracts/contracts.component';
import { BroadcastPolicyComponent } from './broadcast-policy/broadcast-policy.component';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { JobDetailsComponent } from './marketing-jobs/job-details/job-details.component';
import { MarketingRoutingModule } from './marketing-routing.module';
import { ContractDetailsComponent } from './contracts/contract-details/contract-details.component';
import { BroadcastPolicyDetailsComponent } from './broadcast-policy/broadcast-policy-details/broadcast-policy-details.component';
import { BroadcastPolicyService } from './broadcast-policy/service/broadcast-policy.service';
import { ContractsService } from './contracts/service/contracts.service';
import { MarketingJobsService } from './marketing-jobs/service/marketing-jobs.service';
import { SchedulerService } from './scheduler/service/scheduler.service';
import {
  MatSelectModule,
  MatDatepickerModule,
  MatIconModule,
  MatNativeDateModule,
  MatButtonToggleModule,
  MatRadioModule
} from '@angular/material';
import { ActivityTypeComponent } from './master-pages/activity-type/activity-type.component';
import { MediaCategoryComponent } from './master-pages/media-category/media-category.component';
import { TimeCategoryComponent } from './master-pages/time-category/time-category.component';
import { PhaseComponent } from './master-pages/phase/phase.component';
import { MediumComponent } from './master-pages/medium/medium.component';
import { NatureComponent } from './master-pages/nature/nature.component';
import { MatrixComponent } from './master-pages/matrix/matrix/matrix.component';
import { QualityComponent } from './master-pages/quality/quality.component';
import { UnitRateComponent } from './master-pages/unit-rate/unit-rate.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientDetailsComponent } from './clients/client-details/client-details.component';
import { NumberOnlyDirective } from '../../shared/Directive/number-only.directive';
import { CategoryDetailComponent } from './master-pages/media-category/category-detail/category-detail.component';
import { MediumDetailsComponent } from './master-pages/medium/medium-details/medium-details.component';
import { NautreDetailsComponent } from './master-pages/nature/nautre-details/nautre-details.component';
import { PhaseDetailsComponent } from './master-pages/phase/phase-details/phase-details.component';
import { TimeCategoryDetailsComponent } from './master-pages/time-category/time-category-details/time-category-details.component';
import { QualityDetailsComponent } from './master-pages/quality/quality-details/quality-details.component';
import { ActivitytypeDetailsComponent } from './master-pages/activity-type/activitytype-details/activitytype-details.component';
import { ModuleExportModule } from '../../shared/module-export/module-export.module';
@NgModule({
  imports: [
    CommonModule,
    MarketingRoutingModule,
    ModuleExportModule,

    MatSelectModule,
    MatDatepickerModule,
    MatButtonToggleModule,
    MatIconModule,
    MatNativeDateModule,
    MatRadioModule,
    MatDatepickerModule
  ],
  declarations: [
    NumberOnlyDirective,
    MarketingComponent,
    MarketingJobsComponent,
    ContractsComponent,
    BroadcastPolicyComponent,
    SchedulerComponent,
    JobDetailsComponent,
    ContractDetailsComponent,
    BroadcastPolicyDetailsComponent,
    ActivityTypeComponent,
    MediaCategoryComponent,
    TimeCategoryComponent,
    PhaseComponent,
    MediumComponent,
    NatureComponent,
    MatrixComponent,
    QualityComponent,
    UnitRateComponent,
    ClientsComponent,
    ClientDetailsComponent,
    CategoryDetailComponent,
    MediumDetailsComponent,
    NautreDetailsComponent,
    PhaseDetailsComponent,
    TimeCategoryDetailsComponent,
    QualityDetailsComponent,
    ActivitytypeDetailsComponent
  ],
  providers: [
    BroadcastPolicyService,
    ContractsService,
    MarketingJobsService,
    SchedulerService
  ],
  exports: [NumberOnlyDirective]
})
export class MarketingModule {}
