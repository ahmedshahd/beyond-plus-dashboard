import { TpaService } from './medical-network/tpa/tpa.service';
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
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { WelcomeScreenComponent } from './welcome-screen/welcome-screen.component';
import { LearnIconComponent } from './learn-icon/learn-icon.component';
import { LineOfBusinessComponent } from './line-of-business/line-of-business.component';
import { GraphQLModule } from './graphql.module';
import { LabelComponent } from './label/label.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { UploaderComponent } from './uploader/uploader.component';
import { AuthService } from './services/auth-service.service';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { InsuranceCompanyComponent } from './medical-network/insurance-company/insurance-company.component';
import { TpaComponent } from './medical-network/tpa/tpa.component';
import { ProviderComponent } from './medical-network/provider/provider.component';
import { ProviderTypeComponent } from './medical-network/provider-type/provider-type.component';
import { CityComponent } from './medical-network/city/city.component';
import { AreaComponent } from './medical-network/area/area.component';
import { CategoryComponent } from './medical-network/category/category.component';
import { SpecialityComponent } from './medical-network/speciality/speciality.component';
import { SubSpecialityComponent } from './medical-network/sub-speciality/sub-speciality.component';
import { PrimengModule } from './primeng.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CityClientComponent } from './client/city/city.client.component';
import { AreaClientComponent } from './client/area/area.client.component';
import { UserComponent } from './client/user/user.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    PrimengModule,
    GraphQLModule,
    AngularFireModule.initializeApp(environment.FIREBASE),
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
    PrivacyPolicyComponent,
    InsuranceCompanyComponent,
    TpaComponent,
    ProviderComponent,
    ProviderTypeComponent,
    CityComponent,
    AreaComponent,
    CategoryComponent,
    SpecialityComponent,
    SubSpecialityComponent,
    CityClientComponent,
    AreaClientComponent,
    UserComponent,
  ],
  providers: [AuthService, TpaService, MessageService, ConfirmationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
