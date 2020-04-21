import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { DataService } from '../data-display/data.service';
import { IHash } from '../shared/Hash';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Resources } from '../shared/resources.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  
  selectedStatehashMap: IHash = {};
  lables = [];
  figure = [];
  colors = [];
  table = false;
  barChart: Chart;
  IsUserSelectsState = false;
  resourceArr: Resources[] = [];
  buttonLabel = 'Show';
  
  StatesArray: [];

  constructor(private dataService: DataService, private loader: LoadingBarService) { }

  ngOnInit(): void {


    this.dataService.getStatesDailyData()
      .subscribe(response => {
        let data;
        this.StatesArray = [];
        for (const [key, value] of Object.entries(response)) {
          data = response[key];
          this.StatesArray = data;
        }
        let val = 0;
        // for (const index in this.StatesArray) {
        //   console.log('start');
        //   if (this.StatesArray[index]['status'] === 'Confirmed') {
        //     val += +this.StatesArray[index]['hr'];
        //   }
        // }
        // console.log(val);
      });


    // this.loader.start();

    

  }

  // onOptionsSelected(event) {
  //   this.optionSelected = event;
  //   this.resourceArr = [];
  //   this.IsUserSelectsState = false;
  //   this.fetchAllStatesData(this.optionSelected);

  // }

  // showHelpCentres() {
  //   this.IsUserSelectsState = !this.IsUserSelectsState;
  //   if (this.optionSelected) {
  //     this.fetchAllResources(this.optionSelected);
  //     this.IsUserSelectsState = true;
  //   } else {
  //     alert('Select State to fetch help centers');
  //     this.IsUserSelectsState = false;
  //   }

  //   // if (this.IsUserSelectsState) {
  //   //   this.buttonLabel = 'Hide';
  //   // } else {
  //   //   this.buttonLabel = 'Show';
  //   // }
  // }

 



  fetchAllResources(selectedState: string) {
    this.dataService.getResources()
      .subscribe((resource: Resources[]) => {
        this.resourceArr = [];
        for (const index in resource['resources']) {
          if (resource['resources']) {
            const key = resource['resources'][index]['state'];
            if (key === selectedState) {
              const value = resource['resources'][index];
              this.resourceArr.push(value);
            }
          }
        }
      });
  }

}
