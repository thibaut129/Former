import { Component, OnInit } from '@angular/core';

import {MarkerService} from "../../services/marker.service";
import Marker from "../../models/marker.model";

@Component({
  selector: 'app-bottom',
  templateUrl: './bottom.component.html',
  styleUrls: ['./bottom.component.scss']
})
export class BottomComponent implements OnInit {
  newMarker: Marker;

  constructor(
    private markerService: MarkerService,
  ) {
    this.newMarker = new Marker();
  }

  ngOnInit(): void {
  }

  myselectDepartment: any = ['SI', 'ELEC'];
  settingsDepartment: any = {
    theme: 'ios',
    select: 'multiple',
    display: 'inline',
  };

  myselectCompany: any = ['A1', 'N2'];
  settingsCompany: any = {
    theme: 'ios',
    display: 'inline',
    label: 'Name',
    width: [50, 270],
    group: true,
    groupLabel: '&nbsp;',
    select: 'multiple'
  };

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
