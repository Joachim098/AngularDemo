import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { FormData } from '../form-data';
import { Salary } from '../salary';
import { Dates } from '../dates';
import { YearMonth } from '../year-month';
import { SalaryService } from '../salary.service';

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
  show: Boolean = false;
  isLoading: Boolean;
  successMessage: String;
  errorMessage: string;

  constructor(private fb: FormBuilder, private router: ActivatedRoute, private route: Router, private salaryService: SalaryService) {
    this.formData = new FormData();
   }
   ngOnInit(): void {
    this.getEditRecord(this.routerId);
    
    this.clientForm = this.fb!.group({  
      company: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100), Validators.pattern(/^(?!\s).*$/)]],
      amount: ['', [Validators.required, Validators.min(0.01), Validators.max(1000000)]],
      currency:['', Validators.required],
      selectOption: ['', Validators.required],
      selectYear: '',
      selectMonth: '',
      day: '',
      month: '',
      year: ''
    });
    this.formData.displayFormInputData();
  }
  checkDays(){
    if (this.clientForm.get('day')!.value == 'undefined' || this.clientForm.get('day')!.value == 'null'){
      this.clientForm.get('day')!.setValue('');
    }
  }
  getNumberOfDays(): void{
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
    if (this.clientForm.get('month')!.value == 'Feb' && this.clientForm.get('year')!.value == 10){
      for (num; num<29; num++){
        this.numberOfDays[num] = num;
      }
    }
    if (this.clientForm.get('month')!.value == 'Feb' && this.clientForm.get('year')!.value == 11){
      for (num; num<29; num++){
        this.numberOfDays[num] = num;
      }
    }
    if (this.clientForm.get('month')!.value == 'Feb' && this.clientForm.get('year')!.value == 13){
      for (num; num<29; num++){
        this.numberOfDays[num] = num;
      }
    }
    if (this.clientForm.get('month')!.value == 'Feb' && this.clientForm.get('year')!.value == 14){
      for (num; num<29; num++){
        this.numberOfDays[num] = num;
      }
    }
    if (this.clientForm.get('month')!.value == 'Feb' && this.clientForm.get('year')!.value == 15){
      for (num; num<29; num++){
        this.numberOfDays[num] = num;
      }
    }
    if (this.clientForm.get('month')!.value == 'Feb' && this.clientForm.get('year')!.value == 17){
      for (num; num<29; num++){
        this.numberOfDays[num] = num;
      }
    }
    if (this.clientForm.get('month')!.value == 'Feb' && this.clientForm.get('year')!.value == 18){
      for (num; num<29; num++){
        this.numberOfDays[num] = num;
      }
    }
    if (this.clientForm.get('month')!.value == 'Feb' && this.clientForm.get('year')!.value == 19){
      for (num; num<29; num++){
        this.numberOfDays[num] = num;
      }
    }
    if (this.clientForm.get('month')!.value == 'Feb' && this.clientForm.get('year')!.value == 21){
      for (num; num<29; num++){
        this.numberOfDays[num] = num;
      }
    }
    if (this.clientForm.get('month')!.value == 'Feb' && this.clientForm.get('year')!.value == 12){
      for (num; num<30; num++){
        this.numberOfDays[num] = num;
      }
    }
    if (this.clientForm.get('month')!.value == 'Feb' && this.clientForm.get('year')!.value == 16){
      for (num; num<30; num++){
        this.numberOfDays[num] = num;
      }
    }
    if (this.clientForm.get('month')!.value == 'Feb' && this.clientForm.get('year')!.value == 20){
      for (num; num<30; num++){
        this.numberOfDays[num] = num;
      }
    }
  }
  checkValidity():void{
    if(this.clientForm.get('selectOption')!.value == 'Enter for full Tax Year'){
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
    if(this.clientForm.get('selectOption')!.value == 'Enter per Month'){
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
    if(this.clientForm.get('selectOption')!.value == 'Enter per Specific Date'){
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
  getEditRecord(id: number): void{
    this.isLoading = true;
    this.salaryService.getSalary(id).subscribe({
      next: salary => {
        this.editData = {...salary};
        if(this.editData.id > 0){
          this.btnLabel = 'Update Record';
          this.formLabel = 'EDIT SALARY RECORD';
          this.clientForm.get('company')!.setValue(this.editData.companyName);
          this.clientForm.get('amount')!.setValue(this.editData.amount);
          this.clientForm.get('currency')!.setValue(this.editData.currency);
          this.clientForm.get('selectOption')!.setValue(this.editData.exactPeriod);

          if (this.clientForm.get('selectOption')!.value.includes('Year')){
            this.clientForm.get('selectYear')!.setValue(this.editData.taxYear!.year);
          }
          if (this.clientForm.get('selectOption')!.value.includes('Month')){
            this.clientForm.get('selectMonth')!.setValue(this.editData.taxMonth!.month);
          }
          if (this.clientForm.get('selectOption')!.value.includes('Date')){
            this.clientForm.get('day')!.setValue(this.editData.taxDate!.day);
            this.clientForm.get('month')!.setValue(this.editData.taxDate!.month);
            this.clientForm.get('year')!.setValue(this.editData.taxDate!.year);
          }
        }
        else{
          this.btnLabel = 'Add New Record'
          this.formLabel = 'ADD SALARY RECORD';
        }
        this.isLoading = false;
      },
      error: err => {
        console.log(err);
        this.errorMessage = err;
        this.isLoading = false;
      }
    });
  }
  addEditRecord(): void{
    this.clientForm.markAllAsTouched();
    if(this.clientForm.invalid){
      return;
    }
    else{
      let newData: Salary = new Salary();
      newData.id = this.routerId;
      newData.companyName =this.clientForm.get('company')?.value;
      newData.amount = this.clientForm.get('amount')?.value;
      newData.currency = this.clientForm.get('currency')?.value;
      newData.exactPeriod =this.clientForm.get('selectOption')?.value;
        
      if (newData.exactPeriod.includes('Year')){
        newData.exactPeriod = 'Tax per Year';
        let value = this.clientForm.get('selectYear')!.value;
        newData.taxYear = new YearMonth();
        newData.taxYear.year = value;
      }
      if (newData.exactPeriod.includes('Month')){
        newData.exactPeriod = 'Tax per Month';
        let value = this.clientForm.get('selectMonth')!.value;
        newData.taxMonth = new YearMonth();
        newData.taxMonth.month = value;  
      }
      if (newData.exactPeriod.includes('Date')){
        newData.exactPeriod = 'Tax per Specific Date';
        let day = this.clientForm.get('day')!.value 
        let month = this.clientForm.get('month')!.value 
        let year = this.clientForm.get('year')!.value;
        newData.taxDate = new Dates();
        newData.taxDate.day = day;
        newData.taxDate.month = month;
        newData.taxDate.year = year;  
      }
      this.isLoading = true;
      this.salaryService.updateSalary(newData).subscribe({
        next: () => {
          this.successMessage = 'Record has been updated!';
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
  addNewRecord(): void{
    this.clientForm.markAllAsTouched();
    if(this.clientForm.invalid){
      return;
    }
    else{
      let record = new Salary();
      record.companyName = this.clientForm.get('company')?.value;
      record.amount = this.clientForm.get('amount')?.value;
      record.currency = this.clientForm.get('currency')?.value;
      record.exactPeriod = this.clientForm.get('selectOption')?.value;

      if (record.exactPeriod.includes('Year')){
        record.exactPeriod = 'Tax per Year';
        let value = this.clientForm.get('selectYear')!.value;
        record.taxYear = new YearMonth();
        record.taxYear.year = value;
      }
      if (record.exactPeriod.includes('Month')){
        record.exactPeriod = 'Tax per Month';
        let value = this.clientForm.get('selectMonth')!.value;
        record.taxMonth = new YearMonth();
        record.taxMonth.month = value;  
      }
      if (record.exactPeriod.includes('Date')){
        record.exactPeriod = 'Tax per Specific Date';
        let day = this.clientForm.get('day')!.value 
        let month = this.clientForm.get('month')!.value 
        let year = this.clientForm.get('year')!.value;
        record.taxDate = new Dates();
        record.taxDate.day = day;
        record.taxDate.month = month;
        record.taxDate.year = year;  
      }
      this.isLoading = true;
      this.salaryService.createSalary(record).subscribe({
        next: () => {
          this.clientForm.reset();
          this.successMessage = 'New Record has been added!';
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
  showDate(): void{
    this.show = true;
    this.clientForm.get('selectOption')!.setValue('');
  }
  saveSalary(): void{
    if (this.routerId > 0){
      return this.addEditRecord();
    }
    else{
      return this.addNewRecord();
    }
  }
}
