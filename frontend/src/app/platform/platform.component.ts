import { Component, OnInit } from '@angular/core';
import {DataService} from "../services/data.service";
import AboutUser from "../models/aboutUser.model";
import {UserService} from "../services/user.service";
import {CompanyService} from "../services/company.service";
import {ExperienceService} from "../services/experience.service";
import {MailService} from "../services/mail.service";
import Company from "../models/company.model";
import Experience from "../models/experience.model";
import { Observable } from 'rxjs/Rx';

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
  parsedExperiencesList: Experience[];

  constructor(
    private data: DataService,
    private experienceService: ExperienceService,
    private companyService: CompanyService,
    private userService: UserService
  ) {
    this.aboutUser = new AboutUser();

    this.parsedExperiencesList = [];
  }

  ngOnInit() {

    // this.data.currentMessage.subscribe(message => this.message = message)
    // this.data.filteredExperiencesList.subscribe(message => this.filteredExperiencesList = message)

    this.companyService.getCompanies()
      .subscribe(companies => {
        this.companiesList = companies;

        this.experienceService.getExperiences()
          .subscribe(experiences => {
            this.experiencesList = experiences;

            this.parseFilter(this.parsedExperiencesList, experiences, companies);

          })

      });


    this.data.currentAboutUser.subscribe(message => {
      this.aboutUser = message;

      // synchronous functions

      let filteredExperienceList = this.parsedExperiencesList;
      // if user filled the modal
      if (message.statut === "typeMobility") {
        filteredExperienceList = this.doFilterTypeMobility(filteredExperienceList, message.typeMobility);
      }
      if (message.statut === "typeDepartment") {
        filteredExperienceList = this.doFilterTypeMobility(filteredExperienceList, message.typeMobility);
        filteredExperienceList = this.doFilterDepartment(filteredExperienceList, message.department);
      }

      if (message.statut === "done") {
        // "Emploi" or "Echange
        filteredExperienceList = this.doFilterTypeMobility(filteredExperienceList, message.typeMobility);
        // "SI", "MAM", "ELEC", ...
        filteredExperienceList = this.doFilterDepartment(filteredExperienceList, message.department);
        // "2017" or all
        if (message.currentYear) {
          filteredExperienceList = this.doFilterCurrentYear(filteredExperienceList);
        }
      }
      console.log(message.companies);
      if (message.companies.length !=0) {
        filteredExperienceList = this.doFilterCompany(filteredExperienceList, message.companies);
      }

      if (message.filters.length !=0) {
        console.log("doFilterTag");
        filteredExperienceList = this.doFilterTag(filteredExperienceList, message.filters);
      }

      // update filteredExp
      this.data.changefilteredExperiencesList(filteredExperienceList);
    })


  }

  parseFilter(list:Experience[], experiences:Experience[], companies:Company[]) {
    // this.userService.getUsersByDepartment(department)
    this.userService.getUsers()
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
            // this.filteredExperiencesList.push(expUser);
          }
        }

        this.data.changefilteredExperiencesList(list);
      })
  }

  /**
   * Take the current listFilter and remove all Experiences "Echange" or "Emploi" depending on the typeResearch
   * @param {Experience[]} list
   * @param {string} typeResearch can be either "Echange" or "Emploi"
   * @returns {Array}
   */
  doFilterTypeMobility(list:Experience[], typeMobility:string): Experience[] {
    let newList = [];
    if ("Echange" === typeMobility) {
      for (let exp of list) {
        if (exp.type === typeMobility) {
          newList.push(exp);
        }
      }
    } else {
      for (let exp of list) {
        if (exp.type != "Echange") {
          newList.push(exp);
        }
      }
    }
    return newList;
  }

  doFilterCurrentYear(list:Experience[]): Experience[] {
    let newList = [];
    for (let exp of list) {
      if (exp.year === new Date().getFullYear()) {
        newList.push(exp);
      }
    }
    return newList;
  }

  doFilterDepartment(list:any[], department:string): Experience[] {
    let newList = [];
    for (let exp of list) {
      if (exp.user.department === department) {
        newList.push(exp);
      }
    }
    return newList;
  }

  doFilterCompany(list:any[], companies:string[]): Experience[] {
    let newList = [];
    for (let exp of list) {
      for (let comp of companies) {
        if (exp.company.name === comp) {
          newList.push(exp);
          break;
        }
      }
    }
    return newList;
  }

  doFilterTag(list:any[], tags:string[]): Experience[] {
    let newList = [];
    for (let exp of list) {
      console.log(exp.filters);
      for (let t of tags) {
        console.log(t);
        if ((exp.filters != null) && (exp.filters.includes(t))) {
          newList.push(exp);
          break;
        }
      }
    }
    return newList;
  }

  /**
   * DataService broadcast to Component which subscribed to the var
   * @param {Experience[]} filteredExperiencesList
   */
  newFilteredExperiencesList(filteredExperiencesList:Experience[]) {
    console.log('new');
    this.data.changefilteredExperiencesList(filteredExperiencesList);
  }

}
