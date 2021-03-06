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
    ]),
    trigger('mailState', [
      state('full', style({
        transform: 'translateX(0)',
        opacity: 1

      })),
      state('empty', style({
        transform: 'translateX(0)',
        opacity: 0
      })),
      transition('full => *', [
        style({transform: 'translateX(0)'}),
            animate('50ms', style({ transform: 'translateX(100%)'}))
      ]),
      transition('empty => full', animate('100ms ease-in')),
    ])
  ]
})

export class SwipeTestComponent implements OnInit,AfterViewInit {
  shouldDoIt = true; // initialize it to true for the first run
  filteredSelected: Experience[];

  selectedExperience: Experience[];
  cart : any [];
  email: string;

  constructor(
    private data: DataService,
    private mailService : MailService
  ) {
    this.cart = [];
    this.email="";
  }

  ngOnInit() {
    this.data.filteredSelected.subscribe(message => this.filteredSelected = message)
    this.data.cart.subscribe(message => this.selectedExperience = message)
  }

  doSelect(exp) {
    exp.state = (exp.state === 'selected' ? 'unselected' : 'selected');
    if (exp.state === 'selected') { // add to cart
      this.selectedExperience.push(exp);
      let experience = {id : exp._id, user : exp.user, company : exp.company.name, location : exp.location};
      console.log(experience);
      this.cart.push(experience);
    } else if (exp.state === 'unselected') { // remove to cart
      const index = this.selectedExperience.indexOf(exp);
      this.selectedExperience.splice(index, 1);
      const indexOfUnselected = this.cart.findIndex(i => i.id === exp.id);
      this.cart.splice(indexOfUnselected,1);
    }


  }

  validateEmail() {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(this.email.toLowerCase());
  }

  callSendMail() {
    if (this.validateEmail()) {
      this.sendMail();
    } else {
      console.log("wrong email");
    }
  }
  sendMail(){
    console.log(this.selectedExperience);
    // const mailObject = {mail : "thibaut.terris@gmail.com", data : this.selectedExperience};

    // todo: check valid email

    const mailObject = {mail : this.email, data : this.selectedExperience};
    this.mailService.sendMail(mailObject).subscribe();

    // reset cart
    this.cart = [];
    for (let e of this.filteredSelected) {
      (<any>e).state = 'unselected';
    }
    this.data.changeCart(this.cart);
  }

  get stateCart() {
    return this.selectedExperience.length < 1 ? 'empty' : 'full'
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
