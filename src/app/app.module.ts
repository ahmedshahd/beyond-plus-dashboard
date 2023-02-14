import { FaqComponent } from './faq/faq.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from './material.module';
import { AuthService } from './shared/services/auth/auth.service';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { WelcomeScreenComponent } from './welcome-screen/welcome-screen.component';
import { LearnIconComponent } from './learn-icon/learn-icon.component';
import { LineOfBusinessComponent } from './line-of-business/line-of-business.component';
import { GraphQLModule } from './graphql.module';
import { LabelComponent } from './label/label.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { UploaderComponent } from './uploader/uploader.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    GraphQLModule,
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    FaqComponent,
    LabelComponent,
    TermsAndConditionsComponent,
    WelcomeScreenComponent,
    LearnIconComponent,
    LineOfBusinessComponent,
    ContactUsComponent,
    UploaderComponent,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
