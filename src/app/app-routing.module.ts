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
import { AuthenticationGuard } from './guards/authentication.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'faq',
    component: FaqComponent,
    //  canActivate: [AuthenticationGuard]
  },
  {
    path: 'label',
    component: LabelComponent,

    // canActivate: [AuthenticationGuard],
  },
  {
    path: 'contactUs',
    component: ContactUsComponent,
    // canActivate: [AuthenticationGuard],
  },
  {
    path: 'uploader',
    component: UploaderComponent,
    // canActivate: [AuthenticationGuard],
  },

  {
    path: 'learnIcon',
    component: LearnIconComponent,
    // canActivate: [AuthenticationGuard],
  },
  {
    path: 'lineOfBusiness',
    component: LineOfBusinessComponent,
    // canActivate: [AuthenticationGuard],
  },
  {
    path: 'termsAndConditions',
    component: TermsAndConditionsComponent,
    // canActivate: [AuthenticationGuard],
  },
  {
    path: 'welcomeScreen',
    component: WelcomeScreenComponent,
    // canActivate: [AuthenticationGuard],
  },
  // {
  //   path: '',
  //   component: UploaderComponent,
  //   canActivate: [AuthenticationGuard],
  // },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
