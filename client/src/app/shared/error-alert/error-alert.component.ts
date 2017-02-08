import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'nsdc-error-alert',
  template: `
    <div *ngIf="errorMessages && errorMessages.length" class="alert alert-danger">
      <span class="glyphicon glyphicon-exclamation-sign"></span>
      <span class="alert-message-container">
        <div *ngFor="let errorMessage of errorMessages">
          {{errorMessage}}
        </div>
      </span>
    </div>
  `,
  styleUrls: ['error-alert.component.css']
})
export class ErrorAlertComponent {

  @Input()
  public errorMessages: string[] = [];

}
