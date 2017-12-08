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
  aboutUser: AboutUser;

  filteredExperiencesList: Experience[];
  filteredExperiencesListSI: Experience[];
  filteredExperiencesListMAM: Experience[];
  filteredExperiencesListElec: Experience[];

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

    this.listMarker = [];
    this.data.currentAboutUser.subscribe(message => this.aboutUser = message)
    // this.data.filteredExperiencesList.subscribe(message => this.filteredExperiencesList = message)
    // this.data.filteredExperiencesListSI
    //   .subscribe(message => {
    //       this.filteredExperiencesListSI = message
    //       this.listMarker.push(new Marker("Location123456", {longitude:2.333333, latitude:48.866667}, this.filteredExperiencesListSI));
    //   })
    // this.data.filteredExperiencesListMAM.subscribe(message => {
    //   this.filteredExperiencesListMAM = message;
    //   this.listMarker.push(new Marker("Locationazerty", {longitude:7.261953, latitude:43.710173}, this.filteredExperiencesListMAM));
    // })

    this.noMarker = true;

  }

  ngOnInit() {
    this.data.filteredExperiencesList.subscribe(message =>{

      console.log('new filter');
      this.filteredExperiencesList = message
      this.listMarker =  [];
      // let coordsList = {longitude:Number, latitude:Number}[];
      let coordsList = [];
      console.log(message.length);
      for (let e of message) {

        console.log(e);
        console.log(e.coords);

        // if (!coordsList.includes(e.coords)) {
        if (!this.isIncludeArrayJson(coordsList, e.coords)) {

          coordsList.push(e.coords);
          this.listMarker.push(new Marker('Location'+e._id, {longitude:e.coords.longitude, latitude:e.coords.latitude}, [e]));

        } else { // si coords existent deja

          console.log("same coords");

          for (let m of this.listMarker) {
            // recupérer le marker des bonnes coordonnées
            if ((m.coords.latitude === e.coords.latitude)&&(m.coords.longitude === e.coords.longitude)) {
              // if (m.coords == e.coords) {
              // ajouter l'experience au marker recup
              m.experiences.push(e);
            }
          }
        } //["a","b"]}//[{longitude:, latitude},{longitude:, latitude},{},{},{}]

        // si coords existent deja
        // recupérer le marker des bonnes coordonnées
        // ajouter l'experience au marker recup

      }
    })
    // this.data.filteredExperiencesListSI
    //   .subscribe(message => {
    //     this.filteredExperiencesListSI = message
    //
    //     // ADD to INFINITE !! (use includes ?)
    //     if (this.filteredExperiencesListSI[0] != null)
    //       this.listMarker.push(new Marker("Location123456", {longitude:2.333333, latitude:48.866667}, this.filteredExperiencesListSI));
    //   })
    // this.data.filteredExperiencesListMAM.subscribe(message => {
    //   this.filteredExperiencesListMAM = message;
    //
    //   // ADD to INFINITE !! (use includes ?)
    //   if ((this.filteredExperiencesListMAM[0] != null))
    //     this.listMarker.push(new Marker("Locationazerty", {longitude:7.261953, latitude:43.710173}, this.filteredExperiencesListMAM));
    // })

    // this.listMarker = [
    //   new Marker("Location123456", {longitude:2.333333, latitude:48.866667}, this.filteredExperiencesListSI),
    //   new Marker("Locationazerty", {longitude:7.261953, latitude:43.710173}, this.filteredExperiencesListMAM),
    // ];
  }

  isIncludeArrayJson(array:{longitude:Number, latitude:Number}[], json:{longitude:Number, latitude:Number}) {
    for(var i = 0; i < array.length; i++) {
      if ((array[i].latitude === json.latitude)&&(array[i].longitude === json.longitude)) {
        return true;
      }
    }
    return false;
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
    this.data.changefilteredSelected(this.filteredExperiencesListSI);
    this.changeZoomMap(); // todo: call when modal closes
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

    }

  }


}
