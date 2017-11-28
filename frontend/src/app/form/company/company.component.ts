import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CompanyService} from "../../services/company.service";
import Company from "../../models/company.model";

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  @Input() newCompanyView: boolean;
  @Input() companyID: string;
  @Input() companySelected: Company;

  @Output() newCompanyViewChange = new EventEmitter<boolean>();
  @Output() companyIDChange = new EventEmitter<string>();
  @Output() companySelectedChange = new EventEmitter<Company>();

  companiesList: Company[];

  constructor(
    private companyService: CompanyService
  ) { }


  setStatus(status:boolean){
    this.newCompanyView=status;
    this.newCompanyViewChange.emit(status);
  }

  getCompany(company:Company){
    this.companyID=company._id;
    this.companySelected=company;
    this.companyIDChange.emit(company._id);
    this.companySelectedChange.emit(company);
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
