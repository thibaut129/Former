import {Component, OnInit} from '@angular/core';
import * as ol from 'openlayers';
import {ExperienceService} from "../../services/experience.service";
import Experience from "../../models/experience.model";

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {
  dropDataContent:string;
  experiencesList: Experience[];

  constructor(
    // private todoService: TodoService,
    private experienceService: ExperienceService
  ) { }

  ngOnInit(): void {
    this.dropDataContent = "rien";

    this.experienceService.getExperiences()
      .subscribe(experiences => {
        this.experiencesList = experiences;
        console.log(experiences)
      });

    let iconFeature = new ol.Feature({
      geometry: new ol.geom.Point([0, 0]),
      name: 'Null Island',
      population: 4000,
      rainfall: 500
    });

    let iconStyle = new ol.style.Style({
      image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: 'https://openlayers.org/en/v4.5.0/examples/data/icon.png'
      }))
    });

    iconFeature.setStyle(iconStyle);

    let vectorSource = new ol.source.Vector({
      features: [iconFeature]
    });

    let vectorLayer = new ol.layer.Vector({
      source: vectorSource
    });

    let rasterLayer = new ol.layer.Tile({
      source: new ol.source.TileJSON({
        url: 'https://api.tiles.mapbox.com/v3/mapbox.geography-class.json?secure',
        crossOrigin: ''
      })
    });

    let map = new ol.Map({
      layers: [rasterLayer, vectorLayer],
      target: document.getElementById('map'),
      view: new ol.View({
        center: [0, 0],
        zoom: 3
      })
    });

    let element = document.getElementById('popup');

    let popup = new ol.Overlay({
      element: element,
      positioning: 'bottom-center',
      stopEvent: false,
      offset: [0, -50]
    });
    map.addOverlay(popup);

    // display popup on click
    map.on('click', function(evt) {
      let feature = map.forEachFeatureAtPixel(evt.pixel,
        function(feature) {
          return feature;
        });
      if (feature) {
        let coordinates = (<ol.geom.Point>feature.getGeometry()).getCoordinates();
        popup.setPosition(coordinates);
        $(element).popover({
          'placement': 'top',
          'html': true,
          'content': feature.get('name')
        });
        $(element).popover('show');
      } else {
        $(element).popover('dispose');
      }
    });

    // change mouse cursor when over marker
    map.on('pointermove', function(e) {
      if (e.dragging) {
        $(element).popover('dispose');
        return;
      }
      let pixel = map.getEventPixel(e.originalEvent);
      let hit = map.hasFeatureAtPixel(pixel);
      (<HTMLElement>map.getTarget()).style.cursor = hit ? 'pointer' : '';
    });
  }
}
