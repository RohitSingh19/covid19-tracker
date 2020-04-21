import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TotalCases } from '../shared/death-recoveries.model';
import { Resources } from '../shared/resources.model';

@Injectable({
    providedIn: 'root'
})
export class DataService {

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
}