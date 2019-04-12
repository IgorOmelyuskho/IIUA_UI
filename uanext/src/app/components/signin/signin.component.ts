import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { AuthorizationService } from '../../services/auth/authorization.service';
import { StateService } from './../../services/state/state.service';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { Observable } from 'rxjs';
import { VendorRole, InvestorRole, AdminRole, UserRole } from 'src/app/models';
import { NotificationService } from 'src/app/services/notification/notification.service';
import FormHelper from '../../services/helperServices/formHelper';
import { take, first, delay } from 'rxjs/operators';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  submitted = false;
  FormHelper = FormHelper;
  showProgressBar = false;

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
        this.router.navigate(['home', 'vendor']);
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
        this.router.navigate(['home', 'investor']);
      },
      err => {
        console.warn(err);
        this.authService.signOut();
      }
    );
  }

  fetchAdminSubscribe(observable: Observable<AdminRole>): void {
    observable.subscribe(
      (admin: AdminRole) => {
        this.stateService.user$.next(admin);
        this.stateService.authorized$.next(true);
        this.router.navigate(['home', 'admin']);
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

    this.showProgressBar = true;

    this.authService.signIn(this.signinForm.value).subscribe(
      response => {
        this.showProgressBar = false;

        localStorage.setItem('token', response.body.data);
        const role = this.stateService.role();

        if (role === UserRole.Vendor) {
          this.fetchVendorSubscribe( this.profileService.fetchVendor() );
        }
        if (role === UserRole.Investor) {
          this.fetchInvestorSubscribe( this.profileService.fetchInvestor() );
        }
        if (role === UserRole.Admin) {
          this.fetchInvestorSubscribe( this.profileService.fetchInvestor() );
        }
      },
      err => {
        console.warn(err);
        this.showProgressBar = false;
        this.notify.show(err.error.error.errorMessage);
      }
    );
  }

}
