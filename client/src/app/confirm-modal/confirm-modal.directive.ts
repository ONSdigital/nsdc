import {
  Directive,
  Input,
  Output,
  ViewContainerRef,
  HostListener,
  EventEmitter
} from '@angular/core';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';

@Directive({
  selector: '[nsdcConfirmModal]'
})
export class ConfirmModalDirective {

  @Input('nsdcConfirmModal')
  public messageBody = 'Are you sure you want to do this?';

  @Input()
  public confirm: boolean = false;

  @Output()
  public confirmed = new EventEmitter();

  @Output()
  public canceled = new EventEmitter();

  constructor(
    vcRef: ViewContainerRef,
    public modal: Modal,
    overlay: Overlay
  ) {
    overlay.defaultViewContainer = vcRef;
  }

  @HostListener('click', ['$event'])
  onClick(e) {
    e.stopPropagation();
    if (!this.confirm) {
      this.confirmed.emit();
    } else {
      const modalConfirmation = this.modal.confirm()
      .size('sm')
      .isBlocking(false)
      .showClose(true)
      .keyboard(27)
      .title('Confirm')
      .body(this.messageBody)
      .open();
      modalConfirmation
      .then(dialog => dialog.result)
      .then(
        () => this.confirmed.emit(),
        () => this.canceled.emit()
      );
    }
  }

}
