import { Component, OnInit } from '@angular/core';
import { Info } from '../salary-information';

@Component({
  selector: 'app-salary-list',
  templateUrl: './salary-list.component.html',
  styleUrls: ['./salary-list.component.css']
})
export class SalaryListComponent implements OnInit {

  data: Info;

  constructor() { 
    this.data = new Info();
  }

  ngOnInit(): void {

  }

}
