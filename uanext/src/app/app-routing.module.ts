import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent, VendorProjectsComponent, CreateVendorCompanyComponent } from './components';
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
import { ViewVendorProjectsComponent } from './components/view-vendor-projects/view-vendor-projects.component';
import { AdminProfileComponent } from './components';

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
  { path: 'profile', component: AdminProfileComponent }
];

const childHomeRoutes: Routes = [
  { path: 'investor', component: InvestorComponent, children: childInvestorRoutes, canActivate: [InvestorGuard] },
  { path: 'vendor', component: VendorComponent, children: childVendorRoutes, canActivate: [VendorGuard] }
];

const routes: Routes = [
  { path: '', component: IndexComponent, pathMatch: 'full' },
  { path: 'signin', component: SigninComponent, canActivate: [NoAuthGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [NoAuthGuard] },
  { path: 'home', component: HomePageComponent, children: childHomeRoutes, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminPageComponent, children: childAdminRoutes, canActivate: [AdminGuard] },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
