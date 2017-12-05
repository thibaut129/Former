///<reference path="../models/experience.model.ts"/>
import {Component, OnInit, ViewChild} from '@angular/core';
import * as ol from 'openlayers';
import {ExperienceService} from "../services/experience.service";
import Experience from "../models/experience.model";

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import User from "../models/user.model";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-global',
  templateUrl: './global.component.html',
  styleUrls: ['./global.component.scss'],
  animations: [
    // trigger('popOverState', [
    //   state('show', style({
    //     opacity: 1
    //   })),
    //   state('hide',   style({
    //     opacity: 0
    //   })),
    //   transition('show => hide', animate('600ms ease-out')),
    //   transition('hide => show', animate('1000ms ease-in'))
    // ])
    trigger('popOverState', [
      state('show', style({
        opacity: 1
      })),
      state('hide',   style({
        opacity: 0
      })),
      transition('show => hide', animate('600ms ease-out')),
      transition('hide => show', animate('1000ms ease-in'))
    ])
    ]
})
export class GlobalComponent implements OnInit {
  usersList: User[];
  experiencesList: Experience[];
  center: {x:Number, y:Number}
  url = "https://openlayers.org/en/v4.5.0/examples/data/geojson/countries.geojson";
  @ViewChild ('myView') myView;
  experienceSelected: Experience;
  // locationsList: any[];
  show = false;

  get stateName() {
    return this.show ? 'show' : 'hide'
  }
  toggle() {
    this.show = !this.show;
  }

  constructor(
    private experienceService: ExperienceService,
    private userService: UserService
  ) {
    this.experienceSelected = new Experience();
    this.center= {x:5, y:45}
  }


  ngOnInit() {
    this.userService.getUsers()
      .subscribe(users => {
        this.usersList = users
        console.log(users)
      })
    // this.experienceService.getExperiences()
    //   .subscribe(experiences => {
    //     let locationsList = [];
    //
    //     this.experiencesList = experiences;
    //
    //     for (let e of experiences) {
    //       let loc = new ol.Feature({
    //         geometry: new ol.geom.Point(ol.proj.fromLonLat([Number(e.coords.longitude), Number(e.coords.latitude)]))
    //       });
    //
    //       console.log(Number(e.coords.latitude));
    //
    //       loc.setStyle(new ol.style.Style({
    //         image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
    //           color: '#8959A8',
    //           crossOrigin: 'anonymous',
    //           src: 'https://openlayers.org/en/v4.5.0/examples/data/dot.png'
    //         }))
    //       }));
    //
    //       locationsList.push(loc);
    //
    //     }
    //   });


    this.experienceService.getExperiences()
      .subscribe(experiences => {
        let locationsList = [];

        this.experiencesList = experiences;

        for (let e of experiences) {
          let loc = new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.fromLonLat([Number(e.coords.longitude), Number(e.coords.latitude)]))
          });

          console.log(Number(e.coords.latitude));

        loc.setStyle(new ol.style.Style({
            image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
              color: '#8959A8',
              crossOrigin: 'anonymous',
              src: 'https://openlayers.org/en/v4.5.0/examples/data/dot.png'
            }))
          }));

          locationsList.push(loc);

        }

        console.log(locationsList)


        const container = document.getElementById('popup');
        const content = document.getElementById('popup-content');
        // const closer = document.getElementById('popup-closer');

        // const london = new ol.Feature({
        //   geometry: new ol.geom.Point(ol.proj.fromLonLat([-0.12755, 51.507222]))
        // });
        // london.setStyle(new ol.style.Style({
        //   image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
        //     color: '#8959A8',
        //     crossOrigin: 'anonymous',
        //     src: 'https://openlayers.org/en/v4.5.0/examples/data/dot.png'
        //   }))
        // }));
        //
        //
        // const moscow = new ol.Feature({
        //   geometry: new ol.geom.Point(ol.proj.fromLonLat([37.6178, 55.7517]))
        // });
        //
        //
        // moscow.setStyle(new ol.style.Style({
        //   image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
        //     color: '#8959A8',
        //     crossOrigin: 'anonymous',
        //     src: 'https://openlayers.org/en/v4.5.0/examples/data/dot.png',
        //     scale : 2
        //   }))
        // }));
        //
        // const svg = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="30px" height="30px" viewBox="0 0 30 30" enable-background="new 0 0 30 30" xml:space="preserve">' +
        //   '<path fill="#156BB1" d="M22.906,10.438c0,4.367-6.281,14.312-7.906,17.031c-1.719-2.75-7.906-12.665-7.906-17.031S10.634,2.531,15,2.531S22.906,6.071,22.906,10.438z"/>' +
        //   '<circle r="4.81146" cy="10.17018" cx="15" fill="#FFFFFF"/>' +
        //   '<text stroke="#000000" transform="matrix(0.3552123327002192,0,0,0.3552123327002192,2.6489298433685144,-12.463694918305748) " xml:space="preserve" text-anchor="middle" font-family="serif" font-size="24" id="svg_3" y="71.07833" x="34.87671" stroke-width="0" fill="#000000">3</text>' +
        //   '</svg>';
        //
        // const mysvg = new Image();
        // mysvg.src = 'data:image/svg+xml,' + svg;
        //
        //
        // const style = new ol.style.Style({
        //   image: new ol.style.Icon({
        //     img: mysvg,
        //     imgSize: [30, 30],
        //     scale : 2
        //   })
        // });
        //
        // moscow.setStyle(style);

        // const istanbul = ol.proj.fromLonLat([28.9744, 41.0128]);
        // const rome = ol.proj.fromLonLat([12.5, 41.9]);
        // const bern = ol.proj.fromLonLat([7.4458, 46.95]);


        const vectorSource = new ol.source.Vector({
          // features: [london, moscow]
          features: locationsList
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
        }));


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


        // function onClick(id, callback) {
        //   document.getElementById(id).addEventListener('click', callback);
        // }


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
                <img  class="rounded img-fluid" src="../../assets/former-logo.jpg" />
              </div>
              <div class="col-6">
                <h3>Amadeus</h3>
                <b><h6>Nice</h6></b>
                <i><h6>John Doe</h6></i>
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


        // function tour() {
        //   const locations = locationsList;//[london, moscow];
        //   let index = -1;
        //
        //   function next(more) {
        //     if (more) {
        //       ++index;
        //       if (index < locations.length) {
        //         const delay = index === 0 ? 0 : 1000;
        //         setTimeout(function () {
        //           flyTo(getCoordonateGeometry(locations[index]), next);
        //         }, delay);
        //       } else {
        //         // alert('Tour complete');
        //         console.log('Tour complete');
        //       }
        //     } else {
        //       // alert('Tour cancelled');
        //       console.log('Tour cancelled');
        //     }
        //   }
        //
        //   next(true);
        // }
        //
        // function getCoordonateGeometry(city) {
        //   const p: ol.geom.Point = <ol.geom.Point>city.getGeometry();
        //   const c: ol.Coordinate = p.getCoordinates();
        //   return c ;
        // }

        // onClick('tour', tour);
      });

  }


  public zoom = 3;

  takeTour(index: number) {
    const delay = 1000;//index === 0 ? 0 : 1000;

    if (index < this.experiencesList.length) {
      this.experienceSelected = this.experiencesList[index];
      this.center={x:this.experiencesList[index].coords.longitude , y:this.experiencesList[index].coords.latitude}
      setTimeout(() =>
        this.takeTour(index+1),
        delay);



      /// ????????

      // this.myView.nativeElement.animate({
      //     center: this.center,
      //     duration: 1000
      //   });
      // view.animate({
      //   center: location,
      //   duration: duration
      // });
      // view.animate({
      //   zoom: zoom - 1,
      //   duration: duration / 2
      // }, {
      //   zoom: zoom,
      //   duration: duration / 2
      // });

    } else {
      console.log("end of tour");
    }
  }

  highlightCountry(event) {
    let pixel = event.pixel;
    let highlight;
    // console.log(event.map.animate());

    // this.displayFeatureInfo(pixel);
    // let feature = event.getFeaturesAtPixel(pixel);
    //
    // if (feature !== highlight) {
    //   if (highlight) {
    //     featureOverlay.getSource().removeFeature(highlight);
    //   }
    //   if (feature) {
    //     featureOverlay.getSource().addFeature(feature);
    //   }
    //   highlight = feature;
    // }
  }

  // getUserById(id:string) {
  //   this.userService.getUserById(id)
  //     .subscribe(user => {
  //       return user;
  //     })
  // }
}
