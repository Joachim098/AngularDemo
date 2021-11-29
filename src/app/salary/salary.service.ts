import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { tap, catchError, map, delay } from "rxjs/operators";
import { Salary } from "./salary";

@Injectable({
    providedIn: 'root'
})
export class SalaryService{

    constructor(private http: HttpClient){}

    private salaryUrl = 'api/salary';

    getSalaries(): Observable<Salary[]>{
        return this.http.get<Salary[]>(this.salaryUrl).pipe(
            delay(2000)
        );
    }
    getSalary(id: number) : Observable<Salary>{
        if (id === 0){
            return of(this.initializeSalary());
        }
        const url = `${this.salaryUrl}/${id}`
        return this.http.get<Salary>(url).pipe(
            delay(2000),
            tap(data => console.log('getSalary: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }
    createSalary(salary: Salary): Observable<{}>{
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `${this.salaryUrl}`
        return this.http.post<Salary>(url, salary, { headers }).pipe(
            delay(2000),
            tap((data) => console.log('New Salary: ' + JSON.stringify(data))),
            map(() => salary),
            catchError(this.handleError)
        );
    }
    updateSalary(salary: Salary): Observable<Salary>{
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `${this.salaryUrl}/${salary.id}`
        return this.http.put<Salary>(url, salary, { headers }).pipe(
            delay(2000),
            tap(() => console.log('Updated Salary: ' + salary)),
            map(() => salary),
            catchError(this.handleError)
        );
    }
    deleteSalary(id: number): Observable<{}>{
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `${this.salaryUrl}/${id}`;
        return this.http.delete<Salary>(url, { headers }).pipe(
            delay(2000),
            tap(() => console.log('Deleted Salary Id: ' + id)),
            catchError(this.handleError)
        );
    }
    private handleError(err: HttpErrorResponse){
        let errorMessage = '';
        if(err.error instanceof ErrorEvent){
            errorMessage = `An error occured , ${err.error.message}`;
        }else{
            errorMessage = `Server returned code:, ${err.status} , Error message:  + ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }
    initializeSalary(): Salary{
        return new Salary();
    }
}


