import { Dates } from "./dates-per-specific-date";
import { YearMonth } from "./dates-per-year-month";

export class Info{
    id: number;
    userId: number;
    companyName: string;
    amount: number;
    currency: string;
    exactPeriod: string;
    taxYear?: YearMonth;
    taxMonth?: YearMonth;
    taxDate?: Dates;

    getTestData(userId: number): Info[]{
        let result: Info[] = [];
        let id: number = 1;
        let data = new Info();

        data.id = id;
        data.userId = userId;
        data.companyName = 'Technology 1';
        data.amount = 200;
        data.currency = 'ZAR';
        data.exactPeriod = 'Taxt Year';
        data.taxYear = new YearMonth();
        data.taxYear.year = "2021/2022";
        result.push(data);
        id++;

        data = new Info();
        data.id = id;
        data.userId = userId;
        data.companyName = 'Technology 2';
        data.amount = 200;
        data.currency = 'ZAR';
        data.exactPeriod = 'Tax per Month';
        data.taxMonth = new YearMonth();
        data.taxMonth.month = "Apr-2021";
        result.push(data);
        id++;

        data = new Info();
        data.id = id;
        data.userId = userId;
        data.companyName = 'Technology 3';
        data.amount = 200;
        data.currency = 'ZAR';
        data.exactPeriod = 'Taxt per Specific Date';
        data.taxDate = new Dates();
        data.taxDate.day = 5;
        data.taxDate.month = 'Mar';
        data.taxDate.year = 2015;
        result.push(data);
        id++;

        return result;
    }
}