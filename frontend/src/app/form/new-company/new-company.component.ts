import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-new-company',
  templateUrl: './new-company.component.html',
  styleUrls: ['./new-company.component.scss']
})
export class NewCompanyComponent implements OnInit {
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
