import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import AboutUser from "../models/aboutUser.model";

@Injectable()
export class DataService {

  private messageSource = new BehaviorSubject<string>("default message");
  private aboutUserSource = new BehaviorSubject<AboutUser>(new AboutUser());


  currentMessage = this.messageSource.asObservable();
  currentAboutUser = this.aboutUserSource.asObservable();

  constructor() { }

  changeAboutUser(message: AboutUser) {
    // this.messageSource.next(message)
    this.aboutUserSource.next(message)
  }
}
