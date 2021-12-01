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
  isLoading: Boolean;
  successMessage: String;
  errorMessage: string;
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
    this.isLoading = true;
    this.salaryService.getSalaries().subscribe({
      next: salary => {
        this.filteredResults = salary;
        this.results = this.filteredResults;
        this.isLoading = false;
      },
      error: err => {
        console.log(err);
        this.errorMessage = err;
        this.isLoading = false;
      }
    });
  }
  performSearch(value: string): Salary[] {
    value = value.toLowerCase();
    return this.filteredResults.filter((salary: Salary) => salary.companyName.toLowerCase().includes(value) && salary.exactPeriod.includes(this.selectedFilter))
    && this.results.filter((salary: Salary) => salary.companyName.toLowerCase().includes(value) && salary.exactPeriod.includes(this.selectedFilter));
  }
  performFilter(value: string): Salary[] {
    return this.filteredResults.filter((salary: Salary) => salary.exactPeriod.includes(value) && salary.companyName.toLocaleLowerCase().includes(this.listSearch)) 
    && this.results.filter((salary: Salary) => salary.exactPeriod.includes(value) && salary.companyName.toLocaleLowerCase().includes(this.listSearch));
  }
  getFilteredSalary(): void {
    this.filteredResults = this.performFilter(this.selectedFilter);
  }
  showDetail(id: number): void {
    if (this.default) {
      this.filteredResults.forEach(salary => {
        if (id === salary.id){
          this.show = !this.show;
          this.salary = salary;
        }
      });
    }
    else if (!this.default) {
      this.results.forEach(salary => {
        if(id === salary.id){
          this.show = !this.show;
          this.salary = salary;
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
              this.results.splice(i, 1);
              this.successMessage = 'Record has been deleted';
              this.isLoading = false;
            },
            error: err => {
              console.log(err);
              this.errorMessage = err;
              this.isLoading = false;
            }
          });
        }
      }
  }
}
