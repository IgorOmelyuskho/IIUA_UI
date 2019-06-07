import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { AuthorizationService } from '../../services/http/authorization.service';
import { StateService } from './../../services/state/state.service';
import { ProfileService } from 'src/app/services/http/profile.service';
import { Observable } from 'rxjs';
import { VendorRole, InvestorRole, AdminRole, UserRole } from 'src/app/models';
import { NotificationService } from 'src/app/services/http/notification.service';
import FormHelper from '../../helperClasses/helperClass';
import { take, first, delay } from 'rxjs/operators';
import { ProjectUserRole } from 'src/app/models/projectUserRole';

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
  self: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthorizationService,
    private router: Router,
    private stateService: StateService,
    private profileService: ProfileService,
    private notify: NotificationService,
  ) {
    this.self = this.constructor.name;
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
        this.router.navigate(['admin']);
      },
      err => {
        console.warn(err);
        this.authService.signOut();
      }
    );
  }

  fetchProjectUserSubscribe(observable: Observable<ProjectUserRole>): void {
    observable.subscribe(
      (projectUser: ProjectUserRole) => {
        this.stateService.user$.next(projectUser);
        this.stateService.authorized$.next(true);
        this.router.navigate(['projectUser']);
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
        const role: UserRole = this.stateService.role();

        if (role === UserRole.Vendor) {
          this.fetchVendorSubscribe( this.profileService.fetchVendor() );
        }
        if (role === UserRole.Investor) {
          this.fetchInvestorSubscribe( this.profileService.fetchInvestor() );
        }
        if (role === UserRole.Admin) {
          this.fetchAdminSubscribe( this.profileService.fetchAdmin() );
        }
        if (role === UserRole.ProjectUser) {
          this.fetchProjectUserSubscribe( this.profileService.fetchProjectUser() );
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
