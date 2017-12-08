import {Component, Input, OnInit} from '@angular/core';

import {MarkerService} from "../../services/marker.service";
import {CompanyService} from "../../services/company.service";
import Company from "../../models/company.model";
import AboutUser from "../../models/aboutUser.model";
import {Marker} from "../../models/marker.model";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-bottom',
  templateUrl: './bottom.component.html',
  styleUrls: ['./bottom.component.scss']
})
export class BottomComponent implements OnInit {
  @Input() aboutUser: AboutUser;

  newMarker: Marker;

  companiesList: Company[];
  companiesDictionnary: {};
  companiesLabel: any[];
  companiesListSort: string[][]

  constructor(
    private data: DataService,
    private markerService: MarkerService,
    private companyService: CompanyService
  ) {

      this.newMarker = new Marker("1A2Z3E", {longitude: 0, latitude:0}, []);
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
          // console.log("key: " + key + ", value: " + this.companiesDictionnary[key])
          this.companiesListSort.push(this.companiesDictionnary[key]);
        }

      })

  }

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
    this.aboutUser.currentYear = bool;
    this.data.changeAboutUser(this.aboutUser);

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
