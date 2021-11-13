import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SalaryAddEditComponent } from './salary-add-edit/salary-add-edit.component';
import { SalaryListComponent } from './salary-list/salary-list.component';
import { SalaryDetailComponent } from './salary-detail/salary-detail.component';
import { RouterModule } from '@angular/router';
import { DatePipePipe } from '../pipes/date-pipe.pipe';


@NgModule({
  declarations: [
    SalaryAddEditComponent,
    SalaryListComponent,
    SalaryDetailComponent,
    DatePipePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: 'salary-record/:id', component: SalaryAddEditComponent},
      {path: 'salary-list', component: SalaryListComponent},
      {path: '', redirectTo: 'salary-record/0', pathMatch: 'full'},
      {path: '**', redirectTo: 'salary-record/0', pathMatch: 'full'}
    ])
  ],
  exports: []
})
export class SalaryModule { }
