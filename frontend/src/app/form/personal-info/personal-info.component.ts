import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import User from "../../models/user.model";

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {
  @Input() getNewUser: User;
  @Output() getNewUserChange = new EventEmitter<User>();

  constructor() { }

  public newUserChild: User = new User();


  setStatus(status:User){
    this.getNewUser=status;
    this.getNewUserChange.emit(status);
  }
  ngOnInit() {
  }

}
