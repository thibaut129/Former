import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-type-mobility',
  templateUrl: './type-mobility.component.html',
  styleUrls: ['./type-mobility.component.scss']
})
export class TypeMobilityComponent implements OnInit {
  @Input() nextPage: number;
  @Output() nextPageChange = new EventEmitter<number>();

  @Input() type: string;
  @Output() typeChange = new EventEmitter<string>();

  constructor() { }


  setStatus(type:string){
    // this.nextPage = this.nextPage + 1;
    this.nextPageChange.emit(this.nextPage+1);

    this.type=type;
    this.typeChange.emit(type);
  }

  ngOnInit(): void {
  }
}
