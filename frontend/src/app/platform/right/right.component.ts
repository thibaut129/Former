import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-right',
  templateUrl: './right.component.html',
  styleUrls: ['./right.component.scss']
})
export class RightComponent implements OnInit {
  droppedData: string; // dragndrop
  dropOverActive: boolean = false; // dragndrop

  // dragndrop
  onDrop({ dropData }: { dropData: any }): void {
    this.dropOverActive = false;
    this.droppedData = dropData;
    setTimeout(() => {
      this.droppedData = '';
    }, 2000);
  }

  constructor() { }

  ngOnInit() {
  }

}
