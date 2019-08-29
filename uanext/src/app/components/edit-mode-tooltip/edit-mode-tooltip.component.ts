import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-edit-mode-tooltip',
  templateUrl: './edit-mode-tooltip.component.html',
  styleUrls: ['./edit-mode-tooltip.component.scss']
})
export class EditModeTooltipComponent implements OnInit {
  @Output() closeFormEvent: EventEmitter<boolean> = new EventEmitter(false);

  constructor() { }

  ngOnInit() { }

  closeForm() {
    this.closeFormEvent.emit(true);
  }

}
