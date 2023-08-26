import { SubSpecialityComponent } from './medical-network/sub-speciality/sub-speciality.component';
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
import {  RouterModule, Routes } from '@angular/router';

import { FaqComponent } from './faq/faq.component';
import { LabelComponent } from './label/label.component';
import { LearnIconComponent } from './learn-icon/learn-icon.component';
import { LineOfBusinessComponent } from './line-of-business/line-of-business.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { WelcomeScreenComponent } from './welcome-screen/welcome-screen.component';
import { CityClientComponent } from './client/city/city.client.component';
import { AreaClientComponent } from './client/area/area.client.component';
// import { UserComponent } from './client/user/user.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { WellnesTipComponent } from './client/wellnes-tip/wellnes-tip.component';
import { HealthCareComponent } from './client/health-care/health-care.component';
import { NotificationsComponent } from './client/notifications/notifications.component';

const routes: Routes = [
  {
    path: '',
    component: UploaderComponent,
    canActivate: [AuthGuard],
  },
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
    path: 'subSpeciality',
    component: SubSpecialityComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'provider',
    component: ProviderComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'userWellnessTip',
    component: WellnesTipComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'userHealthCare',
    component: HealthCareComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'clientCity',
    component: CityClientComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'clientArea',
    component: AreaClientComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'notifications',
    component: NotificationsComponent,
    canActivate: [AuthGuard],
  },
  // {
  //   path: 'userInfo',
  //   component: UserComponent,
  //   canActivate: [AuthGuard],
  // },

  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
