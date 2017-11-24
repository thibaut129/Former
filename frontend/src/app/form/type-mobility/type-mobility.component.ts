import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-type-mobility',
  templateUrl: './type-mobility.component.html',
  styleUrls: ['./type-mobility.component.scss']
})
export class TypeMobilityComponent implements OnInit {
  @Input() getNextPage: number;
  @Output() getNextPageChange = new EventEmitter<number>();

  constructor() { }


  setStatus(status:number){
    this.getNextPage=status;
    this.getNextPageChange.emit(status);
  }

  ngOnInit(): void {
  }
}
