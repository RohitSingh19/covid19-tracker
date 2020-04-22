import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TotalCases } from '../shared/death-recoveries.model';
import { Resources } from '../shared/resources.model';
import { Observable, Subject, throwError } from 'rxjs';

import { catchError, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    private subject = new Subject<any>();

    constructor(private http: HttpClient) {}

    getRawData() {
        return this.http.get<any[]>('https://api.covid19india.org/raw_data.json')
                    .pipe(catchError(this.handleError));
    }

    getDeathRecoveredData(): Observable<TotalCases[]> {
        return this.http.get<TotalCases[]>('https://api.covid19india.org/deaths_recoveries.json')
                        .pipe(catchError(this.handleError));
    }

    getAllStates() {
        return this.http.get<any[]>('https://api.covid19india.org/state_district_wise.json')
                            .pipe(catchError(this.handleError));
    }

    // getStateWiseData() {
    //     return this.http.get<any[]>('https://api.covid19india.org/state_district_wise.json');
    // }

    getResources() {
        return this.http.get<Resources[]>('https://api.covid19india.org/resources/resources.json')
                        .pipe(catchError(this.handleError));
    }

    getStatesDailyData() {
        return this.http.get<any[]>('https://api.covid19india.org/states_daily.json')
                .pipe(catchError(this.handleError));

    }

    setSelectedState(message: string) {
        this.subject.next({data: message});
    }

    getSeletedState(): Observable<any> {
        return this.subject.asObservable();
    }



    private handleError(errorMsg: HttpErrorResponse) {
        let errorMessage = 'An unknown error has occurred';
        if (!errorMsg.error || !errorMsg.error.error) {
            return throwError(errorMsg);
        }
        return throwError(errorMessage);
    }

}