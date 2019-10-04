import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { InvestorRole, AdminRole } from 'src/app/models';
import { VendorRole } from '../../models/vendorRole';
import { ProjectUserRole } from 'src/app/models/projectUserRole';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  fetchInvestor(): Observable<InvestorRole> {
    return this.http.get<any>(environment.auth + environment.investorProfile);
  }

  fetchVendor(): Observable<VendorRole> {
    return this.http.get<any>(environment.auth + environment.vendorProfile);
  }

  fetchAdmin(): Observable<AdminRole> {
    return this.http.get<any>(environment.auth + environment.adminProfile);
  }

  fetchProjectUser(): Observable<ProjectUserRole> {
    return this.http.get<any>(environment.auth + environment.projectUserProfile);
  }



  updateInvestorProfile(updatedData: any) {
    return this.http.put(environment.auth + environment.investorProfile, updatedData);
  }

  updateVendorProfile(updatedData: any) {
    return this.http.put(environment.auth + environment.vendorProfile, updatedData);
  }

  updateAdminProfile(updatedData: any) {
    return this.http.put(environment.auth + environment.adminProfile, updatedData);
  }

  updateProjectUserProfile(updatedData: any) {
    return this.http.put(environment.auth + environment.projectUserProfile, updatedData);
  }


  removeInvestorProfile() {
    return this.http.delete<any>(environment.auth + environment.investorProfile);
  }

  removeVendorProfile() {
    return this.http.delete<any>(environment.auth + environment.vendorProfile);
  }

  removeAdminProfile() {
    return this.http.delete<any>(environment.auth + environment.adminProfile);
  }

  removeProjectUseProfiler() {
    return this.http.delete<any>(environment.auth + environment.projectUserProfile);
  }
}
