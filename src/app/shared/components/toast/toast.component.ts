import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {

  @Input('showModal') modal: boolean;
  @Input('title') title: string;
  @Input('message') message: string;
  @Output('close') close = new EventEmitter();

  constructor(private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.ref.detectChanges();
  }

  ngOnChanges(): void {
    if (this.modal) {
      this.showToast();
    }
  }

  showToast() {
    $('#modalError').show();
  }

  closeModal() {
    $('#modalError').hide();
    this.close.emit(false);
  }

}
