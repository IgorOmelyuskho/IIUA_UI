import { ProfileService } from 'src/app/services/http/profile.service';
import { AuthorizationService } from '../../../services/http/authorization.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { StateService } from 'src/app/services/state/state.service';
import FormHelper from '../../../helperClasses/helperClass';
import { NotificationService } from 'src/app/services/http/notification.service';
import { AdminRole } from 'src/app/models';
@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit {
  admin: AdminRole = null;
  editProfileForm: FormGroup;
  isLoaded = false;

  @ViewChild('phone') phoneInput: ElementRef;
  FormHelper = FormHelper;

  constructor(
    private formBuilder: FormBuilder,
    private stateService: StateService,
    private authService: AuthorizationService,
    private profileService: ProfileService,
    private notify: NotificationService
  ) {
    this.editProfileForm = this.formBuilder.group({
      password: ['', Validators.minLength(6)],
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(FormHelper.emailPattern)]],
      phone: ['', [Validators.required, Validators.pattern(FormHelper.phonePattern)]],
    });
  }

  setFormValues(): void {
    this.editProfileForm.setValue({
      password: '',
      fullName: this.admin.fullName,
      email: this.admin.email,
      phone: this.admin.phone
    });
    // how its fix ??
    setTimeout(() => {
      this.phoneInput.nativeElement.dispatchEvent(new Event('input')); // fix possible bug
    }, 0);
  }

  ngOnInit() {
    this.stateService.user$.asObservable().subscribe(
      admin => {
        if (admin == null) {
          return;
        }
        this.admin = admin as AdminRole;
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

  onSubmit() {
    if (this.editProfileForm.valid === false) {
      return;
    }

    const id = this.stateService.userId();

    if (id == null) {
      return;
    }

    this.profileService.updateAdminProfile(id, this.editProfileForm.value).subscribe(
      response => {
        this.notify.show(response['data']);
      },
      err => {
        console.warn(err);
      }
    );
  }

}
