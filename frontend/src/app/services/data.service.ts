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
  private filteredSelectedSource = new BehaviorSubject<Experience[]>([]);

  private cartSource = new BehaviorSubject<Experience[]>([]);

  private mapModeSource = new BehaviorSubject<boolean>(true);


  currentAboutUser = this.aboutUserSource.asObservable();

  filteredExperiencesList = this.filteredExperiencesListSource.asObservable();
  filteredSelected = this.filteredSelectedSource.asObservable();

  mapMode = this.mapModeSource.asObservable();

  cart = this.cartSource.asObservable();

  constructor() { }

  changeAboutUser(message: AboutUser) {
    this.aboutUserSource.next(message)
  }

  changefilteredExperiencesList(message: Experience[]) {
    this.filteredExperiencesListSource.next(message)
  }

  changefilteredSelected(message: Experience[]) {
    this.filteredSelectedSource.next(message)
  }

  changeCart(message: Experience[]) {
    this.cartSource.next(message)
  }

  changeMapMode(message: boolean) {
    this.mapModeSource.next(message)
  }

}
