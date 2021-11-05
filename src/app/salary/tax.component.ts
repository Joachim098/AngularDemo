import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormData } from './form-data';

@Component({
  selector: 'app-tax',
  templateUrl: './tax.component.html',
  styleUrls: ['./tax.component.css']
})
export class TaxComponent implements OnInit {
  clientForm: FormGroup;
  formData: FormData;

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
    this.formData = new FormData();
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
    this.formData.displayFormInputData();
  }
}
