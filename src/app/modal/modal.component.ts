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
  clear() {
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
    //could also emit country to handleSubmit if it was an output instead of an input
    this.handleSubmit({ ...this.country });
    this.clear();
  }
}
