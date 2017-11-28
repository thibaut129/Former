import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

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

  constructor() { }


  setStatus(status:boolean){
    // this.nextPage = this.nextPage + 1;
    // this.nextPageChange.emit(this.nextPage+1);

    this.newCompanyView=status;
    this.newCompanyViewChange.emit(status);
  }

  ngOnInit() {
  }

}
