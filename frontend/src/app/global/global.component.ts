///<reference path="../models/experience.model.ts"/>
import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as ol from 'openlayers';

declare var parts: number;
import {ExperienceService} from "../services/experience.service";
import Experience from "../models/experience.model";
import User from "../models/user.model";
import {UserService} from "../services/user.service";
import {CompanyService} from "../services/company.service";
import Company from "../models/company.model";


@Component({
  selector: 'app-global',
  templateUrl: './global.component.html',
  styleUrls: ['./global.component.scss'],
})
export class GlobalComponent implements OnInit, AfterViewInit {


  london = ol.proj.fromLonLat([-0.12755, 51.507222]);
  moscow = ol.proj.fromLonLat([37.6178, 55.7517]);
  istanbul = ol.proj.fromLonLat([28.9744, 41.0128]);
  rome = ol.proj.fromLonLat([12.5, 41.9]);
  bern = ol.proj.fromLonLat([7.4458, 46.95]);

  /**
   * Elements that make up the popup.
   */
  @ViewChild('popup') container: ElementRef;
  @ViewChild('popupcontent') content: ElementRef;
  @ViewChild('popup-closer') closer: ElementRef;


  /**
   * Create an overlay to anchor the popup to the map.
   */
  overlay: ol.Overlay;

  view: ol.View = new ol.View({
    center: this.istanbul,
    zoom: 6
  });

  map: ol.Map;

  experiencesList: Experience[];
  companiesList: Company[];
  usersListDpt: User[];
  filteredExperiencesList: Experience[];
  filteredExperiencesListSI: Experience[];
  filteredExperiencesListMAM: Experience[];
  filteredExperiencesListElec: Experience[];
  center: { x: Number, y: Number }
  experienceSelected: Experience;
  info: string;
  stringToFilteredList = {
    SI: this.filteredExperiencesListSI,
    MAM: this.filteredExperiencesListMAM,
    ELEC: this.filteredExperiencesListElec,
  };

  cityTable: {city : any, exp:any} [];

  constructor(private experienceService: ExperienceService,
              private companyService: CompanyService,
              private userService: UserService) {
    this.experienceSelected = new Experience();
    this.center = {x: 5, y: 45}
    this.filteredExperiencesList = [];
    this.filteredExperiencesListSI = [];
    this.filteredExperiencesListMAM = [];
    this.filteredExperiencesListElec = [];
    this.info = "";

    this.stringToFilteredList = {
      SI: this.filteredExperiencesListSI,
      MAM: this.filteredExperiencesListMAM,
      ELEC: this.filteredExperiencesListElec,
    };

    this.cityTable = [];
  }


  ngOnInit(): void {

    this.companyService.getCompanies()
      .subscribe(companies => {
        this.companiesList = companies;

        this.experienceService.getExperiences()
          .subscribe(experiences => {
            this.experiencesList = experiences;

            this.parseFilter("SI", this.filteredExperiencesListSI, experiences, companies);
            this.parseFilter("MAM", this.filteredExperiencesListMAM, experiences, companies);
            this.parseFilter("ELEC", this.filteredExperiencesListElec, experiences, companies);

          })

      });

  }

  ngAfterViewInit(): void {

    this.overlay = new ol.Overlay({
      element: this.container.nativeElement,
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      } as olx.animation.PanOptions
    });



    this.map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          preload: 4,
          source: new ol.source.OSM()
        })
      ],
      overlays : [this.overlay],
      // Improve user experience by loading tiles while animating. Will make
      // animations stutter on mobile or slow devices.
      loadTilesWhileAnimating: true,
      view: this.view
    });
  }


  parseFilter(department: string, list: Experience[], experiences: Experience[], companies: Company[]) {
    this.userService.getUsersByDepartment(department)
      .subscribe(users => {
        console.log(users);
        for (let exp of experiences) {
          let expUser = exp;
          let boolToAdd = false;

          for (let user of users) {
            if (exp.userID == user._id) {
              expUser['dpt'] = user.department;
              expUser['user'] = user;

              boolToAdd = true;
              break;
            }
          }

          if (boolToAdd) {
            for (let comp of companies) {
              if (exp.companyID == comp._id) {
                expUser['company'] = comp;
                break;
              }
            }
          }

          if (boolToAdd) {
            list.push(expUser);
            this.filteredExperiencesList.push(expUser);
          }

        }
        // console.log(this.filteredExperiencesListElec)
        // console.log(this.filteredExperiencesListMAM)
        // console.log(this.filteredExperiencesListSI)
      })
  }


  flyTo(location, index) {

    let duration = 2000;
    let zoom = this.view.getZoom();
    let finish = 0;

    this.view.animate({
      center: location.city,
      duration: duration
    }, () => {
      finish++;
      if (finish === 2)
        this.next(true, ++index);
    });

    this.view.animate({
      zoom: zoom - 1,
      duration: duration / 2
    }, {
      zoom: zoom,
      duration: duration / 2
    }, () => {
      finish++;
      if (finish === 2)
        this.next(true, ++index);
    });


    this.content.nativeElement.innerHTML = '<p>'+location.exp+'</p><code>' + location.city.toString() +
      '</code>';
    this.overlay.setPosition(location.city);


  }

  next(more, index) {
    let locations = this.cityTable;
    if (index < locations.length) {
      let delay = index === 0 ? 0 : 750;
      setTimeout(() => {
        this.flyTo(locations[index], index);
      }, delay);
    }
    return true;
  }

  tour() {

    this.addMarkerList();


    for (let exp of this.filteredExperiencesListElec) {
      let city = ol.proj.fromLonLat([<number>exp.coords.longitude, <number>exp.coords.latitude]);
      console.log(exp);
      let expInformation = (<any>exp).company.name;
      console.log(expInformation);
      let cityExp= {city : city, exp:expInformation};
      this.cityTable.push(cityExp);
    }

    this.next(true, 0)
  }

  removeMarker() {
    let toDelete: ol.layer.Vector [];
    toDelete = [];
    for (let layer of this.map.getLayers().getArray()) {
      if (layer instanceof ol.layer.Vector) {
        toDelete.push(layer);
      }
    }

    for (let layer of toDelete) {
      this.map.removeLayer(layer);
    }
  }

  addMarkerList() {

    for (let exp of this.filteredExperiencesList) {

      this.addMarker(exp);
    }

  }

  addMarker(exp: Experience) {
    let longitude: number = <number>exp.coords.longitude;
    let latitude: number = <number>exp.coords.latitude;
    let iconFeature = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat([longitude, latitude])),
      name: 'Null Island',
      population: 4000,
      rainfall: 500
    });


    let iconStyle = new ol.style.Style({
      image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
        scale: 0.5,
        anchor: [0.5, 1],
        anchorOrigin: 'top-left',
        src: '../../assets/marker-'+(<any>exp).user.department.toLowerCase()+'.png'
      }))
    });

    iconFeature.setStyle(iconStyle);

    var vectorSource = new ol.source.Vector({
      features: [iconFeature]
    });

    var vectorLayer = new ol.layer.Vector({
      source: vectorSource
    });

    this.map.addLayer(vectorLayer);


  }

  popupCloser() {
    this.overlay.setPosition(undefined);
    this.closer.nativeElement.blur();
    return false;
  }
}
