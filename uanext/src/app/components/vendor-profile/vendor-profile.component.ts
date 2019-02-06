import { StateService } from './../../services/state/state.service';
import { AuthorizationService } from './../../services/auth/authorization.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { VendorRole } from 'src/app/models';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-vendor-profile',
  templateUrl: './vendor-profile.component.html',
  styleUrls: ['./vendor-profile.component.scss']
})
export class VendorProfileComponent implements OnInit {
  vendor: VendorRole = null;
  editProfileForm: FormGroup;
  isLoaded = false;
  mask: any[] = ['+', '1', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  @ViewChild('phone') phoneInput: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private stateService: StateService,
    private authService: AuthorizationService,
    private profileService: ProfileService
  ) {
    this.editProfileForm = this.formBuilder.group({
      itn: ['', Validators.required],
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/([0-9+()-\s]){17}$/)]],
    });
  }

  ngOnInit() {
    setTimeout(() => { // ITS TEST
      this.vendor = {
        fullName: 'string',
        email: 'string@ghj.com',
        phone: '1234567890',
        // phone: '+1 (123) 456-7890',
        created: 'string',
        lastEdited: 'string',
        phoneVerified: true,
        emailVerified: true,
        itn: 'string',
        itnVerified: true
      };
      this.editProfileForm.setValue({
        itn: this.vendor.itn,
        fullName: this.vendor.fullName,
        email: this.vendor.email,
        phone: this.vendor.phone
      });
      this.phoneInput.nativeElement.dispatchEvent(new Event('input')); // fix possible bug
      this.isLoaded = true;
    }, 3000);

    this.stateService.user$.asObservable().subscribe(
      vendor => {
        this.vendor = (vendor as VendorRole);
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
      // this.profileService.updateVendorProfile(this.editProfileForm.controls);
    }
  }
}
