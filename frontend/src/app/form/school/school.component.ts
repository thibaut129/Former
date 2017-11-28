import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.scss']
})
export class SchoolComponent implements OnInit {
  @Input() nextPage: number;
  @Output() nextPageChange = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  nextId() {
    this.nextPageChange.emit(this.nextPage+1);

  }
}
