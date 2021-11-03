import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Info } from '../salary-information';

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
  @Input() date: Info;
  @Output() notify: EventEmitter<string> = new EventEmitter<string>();
  
  constructor() { }

  deletedChild(): void{ // --- this custum event is not emitting the value. I'm not sure what's the issue
    confirm('Are you sure you want to delete this record?');
    this.notify.emit(this.id.toString());
  }

  ngOnInit(): void {
  }

}
