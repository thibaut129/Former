import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  @Input() getNewCompany: boolean;
  @Output() getNewCompanyChange = new EventEmitter<boolean>();

  constructor() { }


  setStatus(status:boolean){
    this.getNewCompany=status;
    this.getNewCompanyChange.emit(status);
  }

  ngOnInit() {
  }

}
