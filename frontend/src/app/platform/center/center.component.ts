import { Component, OnInit } from '@angular/core';

import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import {ExperienceService} from "../../services/experience.service";
import Experience from "../../models/experience.model";

@Component({
  selector: 'app-center',
  templateUrl: './center.component.html',
  styleUrls: ['./center.component.scss']
})
export class CenterComponent implements OnInit {
  dropDataContent:string
  experiencesList: Experience[];
  myStyle: any[]

  constructor(
    // private todoService: TodoService,
    private experienceService: ExperienceService
  ) {
    this.myStyle=[{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]}]
  }

  ngOnInit() {
    this.dropDataContent = "rien";

    this.experienceService.getExperiences()
      .subscribe(experiences => {
        this.experiencesList = experiences
        console.log(experiences)
      })
  }

}
