import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { MapBrowserEvent, Feature,style } from 'openlayers';
import {Marker} from "../../models/marker.model";
import * as ol from 'openlayers';
import Layer = ol.layer.Layer;

@Component({
  selector: 'app-center',
  templateUrl: './center.component.html',
  styleUrls: ['./center.component.scss']
})
export class CenterComponent implements OnInit{
  noMarker : boolean;
  listMarker : Marker [];
  @ViewChild('serverContentInput') serverContentInput : ElementRef;

  @ViewChild('titi') titi : ElementRef;
  @ViewChild('toto') toto : ElementRef;
  style : style.Style = new style.Style({
    stroke :new style.Stroke({color: '#f00',      width: 1}),
    fill : new style.Fill({color : 'rgba(255,0,0,0.1)'})
  });


  constructor() {
    this.noMarker = true;
    this.listMarker = [
      new Marker({longitude:2.333333, latitude:48.866667}),
      new Marker({longitude:7.261953, latitude:43.710173}),
];
  }

  ngOnInit() {

  }

  onClickMarker(event: MapBrowserEvent) {


    let test = event.map.forEachLayerAtPixel(event.pixel, (layer: Layer) => {
      return layer;
    });


    let toto = event.map.forEachFeatureAtPixel(event.pixel, (feature: Feature) => {
      return feature;
    });


    let vectorTest : ol.layer.Vector = new ol.layer.Vector({
      source : new ol.source.Vector(),
      map: this.titi.nativeElement,
      style : this.style
    });

    toto.getGeometry();
    let geo =new ol.Feature({
      geometry: new ol.geom.LineString((<any>toto.getGeometry()).getCoordinates()),
      name: 'My Polygon'
    });

    console.log(geo.getGeometry());
    console.log(toto.getGeometry());
    vectorTest.getSource().addFeature(toto)


    /*   if (test){
         if ((<string>test.getId()).includes("Location")) {
           console.log(test.getStyleFunction());
         } else if ((<string>test.getId()).length == 3) {
           event.map.getFeaturesAtPixel()
         }
     }*/




  }


}
