import { Component, OnInit } from '@angular/core';
import { Salary } from '../salary';
import { SalaryService } from '../salary.service';

@Component({
  selector: 'app-salary-list',
  templateUrl: './salary-list.component.html',
  styleUrls: ['./salary-list.component.css']
})
export class SalaryListComponent implements OnInit {
  show: Boolean = false;
  default: Boolean = true;
  isLoading: Boolean = true;
  alertMessage: String = '';
  data: Salary;
  results: Salary[] = [];
  deletedRecords: Salary[];
  salary: Salary = new Salary();
  filteredResults: Salary[] = [];

  private _listSearch: string = '';
  selectedFilter: string = '';

  get listSearch(): string {
    return this._listSearch;
  }
  set listSearch(value: string) {
    this._listSearch = value;
    this.filteredResults = this.performSearch(value);
  }

  constructor(private salaryService: SalaryService) {}

  ngOnInit(): void {
    this.salaryService.getSalaries().subscribe({
      next: salary => {
        this.isLoading = false;
        this.filteredResults = salary;
        this.results = this.filteredResults;
      },
      error: err => {
        console.log(err);
      }
    });
  }
  performSearch(value: string): Salary[] {
    value = value.toLowerCase();
    return this.filteredResults.filter((salary: Salary) => salary.companyName.toLowerCase().includes(value)) 
    && this.results.filter((salary: Salary) => salary.companyName.toLowerCase().includes(value));
  }
  performFilter(value: string): Salary[] {
    return this.filteredResults.filter((salary: Salary) => salary.exactPeriod.includes(value) && salary.companyName.toLocaleLowerCase().includes(this.listSearch)) 
    && this.results.filter((salary: Salary) => salary.exactPeriod.includes(value) && salary.companyName.toLocaleLowerCase().includes(this.listSearch));
  }
  getFilteredSalary(): void {
    this.filteredResults = this.performFilter(this.selectedFilter);
  }
  clearFilter() {
    this.selectedFilter = '';
  }
  showDetail(id: number): void {
    this.isLoading = true;
    if (this.default) {
      this.salaryService.getSalary(id).subscribe({
        next: salary => {
          this.isLoading = false;
          this.show = !this.show;
          this.salary.id = salary.id;
          this.salary.companyName = salary.companyName;
          this.salary.amount = salary.amount;
          this.salary.currency = salary.currency;
          this.salary.exactPeriod = salary.exactPeriod;
          this.salary.taxDate = salary.taxDate;
          this.salary.taxMonth = salary.taxMonth;
          this.salary.taxYear = salary.taxYear;
        },
        error: err => {
          console.log(err);
        }
      }); 
    }
    else if (!this.default) {
      this.isLoading = true;
      this.salaryService.getSalary(id).subscribe({
        next: salary => {
          this.isLoading = false;
          this.show = !this.show;
          this.salary.id = salary.id;
          this.salary.companyName = salary.companyName;
          this.salary.amount = salary.amount;
          this.salary.currency = salary.currency;
          this.salary.exactPeriod = salary.exactPeriod;
          this.salary.taxDate = salary.taxDate;
          this.salary.taxMonth = salary.taxMonth;
          this.salary.taxYear = salary.taxYear;
        },
        error: err => {
          console.log(err);
        }
      });
    }
  }
  deleteRecord(value: string): void {
    this.isLoading = true;
      this.show = !this.show;
      this.default = false;
      for (let i: number = 0; i < this.results.length; i++) {
        if (this.results[i].id == parseInt(value)) {
          this.salaryService.deleteSalary(this.results[i].id).subscribe({
            next: () => {
              this.isLoading = false;
              this.alertMessage = 'Record Id: ' + value + ' has been deleted';
              this.results.splice(i, 1);
            },
            error: err => console.log(err)
          });
        }
      }
    }
}
