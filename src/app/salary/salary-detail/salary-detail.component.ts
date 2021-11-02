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

  constructor() { }

  ngOnInit(): void {
  }

}
