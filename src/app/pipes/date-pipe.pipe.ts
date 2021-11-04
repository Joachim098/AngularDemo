import { Pipe, PipeTransform } from '@angular/core';
import { Salary } from '../salary/salary';

@Pipe({
  name: 'datePipe'
})
export class DatePipePipe implements PipeTransform {

  transform(value: Salary): string {
    if(value.taxDate) return value.taxDate.day + '-'+ value.taxDate.month+ '-'+ value.taxDate.year;
    if (value.taxYear) return value.taxYear.year;
    if (value.taxMonth) return value.taxMonth.month;
    return 'Error';
  }
}
