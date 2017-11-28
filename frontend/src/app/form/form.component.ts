import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
import User from "../models/user.model";
import Experience from "../models/experience.model";
import Company from "../models/company.model";

import {UserService} from "../services/user.service";
import {ExperienceService} from "../services/experience.service";
import {CompanyService} from "../services/company.service";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  id:number;
  newCompanyView: boolean;
  newUser: User;
  newExperience: Experience;
  newCompany: Company;
  // usersList: User[];
  // experiencesList: Experience[];

  constructor(
    private userService: UserService,
    private experienceService: ExperienceService,
    private companyService: CompanyService
  ) {
    this.newCompanyView = false;
    this.newUser = new User();
    this.newExperience = new Experience();
    this.newCompany = new Company();
  }


  // editUsers: User[] = [];

  ngOnInit(){
    this.id = 1;
  }

  previousPage(id) {
    this.id = id-1;

  }

  nextPage(id) {

    this.id = id+1;

  }


  create()  {
    // Create first the user
    this.userService.createUser(this.newUser)
      .subscribe((res) => {
        // this.usersList.push(res.data)

        // get UserId for the User created
        console.log(res.data._id);
        this.newExperience.userID = res.data._id;

        // then create the experience
        this.experienceService.createExperience(this.newExperience)
          .subscribe((res) => {
            // this.experiencesList.push(res.data)

            // update the company to add the ExperienceID

            this.newExperience = new Experience()
          })

        this.newUser = new User()
      })
  }


  // createCompany() {
  //   // then create the company
  //   this.companyService.createCompany(this.newCompany)
  //     .subscribe((res) => {
  //       // this.companiesList.push(res.data)
  //       this.newCompany = new Company()
  //     })
  // }

}
