import { Dates } from "./dates";
import { YearMonth } from "./year-month";

export class Salary{
    id: number;
    userId: number;
    companyName: string;
    amount: number;
    currency: string;
    exactPeriod: string;
    taxYear?: YearMonth;
    taxMonth?: YearMonth;
    taxDate?: Dates;

    getTestData(): Salary[]{
        let result: Salary[] = [];
        let id: number = 1;
        let data = new Salary();

        data.id = id;
        data.companyName = 'Company 1';
        data.amount = 200;
        data.currency = 'ZAR';
        data.exactPeriod = 'Tax per Year';
        data.taxYear = new YearMonth();
        data.taxYear.year = "2021/2022";
        result.push(data);
        id++;

        data = new Salary();
        data.id = id;
        data.companyName = 'Company 2';
        data.amount = 200;
        data.currency = 'DKK';
        data.exactPeriod = 'Tax per Month';
        data.taxMonth = new YearMonth();
        data.taxMonth.month = "Apr-2021";
        result.push(data);
        id++;

        data = new Salary();
        data.id = id;
        data.companyName = 'Company 3';
        data.amount = 200;
        data.currency = 'USD';
        data.exactPeriod = 'Tax per Specific Date';
        data.taxDate = new Dates();
        data.taxDate.day = '5';
        data.taxDate.month = 'Mar';
        data.taxDate.year = '2015';
        result.push(data);
        id++;

        return result;
    }
}