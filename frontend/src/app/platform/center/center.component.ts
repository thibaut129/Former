import { Component, OnInit } from '@angular/core';
import * as ol from 'openlayers';
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import {ExperienceService} from "../../services/experience.service";
import Experience from "../../models/experience.model";

@Component({
  selector: 'app-center',
  templateUrl: './center.component.html',
  styleUrls: ['./center.component.scss']
})
export class CenterComponent implements OnInit {
  dropDataContent:string
  experiencesList: Experience[];
  myStyle: any[]

  constructor(
    // private todoService: TodoService,
    private experienceService: ExperienceService
  ) {
  }

  ngOnInit() {
    this.dropDataContent = "rien";

    this.experienceService.getExperiences()
      .subscribe(experiences => {
        this.experiencesList = experiences
        console.log(experiences)
      })


    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');

    // Gradient and pattern are in canvas pixel space, so we adjust for the
    // renderer's pixel ratio
    var pixelRatio = ol.has.DEVICE_PIXEL_RATIO;

    // Generate a rainbow gradient
    function gradient(feature, resolution) {
      var extent = feature.getGeometry().getExtent();
      // Gradient starts on the left edge of each feature, and ends on the right.
      // Coordinate origin is the top-left corner of the extent of the geometry, so
      // we just divide the geometry's extent width by resolution and multiply with
      // pixelRatio to match the renderer's pixel coordinate system.
      var grad = context.createLinearGradient(0, 0,
        ol.extent.getWidth(extent) / resolution * pixelRatio, 0);
      grad.addColorStop(0, 'red');
      grad.addColorStop(1 / 6, 'orange');
      grad.addColorStop(2 / 6, 'yellow');
      grad.addColorStop(3 / 6, 'green');
      grad.addColorStop(4 / 6, 'aqua');
      grad.addColorStop(5 / 6, 'blue');
      grad.addColorStop(1, 'purple');
      return grad;
    }

    // Generate a canvasPattern with two circles on white background
    var pattern = (function() {
      canvas.width = 11 * pixelRatio;
      canvas.height = 11 * pixelRatio;
      // white background
      context.fillStyle = 'white';
      context.fillRect(0, 0, canvas.width, canvas.height);
      // outer circle
      context.fillStyle = 'rgba(102, 0, 102, 0.5)';
      context.beginPath();
      context.arc(5 * pixelRatio, 5 * pixelRatio, 4 * pixelRatio, 0, 2 * Math.PI);
      context.fill();
      // inner circle
      context.fillStyle = 'rgb(55, 0, 170)';
      context.beginPath();
      context.arc(5 * pixelRatio, 5 * pixelRatio, 2 * pixelRatio, 0, 2 * Math.PI);
      context.fill();
      return context.createPattern(canvas, 'repeat');
    }());

    // Generate style for gradient or pattern fill
    var fill = new ol.style.Fill();
    var style = new ol.style.Style({
      fill: fill,
      stroke: new ol.style.Stroke({
        color: '#333',
        width: 2
      })
    });

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    /**
     * The styling function for the vector layer, will return an array of styles
     * which either contains the aboove gradient or pattern.
     *
     * @param {ol.Feature} feature The feature to style.
     * @param {number} resolution Resolution.
     * @return {ol.style.Style} The style to use for the feature.
     */
    var i=0;
    var getStackedStyle = function(feature, resolution) {
      var id = feature.getId();
      if(getRandomInt(1,100)%4===0)
        fill.setColor('blue');
      else if(getRandomInt(1,100)%3===0){
        fill.setColor('red');
      }else{
        fill.setColor('yellow');
      }

      return style;
    };

    // Create a vector layer that makes use of the style function above…
    var vectorLayer = new ol.layer.Vector({
      source: new ol.source.Vector({
        url: 'https://openlayers.org/en/v4.5.0/examples/data/geojson/countries.geojson',
        format: new ol.format.GeoJSON()
      }),
      style: getStackedStyle
    });

    // … finally create a map with that layer.
    var map = new ol.Map({
      layers: [
        vectorLayer
      ],
      target: 'map',
      view: new ol.View({
        center: ol.proj.fromLonLat([7, 52]),
        zoom: 3
      })
    });
  }

}
