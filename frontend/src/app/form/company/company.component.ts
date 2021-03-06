import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CompanyService} from "../../services/company.service";
import Company from "../../models/company.model";

import {trigger, state, style, animate, transition} from '@angular/animations';

import {FilterPipe, SortByPipe} from '../pipes'

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
  animations: [
    trigger('newCompanyState', [
      state('show', style({
        opacity: 1
      })),
      state('hide',   style({
        opacity: 0
      })),
      transition('show => hide', animate('600ms ease-out')),
      transition('hide => show', animate('1000ms ease-in'))
    ])
  ]})
export class CompanyComponent implements OnInit {
  newCompanyView: boolean;
  // @Output() newCompanyViewChange = new EventEmitter<boolean>();

  @Input() companyID: string;
  @Output() companyIDChange = new EventEmitter<string>();

  @Input() companySelected: Company;
  @Output() companySelectedChange = new EventEmitter<Company>();

  @Input() nextPage: number;
  @Output() nextPageChange = new EventEmitter<number>();

  companiesList: Company[];

  newCompany: Company;

  constructor(
    private companyService: CompanyService
  ) {
    this.newCompanyView = false;
    this.newCompany = new Company(); // new-company div
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


  setStatus(status:boolean){
    this.newCompanyView=status;
    // this.newCompanyViewChange.emit(status);
  }

  getCompany(company:Company){
    this.companyID=company._id;
    this.companySelected=company;
    this.companyIDChange.emit(company._id);
    this.companySelectedChange.emit(company);

    this.nextPageChange.emit(this.nextPage+1);

  }

  // new-company div
  createCompany(type: string)  {
    this.newCompany.type = type;

    //todo: mettre une alerte sur le contour de la div avec bootstrap
    if (this.newCompany.name != "") {
      this.companyService.createCompany(this.newCompany)
        .subscribe((res) => {
          this.companiesList.push(res.data)
          // get UserId for the User created
          console.log(res.data._id);

          this.setStatus(false)
        })
    }
  }

  get stateNewCompany() {
    return this.newCompany.name ? 'show' : 'hide'
  }
}
