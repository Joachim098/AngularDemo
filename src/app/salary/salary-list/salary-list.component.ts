import { Component, OnInit } from '@angular/core';
import { Salary } from '../salary';

@Component({
  selector: 'app-salary-list',
  templateUrl: './salary-list.component.html',
  styleUrls: ['./salary-list.component.css']
})
export class SalaryListComponent implements OnInit {
  data: Salary;
  show: Boolean = false;
  default: Boolean = true;
  getData: Salary [];
  results: Salary[];
  id: number;
  company: string;
  amount: number;
  currency: string;
  taxPeriod: string;
  date: Salary;

  constructor() { this.data = new Salary(); }

  showDetail(id: number): void{
    this.getData = this.data.getTestData(123);
    this.getData.forEach(item => {
      if (id === item.id){
        this.show = !this.show;
        this.id = item.id;
        this.company = item.companyName;
        this.amount = item.amount;
        this.currency = item.currency;
        this.taxPeriod = item.exactPeriod;
        this.date = item;
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
