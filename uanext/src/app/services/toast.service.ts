import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { SnackBarComponent } from '../components/snack-bar/snack-bar.component';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private ref = null;

  constructor(private notifier: MatSnackBar) { }

  show(msg: string, duration: number = 10000): void {
    this.ref = this.notifier.openFromComponent(SnackBarComponent, {
      duration: duration,
      data: msg,
    });
  }

}
