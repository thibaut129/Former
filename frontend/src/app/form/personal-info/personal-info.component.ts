import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import User from "../../models/user.model";
import {DepartmentEnumService} from "../../services/departmentEnum.service";
import {DepartmentEnum} from "../../models/departmentEnum.model";

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {
  @Input() getNewUser: User;
  @Output() getNewUserChange = new EventEmitter<User>();

  departmentsEnumList: DepartmentEnum[];

  constructor(
    private departmentEnumService: DepartmentEnumService
  ) { }

  public newUserChild: User = new User();


  setStatus(status:User){
    this.getNewUser=status;
    this.getNewUserChange.emit(status);
  }
  ngOnInit() {
    this.departmentEnumService.getDepartmentsEnum()
      .subscribe(departmentsEnum => {
        this.departmentsEnumList = departmentsEnum
        console.log(departmentsEnum)
      })
  }

  inlineList="";
  listInlineSettings: any = {
    display: 'inline',
    layout: 'liquid',
    showInput: true,
    placeholder: 'Please Select ...'
  }

}
