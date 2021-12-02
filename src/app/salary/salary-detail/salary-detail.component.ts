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
  showDelete: Boolean;
  showButtons: Boolean = true;
  
  constructor() { }
  
  ngOnInit(): void {}

  confirmDelete(){
    this.showDelete = true;
    this.showButtons = false;
  }
  cancelDelete(){
    this.showButtons = true;
    this.showDelete = false;
  }
  deletedChild(): void{
    if (this.showDelete){
      this.notify.emit(this.salary.id.toString());
    }
  }
}
