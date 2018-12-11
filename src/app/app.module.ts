import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {ScrollingModule} from '@angular/cdk/scrolling';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';
import { LoginComponent } from './components/login/login.component';
import { DbSidebarComponent } from './components/db-sidebar/db-sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonLoaderComponent } from './components/common-loader/common-loader.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DbHeaderComponent } from './components/db-header/db-header.component';
import { GlobalService } from './shared/services/global-services.service';
import { CommonLoaderService } from './components/common-loader/common-loader.service';
import { AppUrlService } from './shared/services/app-url.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DataInterceptor } from './shared/services/data-interceptor';
import { AuthGuard } from './shared/auth/AuthGuard';
import { DbstyleGuideComponent } from './components/dbstyle-guide/dbstyle-guide.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DbSidebarComponent,
    DbstyleGuideComponent,
    CommonLoaderComponent,
    DbHeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

     // Modules
     FormsModule,
     ReactiveFormsModule,
     HttpClientModule,
     NgxSpinnerModule,

     // material
     MatInputModule,
     MatAutocompleteModule,

    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    ScrollingModule
  ],
  exports: [
    // BrowserModule,
    // AppRoutingModule,
    // BrowserAnimationsModule,

    //  // Modules
    //  FormsModule,
    //  ReactiveFormsModule,
    //  NgxSpinnerModule,

    //  // material
    //  MatInputModule,
    //  MatAutocompleteModule,

    // MatBadgeModule,
    // MatBottomSheetModule,
    // MatButtonModule,
    // MatButtonToggleModule,
    // MatCardModule,
    // MatCheckboxModule,
    // MatChipsModule,
    // MatStepperModule,
    // MatDatepickerModule,
    // MatDialogModule,
    // MatDividerModule,
    // MatExpansionModule,
    // MatGridListModule,
    // MatIconModule,
    // MatListModule,
    // MatMenuModule,
    // MatNativeDateModule,
    // MatPaginatorModule,
    // MatProgressBarModule,
    // MatProgressSpinnerModule,
    // MatRadioModule,
    // MatRippleModule,
    // MatSelectModule,
    // MatSidenavModule,
    // MatSliderModule,
    // MatSlideToggleModule,
    // MatSnackBarModule,
    // MatSortModule,
    // MatTableModule,
    // MatTabsModule,
    // MatToolbarModule,
    // MatTooltipModule,
    // MatTreeModule,
    // ScrollingModule,

    DbHeaderComponent
  ],
  providers: [
    AuthGuard,
    // { provide: HttpHandler, useClass: DataInterceptor },
    GlobalService,
    CommonLoaderService,
    AppUrlService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DataInterceptor,
      multi: true,
    },
    // { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
