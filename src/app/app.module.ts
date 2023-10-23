import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { GridComponent } from './grid/grid.component';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { MultiSelectModule } from 'primeng/multiselect';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { SortIcon } from 'primeng/table';
import { ColumnFilter } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SliderModule } from 'primeng/slider';
import { DialogModule } from 'primeng/dialog';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [AppComponent, GridComponent, ModalComponent],
  imports: [
    BrowserModule,
    TableModule,
    DropdownModule,
    ToastModule,
    FormsModule,
    HttpClientModule,
    MultiSelectModule,
    SliderModule,
    BrowserAnimationsModule,
    ButtonModule,
    DialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
