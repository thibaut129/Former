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
  legalAccepted:boolean;
  newCompanyView: boolean;
  newUser: User;
  newExperience: Experience;
  companySelected: Company;
  // newCompany: Company;
  // usersList: User[];
  // experiencesList: Experience[];
  constructor(
    private userService: UserService,
    private experienceService: ExperienceService,
    private companyService: CompanyService
  ) {
    this.legalAccepted = false;
    this.newCompanyView = false;
    this.newUser = new User();
    this.newExperience = new Experience();
    this.companySelected = new Company();
    // this.newCompany = new Company();
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
          .subscribe((res2) => {
            // this.companiesList.push(res.data)

            console.log(res2.data._id);
            this.companySelected.experiencesID.push(res2.data._id);

            this.companyService.editCompany(this.companySelected)
              .subscribe((res3) => {

            })
          })

        this.newUser = new User()
      })
  }


  // companiesList: Company[];
  // editCompanies: Company[] = [];
  //
  // editCompany(experience: Company) {
  //   console.log(experience)
  //   if(this.companiesList.includes(experience)){
  //     if(!this.editCompanies.includes(experience)){
  //       this.editCompanies.push(experience)
  //     }else{
  //       this.editCompanies.splice(this.editCompanies.indexOf(experience), 1)
  //       this.companyService.editCompany(experience).subscribe(res => {
  //         console.log('Update Succesful')
  //       }, err => {
  //         this.editCompany(experience)
  //         console.error('Update Unsuccesful')
  //       })
  //     }
  //   }
  // }
  //
  // doneCompany(experience:Company){
  //   // experience.status = 'Done'
  //   this.experienceService.editCompany(experience).subscribe(res => {
  //     console.log('Update Succesful')
  //   }, err => {
  //     this.editCompany(experience)
  //     console.error('Update Unsuccesful')
  //   })
  // }
  //
  // submitCompany(event, experience:Company){
  //   if(event.keyCode ==13){
  //     this.editCompany(experience)
  //   }
  // }

  // createCompany() {
  //   // then create the company
  //   this.companyService.createCompany(this.newCompany)
  //     .subscribe((res) => {
  //       // this.companiesList.push(res.data)
  //       this.newCompany = new Company()
  //     })
  // }

}
