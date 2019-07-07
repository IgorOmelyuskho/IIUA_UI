import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent, ProjectUserPageComponent, ProjectUserProfileComponent, ProjectUserSignupComponent,
  EmailValidateComponent, PasswordRecoveryComponent, ConfirmPasswordRecoveryComponent,
  PrivacyPolicyComponent, UserAgreementComponent } from './components';
import { VendorProjectsComponent } from './components';
import { CreateVendorProjectComponent } from './components';
import { SigninComponent } from './components';
import { SignupComponent } from './components';
import { InvestorComponent } from './components';
import { VendorComponent } from './components';
import { InvestorProfileComponent } from './components';
import { VendorProfileComponent } from './components';
import { HomePageComponent } from './components';
import { ViewProjectComponent } from './components';
import { UpdateVendorProjectComponent } from './components';
import { Object3dUploadComponent } from './components';
import { AdminPageComponent } from './components';
import { InvestorFilterPageComponent } from './components';
import { AdminProfileComponent } from './components';
import { AdminSignupComponent } from './components';
import { MainScreenInvestorComponent } from './components';
import { MainScreenVendorComponent } from './components';
import { MapComponent } from './components';

import { AuthGuard, NoAuthGuard, AdminGuard } from './services/guards';
import { InvestorGuard } from './services/guards';
import { VendorGuard } from './services/guards';
import { ProjectUserGuard } from './services/guards/project-user.guard';

const childInvestorRoutes: Routes = [
  { path: '', redirectTo: 'main-page', pathMatch: 'full' },
  { path: 'profile', component: InvestorProfileComponent },
  { path: 'viewProjects', component: InvestorFilterPageComponent },
  { path: 'project/:id', component: ViewProjectComponent },
  { path: 'main-page', component: MainScreenInvestorComponent },
];

const childVendorRoutes: Routes = [
  { path: '', redirectTo: 'main-page', pathMatch: 'full' },
  { path: 'profile', component: VendorProfileComponent },
  { path: 'projects', component: VendorProjectsComponent },
  { path: 'newProject', component: CreateVendorProjectComponent },
  { path: 'project/:id', component: UpdateVendorProjectComponent },
  { path: 'main-page', component: MainScreenVendorComponent },
];

const childAdminRoutes: Routes = [
  { path: '', redirectTo: 'profile', pathMatch: 'full' },
  { path: 'upload3dModel', component: Object3dUploadComponent, canActivate: [AdminGuard] },
  { path: 'profile', component: AdminProfileComponent, canActivate: [AdminGuard] },
  { path: 'signup', component: AdminSignupComponent },
];

const childProjectUserRoutes: Routes = [
  { path: '', redirectTo: 'profile', pathMatch: 'full' },
  { path: 'profile', component: ProjectUserProfileComponent, canActivate: [ProjectUserGuard] },
  { path: 'signup', component: ProjectUserSignupComponent },
];

const childHomeRoutes: Routes = [
  { path: 'investor', component: InvestorComponent, children: childInvestorRoutes, canActivate: [InvestorGuard] },
  { path: 'vendor', component: VendorComponent, children: childVendorRoutes, canActivate: [VendorGuard] }
];

const routes: Routes = [
  { path: 'investor_test', component: InvestorFilterPageComponent },
  { path: 'main-screen_test', component: InvestorComponent, children: childInvestorRoutes },
  { path: 'map_test', component: MapComponent },
  { path: 'main-screen_vendor_test', component: VendorComponent, children: childVendorRoutes},


  { path: '', component: IndexComponent, pathMatch: 'full' },
  { path: 'signin', component: SigninComponent, canActivate: [NoAuthGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [NoAuthGuard] },
  { path: 'home', component: HomePageComponent, children: childHomeRoutes, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminPageComponent, children: childAdminRoutes },
  { path: 'projectUser', component: ProjectUserPageComponent, children: childProjectUserRoutes },
  { path: 'email-validate/:code', component: EmailValidateComponent },
  { path: 'password-recovery', component: PasswordRecoveryComponent },
  { path: 'password-recovery/:code', component: ConfirmPasswordRecoveryComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'user-agreement', component: UserAgreementComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
