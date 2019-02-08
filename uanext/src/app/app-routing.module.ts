import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './components';
import { SigninComponent } from './components';
import { SignupComponent } from './components';
import { InvestorComponent } from './components';
import { VendorComponent } from './components';
import { InvestorProfileComponent } from './components';
import { VendorProfileComponent } from './components';
import { HomePageComponent } from './components';

import { AuthGuard } from './services/guards';
import { InvestorGuard } from './services/guards';
import { VendorGuard } from './services/guards';


const childInvestorRoutes: Routes = [
  { path: 'profile', component: InvestorProfileComponent },
];

const childVendorRoutes: Routes = [
  { path: 'profile', component: VendorProfileComponent },
];

const childHomeRoutes: Routes = [
  { path: 'investor', component: InvestorComponent, children: childInvestorRoutes, canActivate: [InvestorGuard] },
  { path: 'vendor', component: VendorComponent, children: childVendorRoutes, canActivate: [VendorGuard] }
];

const routes: Routes = [
  { path: '', component: IndexComponent, pathMatch: 'full' },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomePageComponent, children: childHomeRoutes, canActivate: [AuthGuard] },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
