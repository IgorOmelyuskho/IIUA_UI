import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDto } from './../../models/userDto';
import { InvestorRole } from './../../models/investorRole';
import { Component, OnInit } from '@angular/core';
import { VendorRole } from 'src/app/models/vendorRole';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  profile: VendorRole | InvestorRole = null;
  editProfileForm: FormGroup;
  isLoaded = false;
  mask: any[] = ['+', '1', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

  constructor(private formBuilder: FormBuilder, private profileService: ProfileService) {
    this.editProfileForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/([0-9+()-\s]){17}$/)]],
    });
  }

  ngOnInit() {
    const user = {
      token: localStorage.getItem('token'),
      // username ???
      // email ???
    };

    setTimeout(() => { // ITS TEST
      this.profile = {
        fullName: 'string',
        email: 'string@ghj.com',
        // phone: '1234567890',
        phone: '+1 (123) 456-7890',
        created: 'string',
        lastEdited: 'string',
        phoneVerified: 'boolean',
        emailVerified: 'boolean',
        Itn: 'string',
        ItnVerified: 'boolean'
      };
      this.editProfileForm.setValue({
        fullName: this.profile.fullName,
        email: this.profile.email,
        phone: this.profile.phone
      });
      this.isLoaded = true;
    }, 3000);



    // this.profileService.getProfile(user).subscribe(
    //   (response: VendorRole | InvestorRole) => {
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
    }
  }

}

