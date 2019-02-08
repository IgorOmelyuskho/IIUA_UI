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
      email: ['', [Validators.required, Validators.pattern(this.helperService.emailPattern)]],
      phone: ['', [Validators.required, Validators.pattern(this.helperService.phonePattern)]],
    });
  }

  setFormValues(): void {
    this.editProfileForm.setValue({
      itn: this.vendor.itn,
      fullName: this.vendor.fullName,
      email: this.vendor.email,
      phone: this.vendor.phone
    });
    // how its fix ??
    setTimeout(() => {
      this.phoneInput.nativeElement.dispatchEvent(new Event('input')); // fix possible bug
    }, 0);
  }

  ngOnInit() {
    this.stateService.user$.asObservable().subscribe(
      vendor => {
        if (vendor == null) {
          return;
        }
        this.vendor = vendor as VendorRole;
        this.isLoaded = true;
        this.setFormValues();
      },
      err => {
        console.log(err);
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

    if (id == null) {
      return;
    }

    this.profileService.updateVendorProfile(id, this.editProfileForm.value).subscribe(
      response => {
        console.log(response);
        this.notify.show(response['data']);
      },
      err => {
        console.warn(err);
      }
    );
  }

}
