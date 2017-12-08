import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import AboutUser from "../models/aboutUser.model";
import Experience from "../models/experience.model";
import User from "../models/user.model";

@Injectable()
export class DataService {

  // private messageSource = new BehaviorSubject<string>("default message");

  private aboutUserSource = new BehaviorSubject<AboutUser>(new AboutUser());
  private filteredExperiencesListSource = new BehaviorSubject<Experience[]>([]);
  private filteredExperiencesListSISource = new BehaviorSubject<Experience[]>([]);
  private filteredExperiencesListMAMSource = new BehaviorSubject<Experience[]>([]);
  private filteredExperiencesListElecSource = new BehaviorSubject<Experience[]>([]);
  private cartSource = new BehaviorSubject<Experience[]>([]);


  // currentMessage = this.messageSource.asObservable();
  currentAboutUser = this.aboutUserSource.asObservable();
  filteredExperiencesList = this.filteredExperiencesListSource.asObservable();
  filteredExperiencesListSI = this.filteredExperiencesListSISource.asObservable();
  filteredExperiencesListMAM = this.filteredExperiencesListMAMSource.asObservable();
  filteredExperiencesListElec = this.filteredExperiencesListElecSource.asObservable();
  cart = this.cartSource.asObservable();

  constructor() { }

  changeAboutUser(message: AboutUser) {
    this.aboutUserSource.next(message)
  }

  changefilteredExperiencesList(message: Experience[]) {
    this.filteredExperiencesListSource.next(message)
  }

  changefilteredExperiencesListSI(message: Experience[]) {
    this.filteredExperiencesListSISource.next(message)
  }

  changefilteredExperiencesListMAM(message: Experience[]) {
    this.filteredExperiencesListMAMSource.next(message)
  }

  changefilteredExperiencesListElec(message: Experience[]) {
    this.filteredExperiencesListElecSource.next(message)
  }

  // changefilteredExperiencesListBat(message: Experience[]) {
  //   this.filteredExperiencesListBatSource.next(message)
  // }
  //
  // changefilteredExperiencesListGB(message: Experience[]) {
  //   this.filteredExperiencesListGBSource.next(message)
  // }
  //
  // changefilteredExperiencesListGE(message: Experience[]) {
  //   this.filteredExperiencesListGESource.next(message)
  // }
  //
  // changefilteredExperiencesListITII(message: Experience[]) {
  //   this.filteredExperiencesListITIISource.next(message)
  // }


  changeCart(message: Experience[]) {
    this.cartSource.next(message)
  }

}
