import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {CompanyService} from "../../services/company.service";
import Company from "../../models/company.model";
import {DataService} from "../../services/data.service";
import AboutUser from "../../models/aboutUser.model";

import {typeMobilityEnum} from "../../../environments/environment";
import {departmentEnum} from "../../../environments/environment";
import {typeResearchEnum} from "../../../environments/environment";
import Experience from "../../models/experience.model";
import {current} from "codelyzer/util/syntaxKind";

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss']
})
export class ModalContentComponent implements OnInit {
  idModal: number;

  message:string;
  aboutUser: AboutUser;

  keywordsList: string[];
  keywordsSelected: string[];

  counter= {};

  @Output() messageEvent = new EventEmitter<string>();
  @Output() aboutUserEvent = new EventEmitter<AboutUser>();

  filteredExperiencesList: any[];//Experience[];
  // filteredExperiencesListSI: Experience[];
  // filteredExperiencesListMAM: Experience[];
  // filteredExperiencesListElec: Experience[];

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
    this.counter= {};

    this.data.currentAboutUser.subscribe(message => this.aboutUser = message)

    this.data.filteredExperiencesList.subscribe(message => {
      this.filteredExperiencesList = message

      if (this.aboutUser.statut == "progress") {
        console.log("get typeMobile Length")
        this.getLengthOfTypeMobility();
      }
      if (this.aboutUser.statut == "typeMobility") {
        console.log("get typeDepartment Length")
        this.getLengthOfTypeDepartment();
      }
    })
    // this.data.filteredExperiencesListSI.subscribe(message => this.filteredExperiencesListSI = message)
    // this.data.filteredExperiencesListMAM.subscribe(message => this.filteredExperiencesListMAM = message)
    // this.data.filteredExperiencesListElec.subscribe(message => this.filteredExperiencesListElec = message)

    this.idModal = 0;

    this.keywordsList = ["childlike", "worried",
      "arch",
      "hellish",
      "ask",
      "dazzling",
      "tacky",
      "apparel",
      "quill",
      "wiggly",
      "food",
      "field",
      "delightful",
      "roasted",
      "class",
      "walk",
      "current",
      "pointless",
      "work"]

    this.keywordsSelected = []
  }

  ngOnInit(): void {

  }

  getLengthOfTypeMobility() {
    this.counter = {};

    for (let e of this.filteredExperiencesList) {
      if (this.counter[e.type] == null) {
        this.counter[e.type] = 1;
      } else {
        this.counter[e.type]++;
      }
    }
  }

  getLengthOfTypeDepartment() {
    this.counter = {};

    for (let e of this.filteredExperiencesList) {
      if (this.counter[e.user.department] == null) {
        this.counter[e.user.department] = 1;
      } else {
        this.counter[e.user.department]++;
      }
    }
  }

  nextModal() {
    this.idModal++;
  }

  previousPage(idModal) {
    this.idModal = idModal-1;

  }

  newMessage(aboutUserUpdated:AboutUser) {
    this.data.changeAboutUser(aboutUserUpdated);
  }

  setTypeMobility(typeMobility: string) {
    this.aboutUser.typeMobility = typeMobility;
    this.aboutUser.statut = "typeMobility";

    this.newMessage(this.aboutUser);
    this.nextModal();
  }

  setDepartment(department: string) {
    this.aboutUser.department = department;
    this.aboutUser.statut = "typeDepartment";

    this.newMessage(this.aboutUser);
    this.nextModal();
  }

  setTypeResearch(typeResearch: string) {
    this.aboutUser.typeResearch = typeResearch;

    this.newMessage(this.aboutUser);
    this.nextModal();
  }

  setStatut(statut: string) {
    this.aboutUser.statut = statut;
    this.newMessage(this.aboutUser);
  }

  addKeyword(keyword:string) {
    this.keywordsSelected.push(keyword);

    this.aboutUser.filters = this.keywordsSelected;
  }

  removeKeyword(keyword:string) {
    let index = this.keywordsSelected.indexOf(keyword, 0);
    if (index > -1) {
      this.keywordsSelected.splice(index, 1);
    }

    this.aboutUser.filters = this.keywordsSelected;
  }
}
