import { Component, OnInit } from '@angular/core';
import { Info } from '../salary-information';

@Component({
  selector: 'app-salary-list',
  templateUrl: './salary-list.component.html',
  styleUrls: ['./salary-list.component.css']
})
export class SalaryListComponent implements OnInit {
  data: Info;
  show: Boolean = false;
  default: Boolean = true;
  getData: Info [];
  results: Info[];
  id: number;
  company: string;
  amount: number;
  currency: string;
  taxPeriod: string;
  date: Info;

  constructor() { this.data = new Info(); }

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
      this.results = this.data.getTestData(123);
      this.results = this.results.filter(item => {
        return item.id !== parseInt(value);
      });
      console.log(this.results); //testing to see results
    }
  }

  ngOnInit(): void { 
    //this.deleteRecord('3'); // remove the comment to test
  }

}
