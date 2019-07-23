import { ProfileService } from 'src/app/services/http/profile.service';
import { AuthorizationService } from '../../../services/http/authorization.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { InvestorRole } from 'src/app/models';
import { StateService } from 'src/app/services/state/state.service';
import FormHelper from '../../../helperClasses/helperClass';
import { NotificationService } from 'src/app/services/notification.service';
import { TranslateService } from 'src/app/services/translate.service';

@Component({
  selector: 'app-investor-profile',
  templateUrl: './investor-profile.component.html',
  styleUrls: ['./investor-profile.component.scss']
})
export class InvestorProfileComponent implements OnInit {
  investor: InvestorRole = null;
  editProfileForm: FormGroup;
  isLoaded = false;
  FormHelper = FormHelper;
  self = 'InvestorProfileComponent';

  @ViewChild('phone') phoneInput: ElementRef;

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
      creditCardNumber: ['', [Validators.required, Validators.pattern(FormHelper.creditCardPattern)]],
      fullName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(FormHelper.phonePattern)]],
    });
  }

  setFormValues(): void {
    this.editProfileForm.setValue({
      password: '',
      creditCardNumber: this.investor.creditCardNumber,
      fullName: this.investor.fullName,
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
        this.investor.created = new Date(this.investor.created).toLocaleString();
        this.investor.lastEdited = new Date(this.investor.lastEdited).toLocaleString();
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

  removeAccount() {
    const remove = confirm(this.translate.data.reallyRemoveAccount);

    if (remove === true) {
      this.profileService.removeInvestorProfile().subscribe(
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
    const id = this.stateService.userId();

    if (this.editProfileForm.valid === false || id == null) {
      return;
    }

    this.profileService.updateInvestorProfile(id, this.editProfileForm.value).subscribe(
      response => {
        this.notify.show(response['data']);
      },
      err => {
        console.warn(err);
      }
    );
  }

}
