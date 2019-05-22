import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {
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

  removeItem(item) {
    this.isTouched = true;

    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i] === item) {
        this.items.splice(i, 1);

        if (this.items.length <= this.maxItemsCount && this.items.length >= this.minItemsCount) {
          this.itemsEvent.emit(this.items);
        }
        if (this.items.length < this.minItemsCount) {
          this.itemsEvent.emit({ error: true });
        }

        return;
      }
    }
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
      this.items.push({ url: this.newItem });
    }
    if (this.items.length > this.maxItemsCount || this.items.length < this.minItemsCount) {
      this.itemsEvent.emit({ error: true });
      return;
    }

    this.itemsEvent.emit(this.items);
  }

}
