import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'SALARY INCOME';

  redirectUser(){
    alert('There are no salary records available. Please add new salary record.');
    this.router.navigateByUrl('/salary-record/0');
  }

  constructor(private router: Router){}
}
