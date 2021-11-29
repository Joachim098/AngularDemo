import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Salary } from '../salary';

@Component({
  selector: 'app-salary-detail',
  templateUrl: './salary-detail.component.html',
  styleUrls: ['./salary-detail.component.css']
})
export class SalaryDetailComponent implements OnInit {
  @Input() salary: Salary = new Salary(); 
  @Output() notify: EventEmitter<string> = new EventEmitter<string>();
  
  constructor() { }
  
  ngOnInit(): void {}

  deletedChild(): void{
    this.notify.emit(this.salary.id.toString());
  }
}
