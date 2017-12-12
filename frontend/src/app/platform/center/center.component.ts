import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { MapBrowserEvent, Feature,style } from 'openlayers';
import {Marker} from "../../models/marker.model";
import * as ol from 'openlayers';
import Layer = ol.layer.Layer;
import AboutUser from "../../models/aboutUser.model";
import {DataService} from "../../services/data.service";
import Experience from "../../models/experience.model";

@Component({
  selector: 'app-center',
  templateUrl: './center.component.html',
  styleUrls: ['./center.component.scss']
})
export class CenterComponent implements OnInit{
  mapMode:boolean;
  zoom:number;
  xMap:number;
  yMap:number;
  aboutUser: AboutUser;

  filteredExperiencesList: Experience[];

  noMarker : boolean;
  listMarker : Marker [];
  @ViewChild('serverContentInput') serverContentInput : ElementRef;

  style : style.Style = new style.Style({
    stroke :new style.Stroke({color: '#f00',      width: 1}),
    fill : new style.Fill({color : 'rgba(255,0,0,0.1)'})
  });


  constructor(
    private data: DataService
  ) {
    // this.mapMode = true;
    this.zoom = 5;
    this.xMap = 5.795122;
    this.yMap = 45.210225;

    this.listMarker = [];
    this.data.currentAboutUser.subscribe(message => {
      this.aboutUser = message
      this.changeZoomMap()

    })

    this.noMarker = true;

  }

  ngOnInit() {
    this.data.mapMode.subscribe(message => this.mapMode = message)

    this.data.filteredExperiencesList.subscribe(message =>{

      console.log('update filteredExperiencesList');
      this.filteredExperiencesList = message
      this.listMarker =  [];
      let coordsList = [];
      for (let e of message) {

        if (!this.isIncludeArrayJson(coordsList, e.coords)) {

          coordsList.push(e.coords);
          this.listMarker.push(new Marker('Location'+e._id, {longitude:e.coords.longitude, latitude:e.coords.latitude}, [e]));

        } else { // si coords existent deja
          console.log("same coords");

          for (let m of this.listMarker) {
            // recupérer le marker des bonnes coordonnées
            if (this.isJsonEqual(m.coords, e.coords)) {
              // ajouter l'experience au marker recup
              m.experiences.push(e);
            }
          }
        }
      }
    })
  }

  isJsonEqual(mcoords:{longitude:Number, latitude:Number}, ecoords:{longitude:Number, latitude:Number}) {
    if ((mcoords.latitude.toFixed(5) === ecoords.latitude.toFixed(5))
      && (mcoords.longitude.toFixed(5) === ecoords.longitude.toFixed(5))) {
      return true;
    }
  }

  isIncludeArrayJson(array:{longitude:Number, latitude:Number}[], json:{longitude:Number, latitude:Number}) {
    for(var i = 0; i < array.length; i++) {
      if (this.isJsonEqual(array[i], json)) { // compare 5 first digit
        return true;
      }
    }
    return false;
  }


  changeModeMap() {
    this.mapMode = !this.mapMode;

    this.data.changeMapMode(this.mapMode);
    this.data.changefilteredSelected(this.filteredExperiencesList);
  }

  onClickMarker(event: MapBrowserEvent) {
    let feature = event.map.forEachFeatureAtPixel(event.pixel, (feature: Feature) => {
      return feature;
    });

    // console.log(this.listMarker);
    if ((<string>feature.getId()).includes("Location")) {

      for (let m of this.listMarker) {
        if (m._id == <string>feature.getId()) {
          // update data of selectedFiltered
          this.data.changefilteredSelected(m.experiences);
          break;
        }
      }
      this.mapMode = false;
      this.data.changeMapMode(this.mapMode);


    }

  }


  changeZoomMap(){
    this.xMap += 0.000001;
    this.yMap += 0.000001;
    if (this.aboutUser.typeResearch == "Etranger") {
      this.zoom = 3;
      this.xMap = -20;
      this.yMap = 45;
    } else if (this.aboutUser.typeResearch == "France") {
      this.xMap = 2.5;
      this.yMap = 47;
      this.zoom = 6;

    } else if (this.aboutUser.typeResearch == "Local") {
      this.zoom = 7;
      this.xMap = 5.795122;
      this.yMap = 45.210225;
    }
  }

}
