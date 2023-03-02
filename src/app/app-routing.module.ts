import { SpecialityComponent } from './medical-network/speciality/speciality.component';
import { ProviderTypeComponent } from './medical-network/provider-type/provider-type.component';
import { ProviderComponent } from './medical-network/provider/provider.component';
import { AreaComponent } from './medical-network/area/area.component';
import { CityComponent } from './medical-network/city/city.component';
import { CategoryComponent } from './medical-network/category/category.component';
import { InsuranceCompanyComponent } from './medical-network/insurance-company/insurance-company.component';
import { TpaComponent } from './medical-network/tpa/tpa.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { UploaderComponent } from './uploader/uploader.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { FaqComponent } from './faq/faq.component';
import { LabelComponent } from './label/label.component';
import { LearnIconComponent } from './learn-icon/learn-icon.component';
import { LineOfBusinessComponent } from './line-of-business/line-of-business.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { WelcomeScreenComponent } from './welcome-screen/welcome-screen.component';
import { AuthGuard } from './guards/authentication.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'faq',
    component: FaqComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'label',
    component: LabelComponent,

    canActivate: [AuthGuard],
  },
  {
    path: 'contactUs',
    component: ContactUsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'uploader',
    component: UploaderComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'learnIcon',
    component: LearnIconComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'lineOfBusiness',
    component: LineOfBusinessComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'termsAndConditions',
    component: TermsAndConditionsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'privacyPolicy',
    component: PrivacyPolicyComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'welcomeScreen',
    component: WelcomeScreenComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'tpa',
    component: TpaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'insuranceCompany',
    component: InsuranceCompanyComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'category',
    component: CategoryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'city',
    component: CityComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'area',
    component: AreaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'providerType',
    component: ProviderTypeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'speciality',
    component: SpecialityComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: UploaderComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
