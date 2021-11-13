import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormData } from '../form-data';
import { Salary } from '../salary';
import { Dates } from '../dates';
import { YearMonth } from '../year-month';

@Component({
  selector: 'app-salary-add-edit',
  templateUrl: './salary-add-edit.component.html',
  styleUrls: ['./salary-add-edit.component.css']
})
export class SalaryAddEditComponent implements OnInit {
  clientForm: FormGroup;
  formData: FormData;
  routerId: string = this.router.snapshot.paramMap.get('id')!;
  salary: Salary;
  editData: Salary;
  id: number = 0;

  addYear(): FormGroup{
    return this.fb.group({
      selectYear: ['', Validators.required]
    });
  }
  get addedYears(): FormArray{
    return <FormArray>this.clientForm.get('selectYear');
  }
  addMonth(): FormGroup{
    return this.fb.group({
      selectMonth: ['', Validators.required]
    });
  }
  get addedMonths(): FormArray{
    return <FormArray>this.clientForm.get('selectMonth');
  }
  addDate(): FormGroup{
    return this.fb.group({
      day: ['', Validators.required],
      month: ['', Validators.required],
      year: ['', Validators.required]
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

  getEditRecord(id: string): Salary[]{
    let results: Salary[] = this.salary.getTestData(123);
    let newResults: Salary[] = [];
    results.forEach((element) =>{
      if (element.id === parseInt(id)){
        newResults.push(element);
      }
    })
    return newResults; //it works, but it's pulling data from the salary fake data method for now. 
  }
  addEditRecord(id: string): void{
    let results: Salary [] = this.salary.getTestData(123);
    results.forEach((element) =>{
      if (element.id === parseInt(id)){
        let newData: Salary = new Salary();

        newData.id = this.editData.id,
        newData.companyName =this.clientForm.get('company')?.value;
        newData.amount = this.clientForm.get('amount')?.value;
        newData.currency = this.clientForm.get('currency')?.value;
        newData.exactPeriod =this.clientForm.get('selectOption')?.value;
        
        if (newData.exactPeriod.includes('Year')){
          let value = Object.assign({}, ...this.addedYears.value);
          let finalValue = value.selectYear.substr(10, 9);
          newData.taxYear = new YearMonth();
          newData.taxYear.year = finalValue;
        }
        if (newData.exactPeriod.includes('Month')){
          let value = Object.assign({}, ...this.addedMonths.value);
          let finalValue = value.selectMonth.substr(10, 6);
          newData.taxMonth = new YearMonth();
          newData.taxMonth.month = finalValue;  
        }
        if (newData.exactPeriod.includes('Date')){
          let value = Object.assign({}, ...this.addedDate.value);
          newData.taxDate = new Dates();
          newData.taxDate.day = value.day;
          newData.taxDate.month = value.month;
          newData.taxDate.year =value.year;  
        }

        results = results.map(u => u.id !== newData.id ? u : newData);
        alert('Record has been updated!');
        console.log(results); //testing new results after editing a record
        
        this.route.navigate(['/salary-list', {
          id: newData.id,
          name: newData.companyName,
          amount: newData.amount,
          currency: newData.currency,
          period: newData.exactPeriod,
          taxYear: newData.taxYear?.year,
          taxMonth: newData.taxMonth?.month,
          taxDateDay: newData.taxDate?.day,
          taxDateMonth: newData.taxDate?.month, 
          taxDateYear: newData.taxDate?.year
        }]);
      }
    });
  }
  addNewRecord(): void{
    let results: Salary[] = [];
    let record = new Salary();
    this.id += 1;

    record.id = this.id;
    record.companyName = this.clientForm.get('company')?.value;
    record.amount = this.clientForm.get('amount')?.value;
    record.currency = this.clientForm.get('currency')?.value;
    record.exactPeriod = this.clientForm.get('selectOption')?.value;

    if (record.exactPeriod.includes('Year')){
      let value = Object.assign({}, ...this.addedYears.value);
      let finalValue = value.selectYear.substr(10, 9);
      record.taxYear = new YearMonth();
      record.taxYear.year = finalValue;
    }
    if (record.exactPeriod.includes('Month')){
      let value = Object.assign({}, ...this.addedMonths.value);
      let finalValue = value.selectMonth.substr(10, 6);
      record.taxMonth = new YearMonth();
      record.taxMonth.month = finalValue;  
    }
    if (record.exactPeriod.includes('Date')){
      let value = Object.assign({}, ...this.addedDate.value);
      record.taxDate = new Dates();
      record.taxDate.day = value.day;
      record.taxDate.month = value.month;
      record.taxDate.year =value.year;  
    }
    results.push(record);
    console.log(results);// testing new added record
    alert('New Record added!');

    this.route.navigate(['/salary-list', {
      id: record.id,
      name: record.companyName,
      amount: record.amount,
      currency: record.currency,
      period: record.exactPeriod,
      taxYear: record.taxYear?.year,
      taxMonth: record.taxMonth?.month,
      taxDateDay: record.taxDate?.day,
      taxDateMonth: record.taxDate?.month, 
      taxDateYear: record.taxDate?.year
    }]);
  }

  constructor(private fb: FormBuilder, private router: ActivatedRoute, private route: Router) {
    this.formData = new FormData();
    this.salary = new Salary();
    this.editData = Object.assign({}, ...this.getEditRecord(this.routerId)); //returns fake data for now.
   }

  ngOnInit(): void {
    this.clientForm = this.fb!.group({
      company: [this.editData.companyName, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      amount: [this.editData.amount, [Validators.required, Validators.min(0.01), Validators.max(1000000)]],
      currency:['', Validators.required],
      selectOption: ['', Validators.required],
      selectYear: this.fb.array([this.addYear()]),
      selectMonth: this.fb.array([this.addMonth()]),
      selectDate: this.fb.array([this.addDate()]),
    });
    this.formData.displayFormInputData();
  }
}
