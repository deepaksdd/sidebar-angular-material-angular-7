import { NgModule } from '@angular/core';
import { LibraryComponent } from './library.component';
import { InlineEditComponent } from './components/inline-edit/inline-edit.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    MatProgressSpinnerModule      
  ],
  declarations: [
    LibraryComponent, 
    InlineEditComponent
  ],
  exports: [
    LibraryComponent,
    InlineEditComponent
  ]
})
export class LibraryModule { }
