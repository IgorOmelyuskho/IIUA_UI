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
      tap(vendor => {
        this.stateService.user$.next(vendor);
        this.stateService.authorized$.next(true);
      })
    );
  }

  fetchVendor(): Observable<VendorRole> {
    return this.http.get<VendorRole>(`${environment.api_url}api/Vendor`).pipe(
      tap(investor => {
        this.stateService.user$.next(investor);
        this.stateService.authorized$.next(true);
      })
    );
  }

  updateInvestorProfile(userId: string, updatedData: any) {
    // userId in query params or in body?
    return this.http.put(`${environment.api_url}api/Investor`, updatedData);
  }

  updateVendorProfile(userId: string, updatedData: any) {
    // userId in query params or in body?
    return this.http.put(`${environment.api_url}api/Vendor`, updatedData);
  }
}
