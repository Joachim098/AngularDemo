import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute} from '@angular/router';
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
  btnLabel: string;
  formLabel: string;
  clientForm: FormGroup;
  formData: FormData;
  numberOfDays: number [];
  routerId: number = +this.router.snapshot.paramMap.get('id')!;
  editData: Salary;
  salary: Salary = new Salary();
  salaryData: Salary[] = this.salary.getTestData();
  show: Boolean = false;

  constructor(private fb: FormBuilder, private router: ActivatedRoute) {
    this.formData = new FormData();
    this.editData = this.getEditRecord(this.routerId);
   }
   ngOnInit(): void {
    this.clientForm = this.fb!.group({  
      company: [this.editData.companyName, [Validators.required, Validators.minLength(2), Validators.maxLength(100), Validators.pattern(/^(?!\s).*$/)]],
      amount: [this.editData.amount, [Validators.required, Validators.min(0.01), Validators.max(1000000)]],
      currency:[this.editData.currency, Validators.required],
      selectOption: ['', Validators.required],
      selectYear: '',
      selectMonth: '',
      day: '',
      month: '',
      year: ''
    });
    this.formData.displayFormInputData();
    if(this.editData.id > 0){
      this.btnLabel = 'Update Record';
      this.formLabel = 'EDIT SALARY RECORD'
    }
    else{
      this.btnLabel = 'Add New Record'
      this.formLabel = 'ADD SALARY RECORD';
    }
  }
  getNumberOfDays(): void{
    this.checkValidity();
    this.clientForm.get('day')!.setValue('');
    this.numberOfDays = [];
    let num: number = 1;
    if (this.clientForm.get('month')!.value.includes('Jan') || 
        this.clientForm.get('month')!.value.includes('Mar') || 
        this.clientForm.get('month')!.value.includes('May') ||
        this.clientForm.get('month')!.value.includes('Jul') ||
        this.clientForm.get('month')!.value.includes('Aug') ||
        this.clientForm.get('month')!.value.includes('Oct') ||
        this.clientForm.get('month')!.value.includes('Dec')){
          for (num; num<32; num++){
            this.numberOfDays[num] = num;
          }
    }  
    else if (this.clientForm.get('month')!.value.includes('Apr') || 
            this.clientForm.get('month')!.value.includes('Jun') || 
            this.clientForm.get('month')!.value.includes('Sep') ||
            this.clientForm.get('month')!.value.includes('Nov')){
              for (num; num<31; num++){
                this.numberOfDays[num] = num;
              }
    }
    else if (this.clientForm.get('month')!.value.includes('Feb') && this.clientForm.get('year')!.value == 2010){
      for (num; num<29; num++){
        this.numberOfDays[num] = num;
      }
    }
    else if (this.clientForm.get('month')!.value.includes('Feb') && this.clientForm.get('year')!.value == 2011){
      for (num; num<29; num++){
        this.numberOfDays[num] = num;
      }
    }
    else if (this.clientForm.get('month')!.value.includes('Feb') && this.clientForm.get('year')!.value == 2013){
      for (num; num<29; num++){
        this.numberOfDays[num] = num;
      }
    }
    else if (this.clientForm.get('month')!.value.includes('Feb') && this.clientForm.get('year')!.value == 2014){
      for (num; num<29; num++){
        this.numberOfDays[num] = num;
      }
    }
    else if (this.clientForm.get('month')!.value.includes('Feb') && this.clientForm.get('year')!.value == 2015){
      for (num; num<29; num++){
        this.numberOfDays[num] = num;
      }
    }
    else if (this.clientForm.get('month')!.value.includes('Feb') && this.clientForm.get('year')!.value == 2017){
      for (num; num<29; num++){
        this.numberOfDays[num] = num;
      }
    }
    else if (this.clientForm.get('month')!.value.includes('Feb') && this.clientForm.get('year')!.value == 2018){
      for (num; num<29; num++){
        this.numberOfDays[num] = num;
      }
    }
    else if (this.clientForm.get('month')!.value.includes('Feb') && this.clientForm.get('year')!.value == 2019){
      for (num; num<29; num++){
        this.numberOfDays[num] = num;
      }
    }
    else if (this.clientForm.get('month')!.value.includes('Feb') && this.clientForm.get('year')!.value == 2021){
      for (num; num<29; num++){
        this.numberOfDays[num] = num;
      }
    }
    else if (this.clientForm.get('month')!.value.includes('Feb') && this.clientForm.get('year')!.value == 2012){
      for (num; num<30; num++){
        this.numberOfDays[num] = num;
      }
    }
    else if (this.clientForm.get('month')!.value.includes('Feb') && this.clientForm.get('year')!.value == 2016){
      for (num; num<30; num++){
        this.numberOfDays[num] = num;
      }
    }
    else if (this.clientForm.get('month')!.value.includes('Feb') && this.clientForm.get('year')!.value == 2020){
      for (num; num<30; num++){
        this.numberOfDays[num] = num;
      }
    }
  }
  checkValidity():void{
    if(this.clientForm.get('selectOption')!.value.includes('Year')){
      this.clientForm.get('selectYear')!.setValidators(Validators.required);
      this.clientForm.get('selectMonth')!.removeValidators(Validators.required);
      this.clientForm.get('year')!.removeValidators(Validators.required);
      this.clientForm.get('month')!.removeValidators(Validators.required);
      this.clientForm.get('day')!.removeValidators(Validators.required);
      this.clientForm.get('selectYear')!.updateValueAndValidity();
      this.clientForm.get('selectMonth')!.updateValueAndValidity();
      this.clientForm.get('year')!.updateValueAndValidity();
      this.clientForm.get('month')!.updateValueAndValidity();
      this.clientForm.get('day')!.updateValueAndValidity();
    }
    if(this.clientForm.get('selectOption')!.value.includes('Month')){
      this.clientForm.get('selectMonth')!.setValidators(Validators.required);
      this.clientForm.get('selectYear')!.removeValidators(Validators.required);
      this.clientForm.get('year')!.removeValidators(Validators.required);
      this.clientForm.get('month')!.removeValidators(Validators.required);
      this.clientForm.get('day')!.removeValidators(Validators.required);
      this.clientForm.get('selectMonth')!.updateValueAndValidity();
      this.clientForm.get('selectYear')!.updateValueAndValidity();
      this.clientForm.get('year')!.updateValueAndValidity();
      this.clientForm.get('month')!.updateValueAndValidity();
      this.clientForm.get('day')!.updateValueAndValidity();
    }
    if(this.clientForm.get('selectOption')!.value.includes('Date')){
      this.clientForm.get('year')!.setValidators(Validators.required);
      this.clientForm.get('month')!.setValidators(Validators.required);
      this.clientForm.get('day')!.setValidators(Validators.required);
      this.clientForm.get('selectYear')!.removeValidators(Validators.required);
      this.clientForm.get('selectMonth')!.removeValidators(Validators.required);
      this.clientForm.get('year')!.updateValueAndValidity();
      this.clientForm.get('month')!.updateValueAndValidity();
      this.clientForm.get('day')!.updateValueAndValidity();
      this.clientForm.get('selectMonth')!.updateValueAndValidity(); 
      this.clientForm.get('selectYear')!.updateValueAndValidity();  
    }
  }
  getEditRecord(id: number): Salary{
    const salary = this.salaryData.find(salary => salary.id === id);
    if (salary)
      return salary;
    return new Salary();
  }
  addEditRecord(id: string): void{
    let newData: Salary = new Salary();
    newData.id = this.editData.id,
    newData.companyName =this.clientForm.get('company')?.value;
    newData.amount = this.clientForm.get('amount')?.value;
    newData.currency = this.clientForm.get('currency')?.value;
    newData.exactPeriod =this.clientForm.get('selectOption')?.value;
        
    if (newData.exactPeriod.includes('Year')){
      let value = this.clientForm.get('selectYear')!.value;
      let finalValue = value.substr(10, 9);
      newData.taxYear = new YearMonth();
      newData.taxYear.year = finalValue;
    }
    if (newData.exactPeriod.includes('Month')){
      let value = this.clientForm.get('selectMonth')!.value;
      let finalValue = value.substr(10, 6);
      newData.taxMonth = new YearMonth();
      newData.taxMonth.month = finalValue;  
    }
    if (newData.exactPeriod.includes('Date')){
      let day = this.clientForm.get('day')!.value 
      let month = this.clientForm.get('month')!.value 
      let year = this.clientForm.get('year')!.value;
      newData.taxDate = new Dates();
      newData.taxDate.day = day;
      newData.taxDate.month = month;
      newData.taxDate.year = year;  
    }
    this.salaryData = this.salaryData.map(u => u.id !== newData.id ? u : newData);
    alert('Record has been updated!');
    console.log(this.salaryData); 
  }
  addNewRecord(): void{
    let results: Salary[] = [];
    let record = new Salary();

    record.id = this.editData.id;
    record.companyName = this.clientForm.get('company')?.value;
    record.amount = this.clientForm.get('amount')?.value;
    record.currency = this.clientForm.get('currency')?.value;
    record.exactPeriod = this.clientForm.get('selectOption')?.value;

    if (record.exactPeriod.includes('Year')){
      let value = this.clientForm.get('selectYear')!.value;
      let finalValue = value.substr(10, 9);
      record.taxYear = new YearMonth();
      record.taxYear.year = finalValue;
    }
    if (record.exactPeriod.includes('Month')){
      let value = this.clientForm.get('selectMonth')!.value;
      let finalValue = value.substr(10, 6);
      record.taxMonth = new YearMonth();
      record.taxMonth.month = finalValue;  
    }
    if (record.exactPeriod.includes('Date')){
      let day = this.clientForm.get('day')!.value 
      let month = this.clientForm.get('month')!.value 
      let year = this.clientForm.get('year')!.value;
      record.taxDate = new Dates();
      record.taxDate.day = day;
      record.taxDate.month = month;
      record.taxDate.year = year;  
    }
    results.push(record);
    console.log(results);// testing new added record
    alert('New Record added!');
  }
  showDate(): void{
    this.show = true;
  }

   saveSalary(): void{
     if (this.editData.id > 0){
       return this.addEditRecord(this.editData.id.toString());
     }
     else{
       return this.addNewRecord();
     }
   }
}
