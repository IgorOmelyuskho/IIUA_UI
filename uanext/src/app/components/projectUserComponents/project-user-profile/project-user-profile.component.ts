import { ProfileService } from 'src/app/services/http/profile.service';
import { AuthorizationService } from '../../../services/http/authorization.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { StateService } from 'src/app/services/state/state.service';
import FormHelper from '../../../helperClasses/helperClass';
import { NotificationService } from 'src/app/services/notification.service';
import { ProjectUserRole } from 'src/app/models/projectUserRole';

@Component({
  selector: 'app-project-user-profile',
  templateUrl: './project-user-profile.component.html',
  styleUrls: ['./project-user-profile.component.scss']
})
export class ProjectUserProfileComponent implements OnInit {
  projectUser: ProjectUserRole = null;
  editProfileForm: FormGroup;
  isLoaded = false;
  self = 'ProjectUserProfileComponent';

  @ViewChild('phone') phoneInput: ElementRef;
  FormHelper = FormHelper;

  constructor(
    private formBuilder: FormBuilder,
    private stateService: StateService,
    private authService: AuthorizationService,
    private profileService: ProfileService,
    private notify: NotificationService,
  ) {
    this.editProfileForm = this.formBuilder.group({
      password: ['', Validators.minLength(6)],
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(FormHelper.emailPattern)]],
      phone: ['', [Validators.required, Validators.pattern(FormHelper.phonePattern)]],
      projectId: ['', Validators.required],
    });
  }

  setFormValues(): void {
    this.editProfileForm.setValue({
      password: '',
      fullName: this.projectUser.fullName,
      email: this.projectUser.email,
      phone: this.projectUser.phone,
      projectId: this.projectUser.projectId
    });
    // how its fix ??
    setTimeout(() => {
      this.phoneInput.nativeElement.dispatchEvent(new Event('input')); // fix possible bug
    }, 50);
  }

  ngOnInit() {
    this.stateService.user$.asObservable().subscribe(
      projectUser => {
        if (projectUser == null) {
          return;
        }
        this.projectUser = projectUser as ProjectUserRole;
        this.projectUser.created = new Date(this.projectUser.created).toLocaleString();
        this.projectUser.lastEdited = new Date(this.projectUser.lastEdited).toLocaleString();
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

    this.profileService.updateAdminProfile(this.editProfileForm.value).subscribe(
      response => {
        this.notify.show(response['data']);
      },
      err => {
        console.warn(err);
      }
    );
  }

}
