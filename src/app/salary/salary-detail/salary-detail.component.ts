import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Salary } from '../salary';

@Component({
  selector: 'app-salary-detail',
  templateUrl: './salary-detail.component.html',
  styleUrls: ['./salary-detail.component.css']
})
export class SalaryDetailComponent implements OnInit {
  @Input() id: number; 
  @Input() company: string; 
  @Input() amount: number;
  @Input() currency: string;
  @Input() taxPeriod: string;
  @Input() date: Salary;
  @Output() notify: EventEmitter<string> = new EventEmitter<string>();
  
  constructor() { }

  deletedChild(): void{
    this.notify.emit(this.id.toString());
  }

  ngOnInit(): void {
  }

}
