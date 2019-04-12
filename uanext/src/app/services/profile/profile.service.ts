import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from './../../../environments/environment';
import { InvestorRole } from 'src/app/models';
import { VendorRole } from './../../models/vendorRole';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  fetchInvestor(): Observable<InvestorRole> {
    return this.http.get<InvestorRole>(environment.api_url + environment.investorProfile).pipe(
      map(response => response['data'])
    );
  }

  fetchVendor(): Observable<VendorRole> {
    return this.http.get<VendorRole>(environment.api_url + environment.vendorProfile).pipe(
      map(response => response['data'])
    );
  }

  fetchAdmin(): Observable<VendorRole> { // todo now as fetchVendor
    return this.http.get<VendorRole>(environment.api_url + environment.vendorProfile).pipe(
      map(response => response['data'])
    );
  }

  updateInvestorProfile(userId: string, updatedData: any) {
    return this.http.put(environment.api_url + environment.investorProfile + userId, updatedData);
  }

  updateVendorProfile(userId: string, updatedData: any) {
    return this.http.put(environment.api_url + environment.vendorProfile + userId, updatedData);
  }
}
