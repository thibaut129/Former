import { Component, OnInit } from '@angular/core';
import * as ol from 'openlayers';

@Component({
  selector: 'app-global',
  templateUrl: './global.component.html',
  styleUrls: ['./global.component.scss']
})
export class GlobalComponent implements OnInit {

  ngOnInit() {

    const container = document.getElementById('popup');
    const content = document.getElementById('popup-content');
    const closer = document.getElementById('popup-closer');

    const london = ol.proj.fromLonLat([-0.12755, 51.507222]);
    const moscow = ol.proj.fromLonLat([37.6178, 55.7517]);
    const istanbul = ol.proj.fromLonLat([28.9744, 41.0128]);
    const rome = ol.proj.fromLonLat([12.5, 41.9]);
    const bern = ol.proj.fromLonLat([7.4458, 46.95]);


    const overlay = new ol.Overlay(({
      element: container,
    }));


    const view = new ol.View({
      center: istanbul,
      zoom: 6
    });


    const map = new ol.Map({
      layers: [
        new ol.layer.Tile({
          source: new ol.source.TileJSON({
            url: 'https://api.tiles.mapbox.com/v3/mapbox.geography-class.json?secure',
            crossOrigin: 'anonymous'
          })
        })
      ],
      overlays: [overlay],
      target: 'map',
      loadTilesWhileAnimating: true,
      view: view
    });





    function onClick(id, callback) {
      document.getElementById(id).addEventListener('click', callback);
    }


    function flyTo(location, done) {

      const duration = 2000;
      const zoom = view.getZoom();
      let parts = 2;
      let called = false;

      function callback(complete) {
        --parts;
        if (called) {
          return;
        }
        if (parts === 0 || !complete) {
          called = true;
          content.innerHTML = `
<div class="container">
<div class="row">
<div class="col-6">
    <img class="rounded img-fluid" src="../../assets/Goustan_le_Cruel.jpg">
</div>
<div class="col-6">
     <h3>Goustan le Cruel</h3>
 <b><h6>Cor&#xE9;e du Nord</h6></b>
 <i><h6>Amadeus</h6></i>
    <p>Lorem ipsum</p>
</div>
        </div>
        </div>
    `;
          overlay.setPosition(location);
          done(complete);
        }
      }

      view.animate({
        center: location,
        duration: duration
      }, callback);
      view.animate({
        zoom: zoom - 1,
        duration: duration / 2
      }, {
        zoom: zoom,
        duration: duration / 2
      }, callback);
    }


    function tour() {
      const locations = [london, bern, rome, moscow, istanbul];
      let index = -1;

      function next(more) {
        if (more) {
          ++index;
          if (index < locations.length) {
            const delay = index === 0 ? 0 : 1000;
            setTimeout(function () {
              flyTo(locations[index], next);
            }, delay);
          } else {
            alert('Tour complete');
          }
        } else {
          alert('Tour cancelled');
        }
      }

      next(true);
    }

    onClick('tour', tour);
  }


}
