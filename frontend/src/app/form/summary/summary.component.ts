import {Component, Input, OnInit} from '@angular/core';
import User from "../../models/user.model";
import Experience from "../../models/experience.model";
import Company from "../../models/company.model";

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  @Input() newUser: User;
  @Input() newExperience: Experience;
  @Input() companySelected: Company;

  constructor() { }

  ngOnInit() {
  }

}
