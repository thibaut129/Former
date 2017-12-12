import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FilterEnumService} from "../../services/filterEnum.service";
import {FilterEnum} from "../../models/filterEnum.model";

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {
  @Input() filters: string[];
  @Output() filtersChange = new EventEmitter<string[]>();

  filtersEnumList: FilterEnum[];
  keywordsSelected: string[];

  constructor(
    private filterEnumService: FilterEnumService,

  ) { }

  ngOnInit() {
    this.filterEnumService.getFiltersEnum()
      .subscribe(filtersEnum => {
        this.filtersEnumList = filtersEnum
      })

    this.keywordsSelected = []
  }

  addKeyword(keyword:string) {
    this.keywordsSelected.push(keyword);
    this.filters = this.keywordsSelected;

    this.filtersChange.emit(this.filters);

  }

  removeKeyword(keyword:string) {
    let index = this.keywordsSelected.indexOf(keyword, 0);
    if (index > -1) {
      this.keywordsSelected.splice(index, 1);
    }

    this.filters = this.keywordsSelected;
    this.filtersChange.emit(this.filters);
  }

}
