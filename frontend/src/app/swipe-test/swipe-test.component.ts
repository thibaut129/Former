import {Component, OnInit} from '@angular/core';
declare var Swiper: any;


@Component({
  selector: 'swipe',
  templateUrl: './swipe-test.component.html',
  styleUrls: ['./swipe-test.component.scss']
})

export class SwipeTestComponent implements OnInit {


  constructor() { }

  ngOnInit() {
    var swiper = new Swiper('.swiper-container', {
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
  }


}
