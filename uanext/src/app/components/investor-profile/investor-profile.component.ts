import { ProfileService } from 'src/app/services/profile/profile.service';
import { AuthorizationService } from './../../services/auth/authorization.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { InvestorRole } from 'src/app/models';
import { StateService } from 'src/app/services/state/state.service';
import { HelperService } from 'src/app/services/helperServices/helper.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-investor-profile',
  templateUrl: './investor-profile.component.html',
  styleUrls: ['./investor-profile.component.scss']
})
export class InvestorProfileComponent implements OnInit {
  investor: InvestorRole = null;
  editProfileForm: FormGroup;
  isLoaded = false;

  @ViewChild('phone') phoneInput: ElementRef;
  // @ViewChild('cardNumber') carNumberInput: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private stateService: StateService,
    private authService: AuthorizationService,
    private profileService: ProfileService, // required for html
    private helperService: HelperService,
    private notify: NotificationService
  ) {
    this.editProfileForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(this.helperService.phonePattern)]],
    });
  }

  ngOnInit() {
    setTimeout(() => { // ITS TEST
      this.investor = {
        fullName: 'string',
        email: 'string@ghj.com',
        phone: '380501690664',
        created: 'string',
        lastEdited: 'string'
      };
      this.editProfileForm.setValue({
        fullName: this.investor.fullName,
        email: this.investor.email,
        phone: this.investor.phone
      });
      this.phoneInput.nativeElement.dispatchEvent(new Event('input')); // fix possible bug
      this.isLoaded = true;
    }, 3000);


    this.stateService.user$.asObservable().subscribe(
      investor => {
        this.investor = (investor as InvestorRole);
      },
      err => {
        this.authService.signOut();
      }
    );
  }

  get formControls() {
    return this.editProfileForm.controls;
  }

  onSubmit() {
    if (this.editProfileForm.valid === false) {
      return;
    }

    const id = this.stateService.userId();

    this.profileService.updateInvestorProfile(id, this.editProfileForm.controls).subscribe(
      response => {
        console.log(response);
        this.notify.show('You profile success update', 3000);
      },
      err => {
        console.warn(err);
        this.notify.show(err, 3000);
      }
    );
  }

}
