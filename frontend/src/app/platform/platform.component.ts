import { Component, OnInit } from '@angular/core';
import {DataService} from "../services/data.service";
import AboutUser from "../models/aboutUser.model";
import {UserService} from "../services/user.service";
import {CompanyService} from "../services/company.service";
import {ExperienceService} from "../services/experience.service";
import {MailService} from "../services/mail.service";
import Company from "../models/company.model";
import Experience from "../models/experience.model";
@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.scss']
})
export class PlatformComponent implements OnInit {
  aboutUser: AboutUser;
  message:string;

  companiesList: Company[];
  experiencesList: Experience[];
  filteredExperiencesList: Experience[];
  filteredExperiencesListSI: Experience[];
  filteredExperiencesListMAM: Experience[];
  filteredExperiencesListElec: Experience[];

  constructor(
    private data: DataService,
    private experienceService: ExperienceService,
    private companyService: CompanyService,
    private userService: UserService
  ) {
    this.aboutUser = new AboutUser();

    this.filteredExperiencesList = [];
    this.filteredExperiencesListSI = [];
    this.filteredExperiencesListMAM = [];
    this.filteredExperiencesListElec = [];
  }

  ngOnInit() {

    // this.data.currentMessage.subscribe(message => this.message = message)
    this.data.currentAboutUser.subscribe(message => this.aboutUser = message)
    this.data.filteredExperiencesList.subscribe(message => this.filteredExperiencesList = message)

    this.companyService.getCompanies()
      .subscribe(companies => {
        this.companiesList = companies;

        this.experienceService.getExperiences()
          .subscribe(experiences => {
            this.experiencesList = experiences;

            this.parseFilter("SI", this.filteredExperiencesListSI, experiences, companies);
            this.parseFilter("MAM", this.filteredExperiencesListMAM, experiences, companies);
            this.parseFilter("ELEC", this.filteredExperiencesListElec, experiences, companies);

          })

      });

  }

  parseFilter(department:string, list:Experience[], experiences:Experience[], companies:Company[]) {
    this.userService.getUsersByDepartment(department)
      .subscribe(users => {
        console.log(users);
        for (let exp of experiences) {
          let expUser = exp;
          let boolToAdd = false;

          for (let user of users) {
            if (exp.userID == user._id) {
              expUser['dpt'] = user.department;
              expUser['user'] = user;

              boolToAdd = true;
              break;
            }
          }

          if(boolToAdd) {
            for (let comp of companies) {
              if (exp.companyID == comp._id) {
                expUser['company'] = comp;
                break;
              }
            }
          }

          if (boolToAdd) {
            list.push(expUser);
            this.filteredExperiencesList.push(expUser);
          }

        }

        this.data.changefilteredExperiencesList(this.filteredExperiencesList);
        this.data.changefilteredExperiencesListSI(this.filteredExperiencesListSI);
        this.data.changefilteredExperiencesListMAM(this.filteredExperiencesListMAM);
        this.data.changefilteredExperiencesListElec(this.filteredExperiencesListElec);

        // console.log(this.filteredExperiencesListElec)
        // console.log(this.filteredExperiencesListMAM)
        // console.log(this.filteredExperiencesListSI)
      })
  }

  newFilteredExperiencesList(filteredExperiencesList:Experience[]) {
    console.log('new');
    this.data.changefilteredExperiencesList(filteredExperiencesList);
  }

}
