import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Dialog } from 'primeng/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() handleSubmit: any;
  @Input() modal: boolean;
  @Output() modalChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  country = {
    name: '',
    currencies: '',
    capital: '',
    region: '',
  };
  handleSubmitChild(di: Dialog, event: Event) {
    this.handleSubmit(di, event, this.country);
  }
}
