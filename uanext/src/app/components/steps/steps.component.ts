import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class StepsComponent implements OnInit, OnChanges {
  newItem: string;
  newItemMinValid = true;
  newItemMaxValid = true;
  newItemNullValid = true;
  isTouched = false;

  @Output() itemsEvent = new EventEmitter<any>();
  @Input() maxItemsCount = 1000;
  @Input() minItemsCount = 0;
  @Input() parentSubmitted = false;
  @Input() items: any[] = [];

  constructor() { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    this.setItems();
  }

  removeItem(item) {
    this.isTouched = true;

    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i] === item) {
        this.items.splice(i, 1);

        if (this.items.length <= this.maxItemsCount && this.items.length >= this.minItemsCount) {
          this.setStepNumber();
          this.itemsEvent.emit(this.items);
        }
        if (this.items.length < this.minItemsCount) {
          this.itemsEvent.emit({ error: true });
        }

        return;
      }
    }
  }

  setItems() {
    this.items.sort((a, b) => {
      if (a.stepNumber > b.stepNumber) { return 1; }
      if (a.stepNumber < b.stepNumber) { return -1; }
      if (a.stepNumber === b.stepNumber) { return 0; }
    });
  }

  setStepNumber() {
    for (let i = 0; i < this.items.length; i++) {
      this.items[i].stepNumber = i;
    }
  }

  listOrderChanged(e) {
    this.setStepNumber();
    this.itemsEvent.emit(this.items);
  }

  showMaxItemsCountErr(): boolean {
    return (this.isTouched === true && this.items.length >= this.maxItemsCount + 1);
  }

  showMinItemsCountErr(): boolean {
    if (this.isTouched === true && this.items.length < this.minItemsCount) {
      return true;
    }
    if (this.parentSubmitted === true && this.items.length < this.minItemsCount) {
      return true;
    }
    return false;
  }

  checkNewItem(): boolean {
    if (this.newItem == null || this.newItem === '') {
      this.newItemNullValid = false;
      this.newItemMinValid = true;
      this.newItemMaxValid = true;
      return false;
    } else {
      this.newItemNullValid = true;
    }

    const minLength = 3;
    const maxLength = 255;

    if (this.newItem.length < minLength) {
      this.newItemMinValid = false;
    } else {
      this.newItemMinValid = true;
    }

    if (this.newItem.length > maxLength) {
      this.newItemMaxValid = false;
    } else {
      this.newItemMaxValid = true;
    }

    if (this.newItemMinValid === false || this.newItemMaxValid === false) {
      return false;
    }

    return true;
  }

  newItemOnInput() {
    if (this.isTouched === false) {
      return;
    }

    this.checkNewItem();
  }

  addNewItem() {
    this.isTouched = true;

    const isValid = this.checkNewItem();
    if (isValid) {
      this.items.push({ data: this.newItem });
    }
    if (this.items.length > this.maxItemsCount || this.items.length < this.minItemsCount) {
      this.itemsEvent.emit({ error: true });
      return;
    }

    this.setStepNumber();
    this.itemsEvent.emit(this.items);
  }

}
