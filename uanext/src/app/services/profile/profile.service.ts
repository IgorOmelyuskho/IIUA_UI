import { StateService } from './../state/state.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { environment } from './../../../environments/environment';
import { InvestorRole } from 'src/app/models';
import { VendorRole } from './../../models/vendorRole';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient, private stateService: StateService) { }

  fetchInvestor(): Observable<InvestorRole> {
    return this.http.get<InvestorRole>(`${environment.api_url}api/Investor`).pipe(
      map(response => response['data'])
    );
  }

  fetchVendor(): Observable<VendorRole> {
    return this.http.get<VendorRole>(`${environment.api_url}api/Vendor`).pipe(
      map(response => response['data'])
    );
  }

  updateInvestorProfile(userId: string, updatedData: any) {
    return this.http.put(`${environment.api_url}api/Investor/${userId}`, updatedData);
  }

  updateVendorProfile(userId: string, updatedData: any) {
    return this.http.put(`${environment.api_url}api/Vendor/${userId}`, updatedData);
  }
}
