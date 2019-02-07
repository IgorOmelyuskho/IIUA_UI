import { HelperService } from './../../services/helperServices/helper.service';
import { StateService } from './../../services/state/state.service';
import { AuthorizationService } from './../../services/auth/authorization.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { VendorRole } from 'src/app/models';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-vendor-profile',
  templateUrl: './vendor-profile.component.html',
  styleUrls: ['./vendor-profile.component.scss']
})
export class VendorProfileComponent implements OnInit {
  vendor: VendorRole = null;
  editProfileForm: FormGroup;
  isLoaded = false;

  @ViewChild('phone') phoneInput: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private stateService: StateService,
    private authService: AuthorizationService,
    private profileService: ProfileService,
    private helperService: HelperService,
    private notify: NotificationService
  ) {
    this.editProfileForm = this.formBuilder.group({
      itn: ['', Validators.required],
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(this.helperService.phonePattern)]],
    });
  }

  ngOnInit() {
    setTimeout(() => { // ITS TEST
      this.vendor = {
        fullName: 'string',
        email: 'string@ghj.com',
        phone: '380501690664',
        // phone: '+380 50 169 0664',
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
    if (this.editProfileForm.valid === false) {
      return;
    }

    const id = this.stateService.userId();
    this.profileService.updateVendorProfile(id, this.editProfileForm.controls).subscribe(
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
