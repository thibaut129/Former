import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {CompanyService} from "../../services/company.service";
import Company from "../../models/company.model";
import {DataService} from "../../services/data.service";
import AboutUser from "../../models/aboutUser.model";

import {typeMobilityEnum} from "../../../environments/environment";
import {departmentEnum} from "../../../environments/environment";
import {typeResearchEnum} from "../../../environments/environment";

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss']
})
export class ModalContentComponent implements OnInit {
  idModal: number;

  message:string;
  aboutUser: AboutUser;

  @Output() messageEvent = new EventEmitter<string>();
  @Output() aboutUserEvent = new EventEmitter<AboutUser>();


  // convert enum into iterable Array
  keysMobilityEnum() : Array<string> {
    var keys = Object.keys(typeMobilityEnum);
    return keys.slice(keys.length / 2);
  }

  keysDepartmentEnum() : Array<string> {
    var keys = Object.keys(departmentEnum);
    return keys.slice(keys.length / 2);
  }

  keysResearchEnum() : Array<string> {
    var keys = Object.keys(typeResearchEnum);
    return keys.slice(keys.length / 2);
  }

  constructor(
    public activeModal: NgbActiveModal,
    private data: DataService
) {
    this.idModal = 0;
    this.aboutUser = new AboutUser();
  }

  ngOnInit(): void {
    this.data.currentMessage.subscribe(message => this.message = message)
  }

  nextModal() {
    this.idModal++;
  }


  newMessage(aboutUserUpdated:AboutUser) {
    this.data.changeAboutUser(aboutUserUpdated);
  }

  setTypeMobility(typeMobility: string) {
    this.aboutUser.typeMobility = typeMobility;

    this.newMessage(this.aboutUser);
    this.nextModal();
  }

  setDepartment(department: string) {
    this.aboutUser.department = department;

    this.newMessage(this.aboutUser);
    this.nextModal();
  }

  setTypeResearch(typeResearch: string) {
    this.aboutUser.typeResearch = typeResearch;

    this.newMessage(this.aboutUser);
    this.nextModal();
  }

  addKeyword(keyword:string) {
    // if present : remove
    // else : add
  }
}
