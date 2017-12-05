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
    private companyService: CompanyService,
    private userService: UserService
  ) {
    this.experienceSelected = new Experience();
    this.center= {x:5, y:45}
    this.filteredExperiencesList = [];
    this.filteredExperiencesListSI = [];
    this.filteredExperiencesListMAM = [];
    this.filteredExperiencesListElec = [];
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

              });

          });


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
        for (let exp of experiences) {
          let expUser = exp;

          for (let user of users) {
            if (exp.userID == user._id) {
              expUser['dpt'] = user.department;
              expUser['user'] = user;
              break;
            }
          }

          for (let comp of companies) {
            if (exp.companyID == comp._id) {
              expUser['company'] = comp;
              break;
            }
          }

          list.push(expUser);
          this.filteredExperiencesList.push(expUser);

        }
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
    let list = this.filteredExperiencesList;
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
    }
  }

  nextTour(index:number) {
    this.toggle();
    setTimeout(() =>
        this.takeTour(index),
      600);
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
