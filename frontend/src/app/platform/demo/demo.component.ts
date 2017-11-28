import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import * as ol from 'openlayers';


@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {
  dropData: string;

  constructor(
    private cd:ChangeDetectorRef
  ) {
    this.dropData = "xx";
  }

  ngOnInit() {

    const container = document.getElementById('popup');
    var content = document.getElementById('popup-content');
    const closer = document.getElementById('popup-closer');

    const  london= new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat([-0.12755, 51.507222]))
    });

    london.setStyle(new ol.style.Style({
      image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
        color: '#8959A8',
        crossOrigin: 'anonymous',
        src: 'https://openlayers.org/en/v4.5.0/examples/data/dot.png'
      }))
    }));


    const moscow = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat([37.6178, 55.7517]))
    });


    moscow.setStyle(new ol.style.Style({
      image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
        color: '#8959A8',
        crossOrigin: 'anonymous',
        src: 'https://openlayers.org/en/v4.5.0/examples/data/dot.png',
        scale: 2
      }))
    }));

    const svg = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="30px" height="30px" viewBox="0 0 30 30" enable-background="new 0 0 30 30" xml:space="preserve">' +
      '<path fill="#156BB1" d="M22.906,10.438c0,4.367-6.281,14.312-7.906,17.031c-1.719-2.75-7.906-12.665-7.906-17.031S10.634,2.531,15,2.531S22.906,6.071,22.906,10.438z"/>' +
      '<circle r="4.81146" cy="10.17018" cx="15" fill="#FFFFFF"/>' +
      '<text stroke="#000000" transform="matrix(0.3552123327002192,0,0,0.3552123327002192,2.6489298433685144,-12.463694918305748) " xml:space="preserve" text-anchor="middle" font-family="serif" font-size="24" id="svg_3" y="71.07833" x="34.87671" stroke-width="0" fill="#000000">3</text>' +
      '</svg>';

    const mysvg = new Image();
    mysvg.src = 'data:image/svg+xml,' + svg;


    const style = new ol.style.Style({
      image: new ol.style.Icon({
        img: mysvg,
        imgSize: [30, 30],
        scale: 2
      })
    });

    moscow.setStyle(style);

    const istanbul = ol.proj.fromLonLat([28.9744, 41.0128]);
    const rome = ol.proj.fromLonLat([12.5, 41.9]);
    const bern = ol.proj.fromLonLat([7.4458, 46.95]);



    const vectorSource = new ol.source.Vector({
      features: [london, moscow]
    });

    const vectorLayer = new ol.layer.Vector({
      source: vectorSource
    });

    const rasterLayer = new ol.layer.Tile({
      source: new ol.source.TileJSON({
        url: 'https://api.tiles.mapbox.com/v3/mapbox.geography-class.json?secure',
        crossOrigin: ''
      })
    });


    const overlay = new ol.Overlay(({
      element: container,
      autoPan: true
    }));

    /**
     * Add a click handler to hide the popup.
     * @return {boolean} Don't follow the href.
     */
    closer.onclick = function() {
      overlay.setPosition(undefined);
      closer.blur();
      return false;
    };



    const view = new ol.View({
      center: [0, 0],
      zoom: 3
    });


    const map = new ol.Map({
      layers: [rasterLayer, vectorLayer],
      overlays: [overlay],
      target: 'map',
      loadTilesWhileAnimating: true,
      view: view
    });

    map.on('singleclick', function(evt) {
      var coordinate = evt.coordinate;
      var hdms = ol.coordinate.toStringHDMS(ol.proj.transform(
        coordinate, 'EPSG:3857', 'EPSG:4326'));

      content.innerHTML = '<p>You clicked here:</p><code>' + hdms +
        '</code>';

      this.dropData = hdms; // try to update the value

      overlay.setPosition(coordinate);

      this.cd.detectChanges();
    });

  }

}
