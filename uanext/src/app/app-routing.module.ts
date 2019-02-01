import { VendorProfileComponent } from './components/vendor-profile/vendor-profile.component';
import { AuthGuard } from './guards/auth.guard';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { InvestorComponent } from './components/investor/investor.component';
import { VendorComponent } from './components/vendor/vendor.component';
import { InvestorProfileComponent } from './components/investor-profile/investor-profile.component';

const childInvestorRoutes: Routes = [
  { path: 'profile', component: InvestorProfileComponent },
];

const childVendorRoutes: Routes = [
  { path: 'profile', component: VendorProfileComponent },
];

const childHomeRoutes: Routes = [
  { path: 'investor', component: InvestorComponent, children: childInvestorRoutes },
  { path: 'vendor', component: VendorComponent, children: childVendorRoutes }
];

const routes: Routes = [
  { path: '', component: IndexComponent, pathMatch: 'full' },
  { path: 'signin', component: SigninComponent},
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
