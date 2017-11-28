import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-right',
  templateUrl: './right.component.html',
  styleUrls: ['./right.component.scss']
})
export class RightComponent implements OnInit {
  cart: string[];
  name: string;

  droppedData: string; // dragndrop
  dropOverActive: boolean = false; // dragndrop


  constructor() {
    this.cart = []
  }

  ngOnInit() {
  }

  openModal() {
    //todo
  }

  // dragndrop
  onDrop({ dropData }: { dropData: any }): void {

    // add the data in the cart if it's not added yet
    if (!this.cart.includes(dropData)) {
      this.cart.push(dropData);
      this.name = dropData;
    }
    console.log(this.cart)

    this.dropOverActive = false;
    this.droppedData = dropData;
    setTimeout(() => {
      this.droppedData = '';
    }, 2000);
  }
}
