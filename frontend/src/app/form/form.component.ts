import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  id:number;

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit(){
    // 'bank' is the name of the route parameter
    this.id = +this.route.snapshot.paramMap.get('id');
  }

}
