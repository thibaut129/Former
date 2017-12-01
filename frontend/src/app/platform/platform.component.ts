import { Component, OnInit } from '@angular/core';
import {DataService} from "../services/data.service";
import AboutUser from "../models/aboutUser.model";
@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.scss']
})
export class PlatformComponent implements OnInit {
  aboutUser: AboutUser;
  message:string;

  constructor(
    private data: DataService
  ) {
    this.aboutUser = new AboutUser();
  }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message)
    this.data.currentAboutUser.subscribe(message => this.aboutUser = message)
  }

}
