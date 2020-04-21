import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { IHash, IHashWithObject } from '../shared/Hash';
import { State, StateWithData } from '../shared/state.model';
import { PatientStatus } from '../shared/patient-status.model';
import { LoadingBarService } from '@ngx-loading-bar/core';

import * as Chart from 'chart.js';

@Component({
  selector: 'app-data-display',
  templateUrl: './data-display.component.html',
  styleUrls: ['./data-display.component.css']
})
export class DataDisplayComponent implements OnInit {

  states = [];
  myHashObj: IHashWithObject = {};
  selectedValue: string;
  States: State[] = [];
  DistrictsData: StateWithData[] = [];

  barChart: Chart;
  lables = [];
  figure = [];

  StatesArray: [];

  TotalConfirmedCasesStateWise = 0;
  TotalRecoveredCasesStateWise = 0;
  TotalDeceasedCasesStateWise = 0;
  TotalActiveCasesStateWise = 0;

  displayStateWiseStats = false;

  constructor(private dataService: DataService, private loader: LoadingBarService) { }

  ngOnInit() {
    this.dataService.getAllStates().subscribe(resultData => {
      for (const [key, value] of Object.entries(resultData)) {
        this.States.push({
          StateCode: value['statecode'],
          StateName: key
        });
        this.DistrictsData.push({
          StateCode: value['statecode'],
          DistictsRecord: value['districtData']
        });
      }
    });

    console.log(this.DistrictsData);
  }

  onOptionsSelected() {
    this.loader.start();
    this.DistrictsData.forEach((obj) => {
      if (obj.StateCode === this.selectedValue) {
        this.myHashObj[obj.StateCode] = obj.DistictsRecord;
      }
    });
    this.drawChart();
    this.drawTable();
  }

  drawChart() {
    if (this.barChart) {
      this.barChart.destroy();
      this.lables = [];
      this.figure = [];
    }
    for (const [key, value] of Object.entries(this.myHashObj[this.selectedValue])) {
      this.lables.push(key);
      this.figure.push(value['confirmed']);
    }
    this.barChart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: this.lables,
        datasets: [
          {
            data: this.figure,
            borderColor: '#3cba9f',
            backgroundColor: [
              '#c28d8f', '#b2ded3', '#bee5c4', '#c5e1b7', '#b9d3b0', '#f9ab8e', '#f9908e', '#f88f79', '#fcdaf4', '#194052',
              '#89b043', '#cd6ae8', '#fcdaf4', '#f5faed', '#e1f3e4', '#fdf8e7', '#eee2f7', '#dafafe', '#7ebad2',
              '#946370', '#c28d8f', '#51c791', '#c48a8d', '#b00000', '#c29a92', '#bdacea', '#e6ff9a', '#eeeeee',
              '#c0c0c0', '#000000', '#420420', '#696969', '#767c6f', '#c6d0ba', '#8ea1bb', '#d8cdbe', '#b2caea',
              '#ead2b2', '#bba88e', '#a6c6a4', '#948ee3', '#ffd05c', '#145fa7'
            ],
            fill: true
          }]
      },
      options: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'Total Confirmed Cases'
        },
        layout: {
          padding: {
            left: 50,
            right: 0,
            top: 0,
            bottom: 0
          }
        },

        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              return `Total Cases: ` + tooltipItem.value;
            }
          }
        },
        scales: {
          xAxes: [{
            stacked: true,
            ticks: {
              beginAtZero: true
            }
          }],
          yAxes: [{
            stacked: false,
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }


  drawTable() {
    this.TotalActiveCasesStateWise = 0;
    this.TotalConfirmedCasesStateWise = 0;
    this.TotalRecoveredCasesStateWise = 0;
    this.TotalDeceasedCasesStateWise = 0;

    this.dataService.getStatesDailyData()
      .subscribe(response => {
        let data;
        this.StatesArray = [];
        for (const [key, value] of Object.entries(response)) {
          data = response[key];
          this.StatesArray = data;
        }

        for (const index in this.StatesArray) {
          if (this.StatesArray[index]['status'] === PatientStatus.Confirmed) {
            this.TotalConfirmedCasesStateWise += +this.StatesArray[index][this.selectedValue.toLowerCase()];
          } else if (this.StatesArray[index]['status'] === PatientStatus.Recovered) {
            this.TotalRecoveredCasesStateWise += +this.StatesArray[index][this.selectedValue.toLowerCase()]
          } else if (this.StatesArray[index]['status'] === PatientStatus.Deceased) {
            this.TotalDeceasedCasesStateWise += +this.StatesArray[index][this.selectedValue.toLowerCase()]
          }
        }

        this.TotalActiveCasesStateWise = this.TotalConfirmedCasesStateWise -
            (this.TotalRecoveredCasesStateWise - this.TotalDeceasedCasesStateWise);
        this.loader.stop();
        this.displayStateWiseStats = true;
      });
  }

}
