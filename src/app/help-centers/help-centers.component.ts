import { Component, OnInit } from '@angular/core';
import { DataService } from '../data-display/data.service';
import { Resources } from '../shared/resources.model';

@Component({
  selector: 'app-help-centers',
  templateUrl: './help-centers.component.html',
  styleUrls: ['./help-centers.component.css']
})
export class HelpCentersComponent implements OnInit {

  constructor(private dataService: DataService) { }

  resourceArr: Resources[] = [];
  displayButton = false;
  SelectedState: string;
  butonClicked = false;

  ngOnInit() {
    this.dataService.getSeletedState().subscribe(response => {
      if (response) {
        this.SelectedState = response.data;
        this.displayButton = true;
        this.resourceArr = [];
      }
    });
  }

  showHelpCentres() {
    this.fetchAllResources(this.SelectedState);
    this.butonClicked = true;
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
