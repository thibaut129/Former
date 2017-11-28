import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import User from "../../models/user.model";
import Experience from "../../models/experience.model";
import Company from "../../models/company.model";

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  @Input() idPage: Number;
  @Input() newUser: User;
  @Input() newExperience: Experience;
  @Input() companySelected: Company;

  @Output() idPageChange = new EventEmitter<Number>();


  constructor() { }

  ngOnInit() {
  }

  setId(status:number){
    this.idPage=status;
    this.idPageChange.emit(status);
  }

}
