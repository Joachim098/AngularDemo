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
  results: Salary[] = [];
  deletedRecords: Salary[];
  salary: Salary = new Salary();
  filteredResults: Salary[] = [];

  private _listSearch: string = '';
  selectedFilter: string = '';

  get listSearch(): string{
    return this._listSearch;
  }
  set listSearch(value: string){
    this._listSearch = value;
    this.filteredResults = this.performSearch(value); 
  }

  constructor() { 
    this.data = new Salary();
  }

  performSearch(value: string): Salary[] {
    value = value.toLowerCase();
    return this.data.getTestData(123).filter((salary: Salary) => salary.companyName.toLowerCase().includes(value));  
  }
  performFilter(value: string): Salary[] {
    return this.data.getTestData(123).filter((salary: Salary) => salary.exactPeriod.includes(value) && salary.companyName.toLocaleLowerCase().includes(this.listSearch)); 
  }
  getFilteredSalary(): void{
    this.filteredResults = this.performFilter(this.selectedFilter);
  }
  clearFilter(){
    this.selectedFilter = '';
  }
  showDetail(id: number): void{
    if (this.default){
      this.results = this.data.getTestData();
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
      })
    }
    else if (!this.default){
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
      })

    }
    
  }
  deleteRecord(value: string): void{
    if (confirm('Are you sure you want to delete this record?')){
      this.show = !this.show;
      this.default = false;
      for (let i: number = 0; i<this.results.length; i++){
        if (this.results[i].id == parseInt(value)){
          this.results.splice(i, 1);
          this.deletedRecords = []; 
          this.deletedRecords = this.results;
        }
      }  
      console.log(this.deletedRecords); 
    }
  }

  ngOnInit(): void { 
    this.data.getTestData(123);
    this.listSearch = 'company';
  }

}
