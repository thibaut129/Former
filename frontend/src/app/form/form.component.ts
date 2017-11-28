import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
import User from "../models/user.model";
import {UserService} from "../services/user.service";
import {ExperienceService} from "../services/experience.service";
import Experience from "../models/experience.model";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  id:number;
  newCompany: boolean;
  newUser: User;
  newExperience: Experience;
  // usersList: User[];
  // experiencesList: Experience[];

  constructor(
    private userService: UserService,
    private experienceService: ExperienceService
  ) {
    this.newCompany = false;
    this.newUser = new User();
    this.newExperience = new Experience();
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

  createExp() {
    this.newExperience.userID = "5a1d16bf31f1d50c5e82913d";

    // then create the experience
    this.experienceService.createExperience(this.newExperience)
      .subscribe((res) => {
        // this.experiencesList.push(res.data)
        this.newExperience = new Experience()
      })
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
            this.newExperience = new Experience()
          })

        this.newUser = new User()
      })


  }

}
