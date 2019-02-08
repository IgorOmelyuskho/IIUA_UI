import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { SnackBarComponent } from '../../components/snack-bar/snack-bar.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private notifier: MatSnackBar) { }

  show(msg: string, duration: number = 5000): void {
    this.notifier.open(msg, null, {
      duration: duration,
    });
  }
}
