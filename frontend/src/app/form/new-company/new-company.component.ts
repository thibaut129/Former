import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CompanyService} from "../../services/company.service";
import Company from "../../models/company.model";

@Component({
  selector: 'app-new-company',
  templateUrl: './new-company.component.html',
  styleUrls: ['./new-company.component.scss']
})
export class NewCompanyComponent implements OnInit {
  @Input() nextPage: number;
  @Output() nextPageChange = new EventEmitter<number>();

  @Input() newCompanyView: boolean;
  @Output() newCompanyViewChange = new EventEmitter<boolean>();

  @Input() companiesList: Company[];
  @Output() companiesListChange = new EventEmitter<Company[]>();

  newCompany: Company;

  constructor(
    private companyService: CompanyService
  ) {
    this.newCompany = new Company();
  }


  ngOnInit() {
  }

  setStatus(status:boolean){
    // this.nextPage = this.nextPage + 1;
    // this.nextPageChange.emit(this.nextPage+1);

    this.newCompanyView=status;
    this.newCompanyViewChange.emit(status);
  }


  createCompany(type: string)  {
    this.newCompany.type = type;

    this.companyService.createCompany(this.newCompany)
      .subscribe((res) => {
        this.companiesList.push(res.data)
        // get UserId for the User created
        console.log(res.data._id);

        this.setStatus(false)
      })
  }
}
