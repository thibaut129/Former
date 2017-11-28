import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CompanyService} from "../../services/company.service";
import Company from "../../models/company.model";

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  @Input() getNewCompanyView: boolean;
  @Output() getNewCompanyViewChange = new EventEmitter<boolean>();

  companiesList: Company[];

  constructor(
    private companyService: CompanyService
  ) { }


  setStatus(status:boolean){
    this.getNewCompanyView=status;
    this.getNewCompanyViewChange.emit(status);
  }


  ngOnInit(): void {
    // this.todoService.getToDos()
    //   .subscribe(todos => {
    //     this.todosList = todos
    //     console.log(todos)
    //   })
    this.companyService.getCompanies()
      .subscribe(companies => {
        this.companiesList = companies
        console.log(companies)
      })
  }

}
