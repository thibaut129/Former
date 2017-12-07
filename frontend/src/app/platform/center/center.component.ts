import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { MapBrowserEvent, Feature,style } from 'openlayers';
import {Marker} from "../../models/marker.model";
import * as ol from 'openlayers';
import Layer = ol.layer.Layer;
import AboutUser from "../../models/aboutUser.model";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-center',
  templateUrl: './center.component.html',
  styleUrls: ['./center.component.scss']
})
export class CenterComponent implements OnInit{
  mapMode:boolean;
  zoom:number;
  aboutUser: AboutUser;

  noMarker : boolean;
  listMarker : Marker [];
  @ViewChild('serverContentInput') serverContentInput : ElementRef;

  @ViewChild('titi') titi : ElementRef;
  @ViewChild('toto') toto : ElementRef;
  style : style.Style = new style.Style({
    stroke :new style.Stroke({color: '#f00',      width: 1}),
    fill : new style.Fill({color : 'rgba(255,0,0,0.1)'})
  });


  constructor(
    private data: DataService
  ) {
    this.mapMode = true;
    this.zoom = 5;

    this.data.currentAboutUser.subscribe(message => this.aboutUser = message)

    this.noMarker = true;
    this.listMarker = [
      new Marker({longitude:2.333333, latitude:48.866667}),
      new Marker({longitude:7.261953, latitude:43.710173}),
];
  }

  ngOnInit() {

  }

  changeZoomMap(){
    if (this.aboutUser.typeResearch == "Etranger") {
      this.zoom = 3;
    } else if (this.aboutUser.typeResearch == "France") {
      this.zoom = 5;

    } else if (this.aboutUser.typeResearch == "Local") {
      this.zoom = 7;
    }

  }

  changeModeMap() {
    this.mapMode = !this.mapMode;
    this.changeZoomMap(); // todo: call when modal closes
  }

  onClickMarker(event: MapBrowserEvent) {
    let feature = event.map.forEachFeatureAtPixel(event.pixel, (feature: Feature) => {
      return feature;
    });


    feature.getGeometry();
    console.log(feature.getGeometry());

    if ((<string>feature.getId()).includes("Location")) {
      this.mapMode = false;
    }

  }


}
