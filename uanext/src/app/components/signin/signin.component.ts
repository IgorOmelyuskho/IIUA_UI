import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { AuthorizationService } from '../../services/auth/authorization.service';
import { StateService } from './../../services/state/state.service';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { Observable } from 'rxjs';
import { VendorRole, InvestorRole } from 'src/app/models';
import { NotificationService } from 'src/app/services/notification/notification.service';
import FormHelper from '../../services/helperServices/formHelper';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  submitted = false;
  FormHelper = FormHelper;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthorizationService,
    private router: Router,
    private stateService: StateService,
    private profileService: ProfileService,
    private notify: NotificationService,
  ) {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(FormHelper.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
  }

  get formControls() {
    return this.signinForm.controls;
  }

  fetchVendorSubscribe(observable: Observable<VendorRole>): void {
    observable.subscribe(
      (vendor: VendorRole) => {
        this.stateService.user$.next(vendor);
        this.stateService.authorized$.next(true);
      },
      err => {
        console.warn(err);
        this.authService.signOut();
      }
    );
  }

  fetchInvestorSubscribe(observable: Observable<InvestorRole>): void {
    observable.subscribe(
      (investor: InvestorRole) => {
        this.stateService.user$.next(investor);
        this.stateService.authorized$.next(true);
      },
      err => {
        console.warn(err);
        this.authService.signOut();
      }
    );
  }

  onSubmit() {
    this.submitted = true;

    if (this.signinForm.invalid) {
      return;
    }

    this.authService.signIn(this.signinForm.value).subscribe(
      response => {
        console.log(response);
        // not required, in this section status always === 200 ?
        if (response.status !== 200 || response.body.isSuccess !== true) {
          this.notify.show(response.body.error);
          return;
        }

        localStorage.setItem('token', response.body.data);
        const role = this.stateService.role();

        if (role === 'Vendor') {
          console.log('NAVIGATE TO HOME/VENDOR');
          this.fetchVendorSubscribe( this.profileService.fetchVendor() );
          this.router.navigate(['home', 'vendor']);
        }
        if (role === 'Investor') {
          console.log('NAVIGATE TO HOME/INVESTOR');
          this.fetchInvestorSubscribe( this.profileService.fetchInvestor() );
          this.router.navigate(['home', 'investor']);
        }
      },
      err => {
        console.warn(err);
        this.notify.show(err.error.error.errorMessage);
        // this.authService.signOut();
      }
    );
  }

}
