import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-new-company',
  templateUrl: './new-company.component.html',
  styleUrls: ['./new-company.component.scss']
})
export class NewCompanyComponent implements OnInit {
  @Input() newCompanyView: boolean;
  @Output() newCompanyViewChange = new EventEmitter<boolean>();

  constructor() { }


  setStatus(status:boolean){
    this.newCompanyView=status;
    this.newCompanyViewChange.emit(status);
  }

  ngOnInit() {
  }

}
