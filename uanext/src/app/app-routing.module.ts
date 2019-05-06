import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './components';
import { VendorProjectsComponent } from './components';
import { CreateVendorCompanyComponent } from './components';
import { SigninComponent } from './components';
import { SignupComponent } from './components';
import { InvestorComponent } from './components';
import { VendorComponent } from './components';
import { InvestorProfileComponent } from './components';
import { VendorProfileComponent } from './components';
import { HomePageComponent } from './components';
import { ViewProjectComponent } from './components';
import { UpdateVendorCompanyComponent } from './components';
import { Object3dUploadComponent } from './components';
import { AdminPageComponent } from './components';
import { ViewVendorProjectsComponent } from './components';
import { AdminProfileComponent } from './components';
import { AdminSignupComponent } from './components';
import { AdminSigninComponent } from './components';
import { MainScreenComponent } from './components';

import { AuthGuard, NoAuthGuard, AdminGuard } from './services/guards';
import { InvestorGuard } from './services/guards';
import { VendorGuard } from './services/guards';

const childInvestorRoutes: Routes = [
  { path: 'profile', component: InvestorProfileComponent },
  { path: 'viewProjects', component: ViewVendorProjectsComponent },
  { path: 'project/:id', component: ViewProjectComponent },
];

const childVendorRoutes: Routes = [
  { path: 'profile', component: VendorProfileComponent },
  { path: 'projects', component: VendorProjectsComponent },
  { path: 'newProject', component: CreateVendorCompanyComponent },
  { path: 'project/:id', component: UpdateVendorCompanyComponent },
];

const childAdminRoutes: Routes = [
  { path: 'upload3dModel', component: Object3dUploadComponent },
  { path: 'profile', component: AdminProfileComponent },
  // { path: 'signup', component: AdminSignupComponent }, // sign in single route
  // { path: 'signin', component: AdminSigninComponent }, // sign in as user
];

const childHomeRoutes: Routes = [
  { path: 'investor', component: InvestorComponent, children: childInvestorRoutes },
  { path: 'vendor', component: VendorComponent, children: childVendorRoutes }
  // { path: 'investor', component: InvestorComponent, children: childInvestorRoutes, canActivate: [InvestorGuard] },
  // { path: 'vendor', component: VendorComponent, children: childVendorRoutes, canActivate: [VendorGuard] }
];

const routes: Routes = [
  { path: 'investor11', component: ViewVendorProjectsComponent },
  { path: 'main-screen', component: MainScreenComponent },
  // { path: '', component: IndexComponent, pathMatch: 'full' },
  // { path: 'signin', component: SigninComponent, canActivate: [NoAuthGuard] },
  // { path: 'signup', component: SignupComponent, canActivate: [NoAuthGuard] },
  // { path: 'home', component: HomePageComponent, children: childHomeRoutes, canActivate: [AuthGuard] },
  // { path: 'admin', component: AdminPageComponent, children: childAdminRoutes, canActivate: [AdminGuard] },
  // { path: 'adminSignup', component: AdminSignupComponent },
  // { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
