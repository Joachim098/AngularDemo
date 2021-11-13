import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dates } from '../dates';
import { Salary } from '../salary';
import { YearMonth } from '../year-month';

@Component({
  selector: 'app-salary-list',
  templateUrl: './salary-list.component.html',
  styleUrls: ['./salary-list.component.css']
})
export class SalaryListComponent implements OnInit {
  show: Boolean = false;
  data: Salary;
  results: Salary[] = [];
  salary: Salary = new Salary();

  constructor(private route: ActivatedRoute) { 
    this.data = new Salary();
    this.data.id = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.data.companyName = this.route.snapshot.paramMap.get('name')!;
    this.data.amount = parseInt(this.route.snapshot.paramMap.get('amount')!);
    this.data.currency = this.route.snapshot.paramMap.get('currency')!;
    this.data.exactPeriod = this.route.snapshot.paramMap.get('period')!;

    if (this.data.exactPeriod.includes('Year')){
      this.data.taxYear = new YearMonth();
      this.data.taxYear.year = this.route.snapshot.paramMap.get('taxYear')!;
    }
    if (this.data.exactPeriod.includes('Month')){
      this.data.taxMonth = new YearMonth();
      this.data.taxMonth.month = this.route.snapshot.paramMap.get('taxMonth')!;
    }
    if (this.data.exactPeriod.includes('Date')){
      this.data.taxDate = new Dates();
      this.data.taxDate.day = this.route.snapshot.paramMap.get('taxDateDay')!;
      this.data.taxDate.month = this.route.snapshot.paramMap.get('taxDateMonth')!;
      this.data.taxDate.year = this.route.snapshot.paramMap.get('taxDateYear')!;
    }
    this.results.push(this.data);
    console.log(this.results);
  }

  showDetail(id: number): void{
    this.results.forEach(item => {
      if (id === item.id){
        this.show = !this.show;
        this.salary.id = item.id;
        this.salary.userId = item.userId;
        this.salary.companyName = item.companyName;
        this.salary.amount = item.amount;
        this.salary.currency = item.currency;
        this.salary.exactPeriod = item.exactPeriod;
        this.salary.taxDate = item.taxDate;
        this.salary.taxMonth = item.taxMonth;
        this.salary.taxYear = item.taxYear;
      }
      console.log(this.salary);

    })
  }
  deleteRecord(value: string): void{
    if (confirm('Are you sure you want to delete this record?')){
      this.show = !this.show;
      this.results.splice(parseInt(value)-1, 1);  
    }
  }

  ngOnInit(): void { 
  }

}
