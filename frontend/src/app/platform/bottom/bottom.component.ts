import {Component, Input, OnInit} from '@angular/core';

import {MarkerService} from "../../services/marker.service";
import Marker from "../../models/marker.model";
import {CompanyService} from "../../services/company.service";
import Company from "../../models/company.model";

@Component({
  selector: 'app-bottom',
  templateUrl: './bottom.component.html',
  styleUrls: ['./bottom.component.scss']
})
export class BottomComponent implements OnInit {
  @Input() aboutUser: {};

  newMarker: Marker;
  currentYear: boolean;

  companiesList: Company[];
  companiesDictionnary: {};
  companiesLabel: any[];
  companiesListSort: string[][]

  constructor(
    private markerService: MarkerService,
    private companyService: CompanyService
  ) {
    this.newMarker = new Marker();
    this.companiesDictionnary= {} ;

    this.companiesLabel = [];
    this.companiesListSort = [];


  }

  ngOnInit(): void {
    this.companyService.getCompanies()
      .subscribe(companies => {
        this.companiesList = companies

        /* All companies transformed into json key:letter, value: [companies]*/
        for (let c of this.companiesList) {
          let key = c.name[0];

          // if (!this.companiesLabel.includes(key)) {
          if (this.companiesDictionnary[key] == null) {
            // this.companiesLabel.push(key);
            this.companiesDictionnary[key] = [c.name]; // create list if param doesn't exist in the json
          } else {
            this.companiesDictionnary[key].push(c.name); // i.e : {'A' : [..., 'Amadeus']}
          }
        }


        /* json key:letter, value: [companies] transformed into Array [['A...','A....'], ['G...'], ['N..','N..']]
         * so that we can iterate with ngFor */
        for(let key in this.companiesDictionnary)
        {
          console.log("key: " + key + ", value: " + this.companiesDictionnary[key])
          this.companiesListSort.push(this.companiesDictionnary[key]);
        }

      })

  }

  // settingsCurrent = {
  //   theme: 'ios'
  // };

  // myselectDepartment: any = ['SI', 'ELEC'];
  // settingsDepartment: any = {
  //   theme: 'ios',
  //   select: 'multiple',
  //   display: 'inline',
  // };

  myselectCompany: any = [];
  settingsCompany: any = {
    theme: 'ios',
    display: 'inline',
    label: 'Name',
    width: [50, 270],
    group: true,
    groupLabel: '&nbsp;',
    select: 'multiple'
  };


  changeBoolCurrent(bool:boolean) {
    this.currentYear = bool;
  }

  create()  {

    this.newMarker.coords= {
      longitude:this.getRandomInRange(-180, 180, 3),
      latitude:this.getRandomInRange(-180, 180, 3)
    }

    // Create first the user
    console.log(this.newMarker);
    this.markerService.createMarker(this.newMarker)
      .subscribe((res) => {

        console.log(res.data);
      })
  }

  getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
  }
}
