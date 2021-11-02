import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TaxComponent } from './tax.component';
import { SalaryListComponent } from './salary-list/salary-list.component';
import { SalaryDetailComponent } from './salary-detail/salary-detail.component';
import { RouterModule } from '@angular/router';
import { DatePipePipe } from '../pipes/date-pipe.pipe';


@NgModule({
  declarations: [
    TaxComponent,
    SalaryListComponent,
    SalaryDetailComponent,
    DatePipePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: 'salary-record', component: TaxComponent},
      {path: 'salary-list', component: SalaryListComponent},
      {path: '', redirectTo: 'salary-record', pathMatch: 'full'}
    ])
  ],
  exports: []
})
export class SalaryModule { }
