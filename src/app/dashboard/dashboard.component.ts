import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { DataService } from '../shared/data.service';
import { DeathRecvover } from '../shared/death-recoveries.model';
import { IHash } from '../shared/Hash';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Resources } from '../shared/resources.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  ResultArray: DeathRecvover[] = [];
  Recovered = 0;
  Deceased = 0;
  TotalCases = 0;
  ActiveCases = 0;
  states = [];
  optionSelected: string;
  TotalRawData = [];
  selectedStatehashMap: IHash = {};
  lables = [];
  figure = [];
  colors = [];
  table = false;
  myHash: IHash = {};
  barChart: Chart;
  IsUserSelectsState =  false;
  resourceArr: Resources [] = [];
  buttonLabel = 'Show';
  selectedOption: string;

  constructor(private dataService: DataService, private loader: LoadingBarService) { }

  ngOnInit(): void {

    this.loader.start();
    this.dataService.getDeathRecoveredData().subscribe((result: DeathRecvover[]) => {
      let data;
      for (const [key, value] of Object.entries(result)) {
        data = value;
        this.ResultArray = data;
      }

      for (const index in this.ResultArray) {
        if (this.ResultArray[index].patientstatus === 'Recovered') {
          this.Recovered++;
        } else if (this.ResultArray[index].patientstatus === 'Deceased') {
          this.Deceased++;
        }
      }

      this.dataService.getRawData().subscribe(resultData => {
        if (resultData) {
          let RawData;
          for (const [key, value] of Object.entries(resultData)) {
            RawData = value;
          }
          this.loader.stop();
          this.TotalRawData = RawData;
          this.TotalCases = RawData.length;
          this.ActiveCases = this.TotalCases - (this.Recovered + this.Deceased);
        }
      });

      this.dataService.getStates().subscribe(resultData => {
        for (const [key, value] of Object.entries(resultData)) {
          this.states.push(key);
          this.myHash[key] = value;
        }
      });
    });
  }

  onOptionsSelected(event) {
    this.optionSelected = event;
    this.resourceArr = [];
    this.IsUserSelectsState = false;
    this.fetchAllStatesData(this.optionSelected);

  }

  showHelpCentres() {
    this.IsUserSelectsState = !this.IsUserSelectsState;
    if (this.optionSelected) {
      this.fetchAllResources(this.optionSelected);
      this.IsUserSelectsState = true;
    } else {
      alert('Select State to fetch help centers');
      this.IsUserSelectsState = false;
    }

    // if (this.IsUserSelectsState) {
    //   this.buttonLabel = 'Hide';
    // } else {
    //   this.buttonLabel = 'Show';
    // }
  }

  fetchAllStatesData(selectdState: string) {
    if (this.barChart) {
      this.barChart.destroy();
      this.lables = [];
      this.figure = [];
    }
    for (const [key, value] of Object.entries(this.myHash[selectdState]['districtData'])) {
      this.selectedStatehashMap[key] = value['confirmed'];
      this.lables.push(key);
      this.figure.push(value['confirmed']);
    }
    this.getRandomColor();
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
          text: 'Total confirmed cases in districts of ' + selectdState
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
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
  getRandomColor() {
    let count = this.figure.length;
    while (count > 0) {
      const letters = '0123456789ABCDEF'.split('');
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      this.colors.push(color);
      count--;
    }
  }



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
