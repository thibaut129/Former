import {Component, Input, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import User from "../../models/user.model";
import Experience from "../../models/experience.model";

@Component({
  selector: 'app-right',
  templateUrl: './right.component.html',
  styleUrls: ['./right.component.scss']
})
export class RightComponent implements OnInit {
  @Input() aboutUser: {};

  cart: Experience[];

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
  }

  openModal() {
    //todo
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
