import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { InvestorRole } from 'src/app/models';

@Component({
  selector: 'app-investor-profile',
  templateUrl: './investor-profile.component.html',
  styleUrls: ['./investor-profile.component.scss']
})
export class InvestorProfileComponent implements OnInit {
  profile: InvestorRole = null;
  editProfileForm: FormGroup;
  isLoaded = false;
  mask: any[] = ['+', '1', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor(private formBuilder: FormBuilder) {
    this.editProfileForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/([0-9+()-\s]){17}$/)]],
    });
  }

  ngOnInit() {
    const user = { // getLocalUser() from authService??
      token: localStorage.getItem('token'),
      // username ???
      // email ???
    };

    // this.profileService.getProfile(user).subscribe(
    //   (response: InvestorRole) => {
    //     this.profile = response,
    //     this.isLoaded = true,
    //   },
    //   (err: any) => {
    //     console.warn(err),
    //   }
    // ),
  }

  get formControls() {
    return this.editProfileForm.controls;
  }

  onSubmit() {
    if (this.editProfileForm.valid) {
      console.log(this.editProfileForm.controls);
      // this.profileService.updateProfile(this.editProfileForm.controls);
    }
  }
}
