import { ProfileService } from 'src/app/services/profile/profile.service';
import { AuthorizationService } from './../../services/auth/authorization.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { InvestorRole } from 'src/app/models';
import { StateService } from 'src/app/services/state/state.service';
import FormHelper from '../../services/helperServices/formHelper';
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
  FormHelper = FormHelper;

  constructor(
    private formBuilder: FormBuilder,
    private stateService: StateService,
    private authService: AuthorizationService,
    private profileService: ProfileService,
    private notify: NotificationService
  ) {
    this.editProfileForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(FormHelper.emailPattern)]],
      phone: ['', [Validators.required, Validators.pattern(FormHelper.phonePattern)]],
    });
  }

  setFormValues(): void {
    this.editProfileForm.setValue({
      fullName: this.investor.fullName,
      email: this.investor.email,
      phone: this.investor.phone
    });
    // how its fix ??
    setTimeout(() => {
      this.phoneInput.nativeElement.dispatchEvent(new Event('input')); // fix possible bug
    }, 0);
  }

  ngOnInit() {
    this.stateService.user$.asObservable().subscribe(
      investor => {
        if (investor == null) {
          return;
        }
        this.investor = investor as InvestorRole;
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

    this.profileService.updateInvestorProfile(id, this.editProfileForm.value).subscribe(
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
