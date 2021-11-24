import { Dates } from "./dates";
import { YearMonth } from "./year-month";

export class Salary{
    id: number;
    companyName: string;
    amount: number;
    currency: string;
    exactPeriod: string;
    taxYear?: YearMonth;
    taxMonth?: YearMonth;
    taxDate?: Dates;
}