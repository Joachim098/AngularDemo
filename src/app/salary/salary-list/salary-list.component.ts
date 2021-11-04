import { Component, OnInit } from '@angular/core';
import { Salary } from '../salary';

@Component({
  selector: 'app-salary-list',
  templateUrl: './salary-list.component.html',
  styleUrls: ['./salary-list.component.css']
})
export class SalaryListComponent implements OnInit {
  show: Boolean = false;
  default: Boolean = true;
  data: Salary;
  getData: Salary [];
  results: Salary[];
  salary: Salary = new Salary();

  constructor() { 
    this.data = new Salary(); 
  }

  showDetail(id: number): void{
    this.getData = this.data.getTestData(123);
    this.getData.forEach(item => {
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
    })
  }
  deleteRecord(value: string): void{
    if (confirm('Are you sure you want to delete this record?')){
      this.default = false;
      this.show = !this.show;
      this.results = this.data.getTestData(123);
      this.results.splice(parseInt(value)-1, 1);  
    }
  }

  ngOnInit(): void { 
    this.data.getTestData(123);
  }

}
