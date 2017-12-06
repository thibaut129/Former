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
import {CompanyService} from "../services/company.service";
import Company from "../models/company.model";

@Component({
  selector: 'app-global',
  templateUrl: './global.component.html',
  styleUrls: ['./global.component.scss'],
  animations: [
    trigger('popOverState', [
      state('show', style({
        opacity: 1
      })),
      state('hide',   style({
        opacity: 0
      })),
      state('display', style({
        display: 'inherit'
      })),
      state('undisplay',   style({
        display: 'none'
      })),
      transition('show => hide', animate('600ms ease-out')),
      transition('hide => show', animate('1000ms ease-in'))
    ])
    ]
})
export class GlobalComponent implements OnInit {
  // usersList: User[];
  experiencesList: Experience[];
  companiesList: Company[];
  usersListDpt: User[];
  filteredExperiencesList: Experience[];
  filteredExperiencesListSI: Experience[];
  filteredExperiencesListMAM: Experience[];
  filteredExperiencesListElec: Experience[];

  center: {x:Number, y:Number}
  url = "https://openlayers.org/en/v4.5.0/examples/data/geojson/countries.geojson";
  @ViewChild ('myView') myView;
  info: string;
  experienceSelected: Experience;
  // locationsList: any[];
  show = false;
  display = true;

  index = 0;
  tableDepartment = ['SI', 'MAM', 'ELEC'];

  stringToFilteredList = {
    SI: this.filteredExperiencesListSI,
    MAM: this.filteredExperiencesListMAM,
    ELEC: this.filteredExperiencesListElec,
  }

  get stateDisplay() {
    return this.display ? 'display' : 'undisplay'
  }

  get stateName() {
    return this.show ? 'show' : 'hide'
  }

incrementeIndex() {
  this.index = (++this.index)%this.tableDepartment.length;
}

  toggle() {
    this.show = !this.show;
    // console.log(this.filteredExperiencesListElec)
    // console.log(this.filteredExperiencesListMAM)
    // console.log(this.filteredExperiencesListSI)
  }

  toggleDisplay() {
    this.display = !this.display;
  }

  constructor(
    private experienceService: ExperienceService,
    private companyService: CompanyService,
    private userService: UserService
  ) {
    this.experienceSelected = new Experience();
    this.center= {x:5, y:45}
    this.filteredExperiencesList = [];
    this.filteredExperiencesListSI = [];
    this.filteredExperiencesListMAM = [];
    this.filteredExperiencesListElec = [];
    this.info="";

    this.stringToFilteredList = {
      SI: this.filteredExperiencesListSI,
      MAM: this.filteredExperiencesListMAM,
      ELEC: this.filteredExperiencesListElec,
    }

  }

  ngOnInit() {

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

    setTimeout(() =>
        this.takeTour(0),
      5000);


    // this.userService.getUsers()
    //   .subscribe(users => {
    //     this.usersList = users
    //     console.log(users)
    //   })
    //
    //
    // this.experienceService.getExperiences()
    //   .subscribe(experiences => {
    //     this.experiencesList = experiences;
    //   });

  }

  parseFilter(department:string, list:Experience[], experiences:Experience[], companies:Company[]) {
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

          if(boolToAdd) {
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
  public zoom = 3;

  takeTour(index: number) {
    this.toggle();

    const delay = 2000;//index === 0 ? 0 : 1000;

    // if (index < this.experiencesList.length) {
    //   this.experienceSelected = this.experiencesList[index];
    //   this.center={x:this.experiencesList[index].coords.longitude , y:this.experiencesList[index].coords.latitude}
    //   setTimeout(() =>
    //     this.takeTour(index+1),
    //     delay);
    let list = this.stringToFilteredList[this.tableDepartment[this.index]];//this.filteredExperiencesList;
    if (index < list.length) {
      this.experienceSelected = list[index];
      console.log(this.experienceSelected);
      this.center={x:list[index].coords.longitude , y:list[index].coords.latitude}

      setTimeout(() =>
          this.nextTour(index+1),
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
      this.experienceSelected = new Experience();

      /** infinite loop **/
      this.incrementeIndex();
      this.show = false;
      this.takeTour(0);
    }
  }

  nextTour(index:number) {
    this.toggle();
    setTimeout(() =>
        this.takeTour(index),
      600);
  }

  colorStroke = 'rgba(255,0,0,0.1)';
  colorFill = '#f00';
  widthStroke = 1;

  highlightCountry(event) {

    this.colorStroke='#f00';
    this.widthStroke=1;
    this.colorStroke = 'rgba(255,0,0,0.1)';

    // let highlightStyle = new ol.style.Style({
    //   stroke: new ol.style.Stroke({
    //     color: '#f00',
    //     width: 1
    //   }),
    //   fill: new ol.style.Fill({
    //     color: 'rgba(255,0,0,0.1)'
    //   }),
    //   text: new ol.style.Text({
    //     font: '12px Calibri,sans-serif',
    //     fill: new ol.style.Fill({
    //       color: '#000'
    //     }),
    //     stroke: new ol.style.Stroke({
    //       color: '#f00',
    //       width: 3
    //     })
    //   })
    // });

    // let featureOverlay = new ol.layer.Vector({
    //   source: new ol.source.Vector(),
    //   map: event.map,
    //   style: function(feature) {
    //     highlightStyle.getText().setText(feature.get('name'));
    //     return highlightStyle;
    //   }
    // });

    // event.map.addOverlay(featureOverlay);

    // let style = new ol.style.Style({
    //   fill: new ol.style.Fill({
    //     color: 'rgba(200, 200, 200, 0.6)'
    //   }),
    //   stroke: new ol.style.Stroke({
    //     color: '#A4A4A4',
    //     width: 2
    //   })
    // });

    let pixel = event.pixel;

    let feature = event.map.forEachFeatureAtPixel(pixel, function(feature) {
      // console.log(feature.getGeometry());
      // console.log(feature.getGeometry());
      return feature;
    });

    console.log(feature.getProperties());

    if (feature) {
      this.info = feature.getId() + ': ' + feature.get('name');
    } else {
      this.info = '&nbsp;';
    }
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
  //   for (let user of this.usersList) {
  //     if (id == user._id) {
  //       this.userGet = user;
  //       console.log(user);
  //     }
  //   }
  // }


  // getExpById(id:string) {
  //   for (let exp of this.experiencesList) {
  //     if (id == exp._id) {
  //       this.expGet = exp;
  //
  //       console.log(exp);
  //
  //       return exp;
  //     }
  //   }
  // }
}
