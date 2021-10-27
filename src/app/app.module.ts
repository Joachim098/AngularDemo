import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SalaryModule } from './salary/salary.module';
import { RouterModule } from '@angular/router';
import { SalaryListComponent } from './salary/salary-list/salary-list.component';
import { TaxComponent } from './salary/tax.component';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SalaryModule,
    RouterModule.forRoot([
      {path: 'salary-record', component: TaxComponent},
      {path: 'salary-list', component: SalaryListComponent},
      {path: '', redirectTo: 'salary-record', pathMatch: 'full'}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
