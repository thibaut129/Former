import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-new-company',
  templateUrl: './new-company.component.html',
  styleUrls: ['./new-company.component.scss']
})
export class NewCompanyComponent implements OnInit {
  @Input() getNewCompanyView: boolean;
  @Output() getNewCompanyViewChange = new EventEmitter<boolean>();

  constructor() { }


  setStatus(status:boolean){
    this.getNewCompanyView=status;
    this.getNewCompanyViewChange.emit(status);
  }

  ngOnInit() {
  }

}
