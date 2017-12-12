import {Component, Input, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import User from "../../models/user.model";
import Experience from "../../models/experience.model";
import {trigger, state, style, animate, transition} from '@angular/animations';

@Component({
  selector: 'app-right',
  templateUrl: './right.component.html',
  styleUrls: ['./right.component.scss'],
  animations: [
    trigger('popOverState', [
      state('show', style({
        opacity: 1
      })),
      state('hide',   style({
        opacity: 0
      })),
      // transition('show => hide', animate('600ms ease-out')),
      transition('hide => show', animate('600ms ease-in'))
    ]),
    trigger('mailState', [
      state('empty', style({
        opacity: 1
      })),
      state('full',   style({
        opacity: 0
      })),
      transition('full => empty', animate('600ms ease-out')),
      transition('empty => full', animate('600ms ease-in'))
    ])
  ]
})
export class RightComponent implements OnInit {
  @Input() aboutUser: {};

  cart: Experience[];
  mapMode:boolean;
  filteredExperiencesList: Experience[];

  mockedDate: User;

  droppedData: string; // dragndrop
  dropOverActive: boolean = false; // dragndrop


  constructor(
    private data: DataService
  ) {
    this.cart = []
    this.mockedDate = new User();
  }

  ngOnInit() {
    this.data.cart.subscribe(message => this.cart = message)

    this.data.filteredExperiencesList.subscribe(message => this.filteredExperiencesList = message)
    this.data.mapMode.subscribe(message => this.mapMode = message)
  }

  changeModeMap(bool:boolean) {
    this.mapMode = !this.mapMode;

    this.data.changeMapMode(this.mapMode);
    this.data.changefilteredSelected(this.filteredExperiencesList);
  }

  get stateMapMode() {
    return this.mapMode ? 'hide' : 'show'
  }

  get stateUnMapMode() {
    return !this.mapMode ? 'hide' : 'show'
  }

  // dragndrop
  onDrop({ dropData }: { dropData: Experience }): void {

    // add the data in the cart if it's not added yet
    if (!this.cart.includes(dropData)) {
      this.cart.push(dropData);
    }
    console.log(this.cart)

    this.dropOverActive = false;
    this.droppedData = (<any>dropData).user.email;
    setTimeout(() => {
      this.droppedData = '';
    }, 2000);
  }
}
