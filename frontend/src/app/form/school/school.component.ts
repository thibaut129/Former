import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import Company from "../../models/company.model";

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.scss']
})
export class SchoolComponent implements OnInit {
  @Input() nextPage: number;
  @Output() nextPageChange = new EventEmitter<number>();

  @Input() companySelected: Company;
  @Output() companySelectedChange = new EventEmitter<Company>();

  constructor() { }

  ngOnInit() {
  }

  nextId() {
    this.nextPageChange.emit(this.nextPage+1);

  }
}
