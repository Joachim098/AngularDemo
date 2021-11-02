import { Pipe, PipeTransform } from '@angular/core';
import { Info } from '../salary/salary-information';

@Pipe({
  name: 'datePipe'
})
export class DatePipePipe implements PipeTransform {

  transform(value: Info): string {
    if(value.taxDate) return value.taxDate.day + '-'+ value.taxDate.month+ '-'+ value.taxDate.year;
    if (value.taxYear) return value.taxYear.year;
    if (value.taxMonth) return value.taxMonth.month;
    return 'Error';
  }
}
