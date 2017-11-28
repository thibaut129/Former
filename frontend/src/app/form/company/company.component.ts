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
  @Output() newCompanyViewChange = new EventEmitter<boolean>();

  @Input() companyID: string;
  @Output() companyIDChange = new EventEmitter<string>();

  @Input() companySelected: Company;
  @Output() companySelectedChange = new EventEmitter<Company>();

  @Input() nextPage: number;
  @Output() nextPageChange = new EventEmitter<number>();

  companiesList: Company[];

  constructor(
    private companyService: CompanyService
  ) { }


  setStatus(status:boolean){
    this.nextPageChange.emit(this.nextPage+1);

    this.newCompanyView=status;
    this.newCompanyViewChange.emit(status);
  }

  getCompany(company:Company){
    this.companyID=company._id;
    this.companySelected=company;
    this.companyIDChange.emit(company._id);
    this.companySelectedChange.emit(company);

    this.nextPageChange.emit(this.nextPage+1);

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
