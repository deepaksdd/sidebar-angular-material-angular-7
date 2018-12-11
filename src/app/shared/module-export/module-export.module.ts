import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {
  MatTabsModule,
  MatSnackBarModule,
  MatDialogModule,
  MatSelectModule,
  MatDividerModule,
  MatTreeModule,
  MatProgressSpinnerModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatIconModule,
  MatChipsModule,
  MatTooltipModule,
  MatProgressBarModule,
  MatAutocompleteModule,
  MatSlideToggleModule,
  MatRadioModule,
  MatButtonToggleModule,
  MatExpansionModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LibraryModule } from '../../../../projects/library/src/public_api';
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  HttpHandler
} from '@angular/common/http';
import { DataInterceptor } from '../services/data-interceptor';
import { DbHeaderComponent } from '../../components/db-header/db-header.component';
import { GlobalService } from '../services/global-services.service';

@NgModule({
  declarations: [
    // components
    // DbHeaderComponent
  ],
  imports: [
    // Custom Modules
    LibraryModule,

    // Modules
    FormsModule,
    ReactiveFormsModule,

    // material
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    MatTabsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatTreeModule,
    MatSelectModule,
    MatDividerModule,
    MatChipsModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatButtonToggleModule,
    MatExpansionModule
  ],
  exports: [
    // DbHeaderComponent,

    // Custom Modules
    LibraryModule,

    // Modules
    FormsModule,
    ReactiveFormsModule,

    // material
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    MatTabsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSelectModule,
    MatDividerModule,
    MatTreeModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatChipsModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatButtonToggleModule,
    MatExpansionModule
  ],
  providers: [
    GlobalService
  ]
})
export class ModuleExportModule {}
