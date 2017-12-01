import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss']
})
export class ModalContentComponent{
  idModal: number;

  constructor(public activeModal: NgbActiveModal) {
    this.idModal = 0;
  }

  nextModal() {
    this.idModal++;
  }
}
