import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  id:number;
  stepName:string;
  newCompany: boolean;

  constructor(
    private route: ActivatedRoute
  ) {
    this.newCompany = false;
  }


  ngOnInit(){
    this.id = 1;
    // 'bank' is the name of the route parameter
    // this.id = +this.route.snapshot.paramMap.get('id');
  }

  previousPage(id) {
    this.id = id-1;

  }

  nextPage(id) {

    this.id = id+1;

  }

}
