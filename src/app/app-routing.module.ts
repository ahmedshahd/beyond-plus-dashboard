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

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'label', component: LabelComponent },
  { path: 'contactUs', component: ContactUsComponent },
  { path: 'uploader', component: UploaderComponent },

  { path: 'learnIcon', component: LearnIconComponent },
  { path: 'lineOfBusiness', component: LineOfBusinessComponent },
  { path: 'termsAndConditions', component: TermsAndConditionsComponent },
  { path: 'welcomeScreen', component: WelcomeScreenComponent },

  { path: '**', redirectTo: '/uploader' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
