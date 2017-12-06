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
  private cartSource = new BehaviorSubject<User[]>([]);


  // currentMessage = this.messageSource.asObservable();
  currentAboutUser = this.aboutUserSource.asObservable();
  filteredExperiencesList = this.filteredExperiencesListSource.asObservable();
  cart = this.cartSource.asObservable();

  constructor() { }

  changeAboutUser(message: AboutUser) {
    this.aboutUserSource.next(message)
  }

  changefilteredExperiencesList(message: Experience[]) {
    this.filteredExperiencesListSource.next(message)
  }

  changeCart(message: User[]) {
    this.cartSource.next(message)
  }

}
