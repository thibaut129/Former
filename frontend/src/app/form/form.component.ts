import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import User from "../models/user.model";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  id:number;
  newCompany: boolean;
  newUser: User;
  usersList: User[];

  constructor(
    private userService: UserService
  ) {
    this.newCompany = false;
    this.newUser = new User();
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


  createUser() {
    this.userService.createUser(this.newUser)
      .subscribe((res) => {
        this.usersList.push(res.data)
        this.newUser = new User()
      })
  }

}
