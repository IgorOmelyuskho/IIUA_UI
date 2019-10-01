import { StateService } from '../../../services/state/state.service';
import { AuthorizationService } from '../../../services/http/authorization.service';
import FormHelper from '../../../helperClasses/helperClass';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { VendorRole } from 'src/app/models';
import { ProfileService } from 'src/app/services/http/profile.service';
import { NotificationService } from 'src/app/services/notification.service';
import { TranslateService } from 'src/app/services/translate.service';

@Component({
  selector: 'app-vendor-profile',
  templateUrl: './vendor-profile.component.html',
  styleUrls: ['./vendor-profile.component.scss']
})
export class VendorProfileComponent implements OnInit {
  vendor: VendorRole = null;
  editProfileForm: FormGroup;
  isLoaded = false;
  FormHelper = FormHelper;
  self = 'VendorProfileComponent';
  @ViewChild('passwordInput') passwordInput: ElementRef;
  @ViewChild('togglePasswordImg') togglePasswordImg: ElementRef;
  // @ViewChild('phone') phoneInput: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private stateService: StateService,
    private authService: AuthorizationService,
    private profileService: ProfileService,
    private notify: NotificationService,
    private translate: TranslateService,
  ) {
    this.editProfileForm = this.formBuilder.group({
      password: ['', Validators.minLength(6)],
      // itn: ['', Validators.required],
      fullName: ['', Validators.required],
      // phone: ['', [Validators.required, Validators.pattern(FormHelper.phonePattern)]],
    });
  }

  setFormValues(): void {
    this.editProfileForm.setValue({
      password: '',
      // itn: this.vendor.itn,
      fullName: this.vendor.fullName,
      // phone: this.vendor.phone
    });
    // how its fix ??
    // setTimeout(() => {
    //   this.phoneInput.nativeElement.dispatchEvent(new Event('input')); // fix possible bug
    // }, 50);
  }

  ngOnInit() {
    this.stateService.user$.asObservable().subscribe(
      vendor => {
        if (vendor == null) {
          return;
        }
        this.vendor = vendor as VendorRole;
        this.vendor.created = new Date(this.vendor.created).toLocaleString();
        this.vendor.lastEdited = new Date(this.vendor.lastEdited).toLocaleString();
        this.isLoaded = true;
        this.setFormValues();
      },
      err => {
        console.warn(err);
        this.authService.signOut();
      }
    );
  }

  get formControls() {
    return this.editProfileForm.controls;
  }

  togglePasswordVisible() {
    if (this.passwordInput.nativeElement.type === 'password') {
      this.passwordInput.nativeElement.type = 'text';
      this.togglePasswordImg.nativeElement.src = '../../../../assets/img/hide-password.png';
    } else {
      this.passwordInput.nativeElement.type = 'password';
      this.togglePasswordImg.nativeElement.src = '../../../../assets/img/show-password.png';
    }
  }

  removeAccount() {
    const remove = confirm(this.translate.data.reallyRemoveAccount);

    if (remove === true) {
      this.profileService.removeVendorProfile().subscribe(
        val => {
          this.authService.signOut();
        },
        err => {
          console.warn(err);
        }
      );
    }
  }

  onSubmit() {
    const id = this.stateService.getId();

    if (this.editProfileForm.valid === false || id == null) {
      return;
    }

    this.profileService.updateVendorProfile(id, this.editProfileForm.value).subscribe(
      response => {
        this.notify.show(response['data']);
      },
      err => {
        console.warn(err);
      }
    );
  }

}
