import { ProfileService } from 'src/app/services/profile/profile.service';
import { AuthorizationService } from './../../services/auth/authorization.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { InvestorRole } from 'src/app/models';
import { StateService } from 'src/app/services/state/state.service';

@Component({
  selector: 'app-investor-profile',
  templateUrl: './investor-profile.component.html',
  styleUrls: ['./investor-profile.component.scss']
})
export class InvestorProfileComponent implements OnInit {
  investor: InvestorRole = null;
  editProfileForm: FormGroup;
  isLoaded = false;
  maskPhone: any[] = ['+', '1', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  maskCardNumber: any[] = [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/];

  @ViewChild('phone') phoneInput: ElementRef;
  @ViewChild('cardNumber') carNumberInput: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private stateService: StateService,
    private authService: AuthorizationService,
    private profileService: ProfileService
  ) {
    this.editProfileForm = this.formBuilder.group({
      creditCardNumber: ['', [Validators.required, Validators.pattern(/([0-9\s]){19}$/)]],
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/([0-9+()-\s]){17}$/)]],
    });
  }

  ngOnInit() {
    setTimeout(() => { // ITS TEST
      this.investor = {
        fullName: 'string',
        email: 'string@ghj.com',
        // phone: '+1 (123) 456-7890',
        phone: '1234567890',
        created: 'string',
        lastEdited: 'string',
        creditCardNumber: '1111 2222 3333 4444',
        // creditCardNumber: '1111222233334444',
      };
      this.editProfileForm.setValue({
        creditCardNumber: this.investor.creditCardNumber,
        fullName: this.investor.fullName,
        email: this.investor.email,
        phone: this.investor.phone
      });
      this.phoneInput.nativeElement.dispatchEvent(new Event('input')); // fix possible bug
      this.carNumberInput.nativeElement.dispatchEvent(new Event('input')); // fix possible bug
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
    if (this.editProfileForm.valid) {
      console.log(this.editProfileForm.controls);
      // this.profileService.updateInvestorProfile(this.editProfileForm.controls);
    }
  }
}
