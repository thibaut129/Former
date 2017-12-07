import {
  AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit,
  QueryList, ViewChildren
} from '@angular/core';
import Experience from "../../models/experience.model";
import {DataService} from "../../services/data.service";
import {trigger, state, style, animate, transition} from '@angular/animations';
import User from "../../models/user.model";
declare var Swiper: any;


@Component({
  selector: 'swipe',
  templateUrl: './swipe-test.component.html',
  styleUrls: ['./swipe-test.component.scss'],
  animations: [
    trigger('selectState', [
      state('unselected', style({
        // 'border-width': '1px',
        transform: 'scale(1)'
      })),
      state('selected',   style({
        'border-width': '5px',
        // 'border-radius': '0.25rem',
        transform: 'scale(0.95)'
      })),
      transition('* => selected', animate('100ms ease-in')),
      transition('unselected => selected', animate('100ms ease-in')),
      transition('selected => unselected', animate('100ms ease-out'))
    ])
  ]
})

export class SwipeTestComponent implements OnInit {


  filteredExperiencesList: Experience[];

  filteredExperiencesListSI: Experience[];
  filteredExperiencesListMAM: Experience[];
  filteredExperiencesListElec: Experience[];

  cart: User[];

  @ViewChildren('allTheseThings') things: QueryList<any>;

  constructor(private data: DataService
  ) { }

  ngOnInit() {
    this.data.filteredExperiencesList.subscribe(message => this.filteredExperiencesList = message)
    this.data.cart.subscribe(message => this.cart = message)


  }

  select = false;

  // get stateName() {
  //   return this.select ? 'selected' : 'unselected'
  // }

  doSelect(exp) {

    // this.select = !this.select;
    exp.state = (exp.state === 'selected' ? 'unselected' : 'selected');
    if (exp.state === 'selected') { // add to cart
      this.cart.push(exp.user);
      console.log(this.cart);
    } else if (exp.state === 'unselected') { // remove to cart
      const index = this.cart.indexOf(exp.user);
      this.cart.splice(index, 1);
      console.log(this.cart);
    }

  }

  shouldDoIt = true; // initialize it to true for the first run

  callFunction(stuff) {
    if (this.shouldDoIt) {
      let swiper = new Swiper('.swiper-container', {
        slidesPerView: 3,
        spaceBetween: 30,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        keyboard: {
          enabled: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
      this.shouldDoIt = false; // set it to false until you need to trigger again
    }
  }

}
