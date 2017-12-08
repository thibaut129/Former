import {
  AfterViewInit,
  Component, OnInit,
  QueryList, ViewChildren
} from '@angular/core';
import Experience from "../../models/experience.model";
import {DataService} from "../../services/data.service";
import {trigger, state, style, animate, transition} from '@angular/animations';
import User from "../../models/user.model";
import {MailService} from "../../services/mail.service";
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

export class SwipeTestComponent implements OnInit,AfterViewInit {
  shouldDoIt = true; // initialize it to true for the first run
  filteredSelected: Experience[];

  filteredExperiencesListSI: Experience[];
  filteredExperiencesListMAM: Experience[];
  filteredExperiencesListElec: Experience[];

  selectedExperience: Experience[];

  constructor(
    private data: DataService,
    private mailService : MailService
  ) {

  }

  ngOnInit() {
    this.data.filteredSelected.subscribe(message => this.filteredSelected = message)
    this.data.cart.subscribe(message => this.selectedExperience = message)
  }

  doSelect(exp) {
    exp.state = (exp.state === 'selected' ? 'unselected' : 'selected');
    if (exp.state === 'selected') { // add to cart
      console.log(exp);
      this.selectedExperience.push(exp);
    } else if (exp.state === 'unselected') { // remove to cart
      const index = this.selectedExperience.indexOf(exp);
      this.selectedExperience.splice(index, 1);
    }


  }

  sendMail(){
    console.log(this.selectedExperience);
    this.mailService.sendMail(this.selectedExperience).subscribe();
  }


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

  ngAfterViewInit(): void {
    this.shouldDoIt=true;
  }

}
