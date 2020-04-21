import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TotalCases } from '../shared/death-recoveries.model';
import { Resources } from '../shared/resources.model';
import { Observable, Subject } from 'rxjs';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    private subject = new Subject<any>();

    constructor(private http: HttpClient) {}

    getRawData() {
        return this.http.get<any[]>('https://api.covid19india.org/raw_data.json');
    }

    getDeathRecoveredData(): Observable<TotalCases[]> {
        return this.http.get<TotalCases[]>('https://api.covid19india.org/deaths_recoveries.json');
    }

    getAllStates() {
        return this.http.get<any[]>('https://api.covid19india.org/state_district_wise.json');
    }

    // getStateWiseData() {
    //     return this.http.get<any[]>('https://api.covid19india.org/state_district_wise.json');
    // }

    getResources() {
        return this.http.get<Resources[]>('https://api.covid19india.org/resources/resources.json');
    }

    getStatesDailyData() {
        return this.http.get<any[]>('https://api.covid19india.org/states_daily.json');
    }

    setSelectedState(message: string) {
        this.subject.next({data: message});
    }

    getSeletedState(): Observable<any> {
        return this.subject.asObservable();
    }
}