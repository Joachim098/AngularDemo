import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dates } from './dates-per-specific-date';
import { YearMonth } from './dates-per-year-month';
import { Salary } from './salary';
import { Info } from './salary-information';

@Component({
  selector: 'app-tax',
  templateUrl: './tax.component.html',
  styleUrls: ['./tax.component.css']
})
export class TaxComponent implements OnInit {
  clientForm: any;
  salary: Salary;
  dates1: YearMonth;
  dates2: Dates;
  info : Info;
  details: any []= [];

  addYear(): FormGroup{
    return this.fb.group({
      selectYear: ''
    });
  }
  get addedYears(): FormArray{
    return <FormArray>this.clientForm.get('selectYear');
  }
  addMonth(): FormGroup{
    return this.fb.group({
      selectMonth: ''
    });
  }
  get addedMonths(): FormArray{
    return <FormArray>this.clientForm.get('selectMonth');
  }
  addDate(): FormGroup{
    return this.fb.group({
      day: '',
      month: '',
      year: ''
    });
  }
  get addedDate(): FormArray{
    return <FormArray>this.clientForm.get('selectDate');
  }
  duplicateFields1(): void{
    this.addedYears.push(this.addYear()); 
  }
  duplicateFields2(): void{
    this.addedMonths.push(this.addMonth()); 
  }
  duplicateFields3(): void{
    this.addedDate.push(this.addDate()); 
  }
  save(): void{
    //code to manage the data captured from salary record
  }

  constructor(private fb: FormBuilder) {
    this.salary = new Salary();
    this.info = new Info();
    this.dates1 = new YearMonth();
    this.dates2 = new Dates()

   }

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      company: ['', Validators.required],
      amount: ['', Validators.required],
      currency:['', Validators.required],
      selectOption: ['', Validators.required],
      selectYear: this.fb.array([this.addYear()]),
      selectMonth: this.fb.array([this.addMonth()]),
      selectDate: this.fb.array([this.addDate()]),
    });
    this.salary.displayFormInputData();

    //to test or display the fake data created for each class
    this.details = [
      {
        CompanyName: this.info.companyName,
        Amount: this.info.amount,
        Currency: this.info.currency,
        Year: this.dates1.selectYear,
        Month: this.dates1.selectMonth,
        Date: {
          day: this.dates2.day,
          month: this.dates2.month,
          year: this.dates2.year
        }
        
      }
    ];

  }
}
