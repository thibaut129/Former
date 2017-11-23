import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {
  droppedData: string;
  dropOverActive: boolean = false;


  onDrop({ dropData }: { dropData: any }): void {
    this.dropOverActive = false;
    this.droppedData = dropData;
    setTimeout(() => {
      this.droppedData = '';
    }, 2000);
  }

  dragEnd(event) {
    console.log('Element was dragged', event);
  }

  constructor() { }

  ngOnInit() {
  }

}
