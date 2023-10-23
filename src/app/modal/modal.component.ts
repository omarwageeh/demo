import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Dialog } from 'primeng/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() handleSubmit: any;
  @Input() modal: boolean = false;
  @Output() modalChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  country = {
    name: '',
    currencies: '',
    capital: '',
    region: '',
  };
  OnInit() {
    this.country = {
      name: '',
      currencies: '',
      capital: '',
      region: '',
    };
  }
  onHide() {
    this.modalChange.emit(false);
  }
  handleSubmitChild(di: Dialog) {
    di.onHide.emit();
    this.handleSubmit({ ...this.country });
  }
}
