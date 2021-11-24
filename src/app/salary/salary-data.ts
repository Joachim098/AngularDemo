import { InMemoryDbService } from "angular-in-memory-web-api";
import { Salary } from "./salary";

export class SalaryData implements InMemoryDbService{
   data: Salary = new Salary();
    createDb() {
        const salary: Salary[]= [
            {
                id: 1,
                companyName: 'Company 1',
                amount: 200,
                currency: 'ZAR',
                exactPeriod: 'Tax per Year',
                taxYear: {
                    year: '2021/2022',
                    month: ''
                } 
            },
            {
                id: 2,
                companyName: 'Company 2',
                amount: 300,
                currency: 'USD',
                exactPeriod: 'Tax per Month',
                taxMonth: {
                    year: '',
                    month: 'Apr-21'
                } 
            },
            {
                id: 3,
                companyName: 'Company 3',
                amount: 300,
                currency: 'DKK',
                exactPeriod: 'Tax per Specific Date',
                taxDate: {
                    day: '5',
                    month: 'Apr',
                    year: '2021'
                } 
            },

        ];
        return { salary };
    }
}