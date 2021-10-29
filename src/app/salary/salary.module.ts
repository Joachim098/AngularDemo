import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TaxComponent } from './tax.component';
import { SalaryListComponent } from './salary-list/salary-list.component';


@NgModule({
  declarations: [
    TaxComponent,
    SalaryListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: []
})
export class SalaryModule { }
