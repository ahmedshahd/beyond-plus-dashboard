import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth-service.service';
import { RouteSerializerService } from './services/router-serializer-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Beyond Plus Admin Dashboard';
  isUser: Boolean = false;
  links = [
    { path: '/faq', icon: 'view_list', title: 'FAQ' },
    { path: '/label', icon: 'view_list', title: 'Label' },
    {
      path: '/termsAndConditions',
      icon: 'view_list',
      title: 'Terms And Conditions',
    },
    {
      path: '/privacyPolicy',
      icon: 'view_list',
      title: 'Privacy Policy',
    },
    { path: '/learnIcon', icon: 'view_list', title: 'Learn Icon' },
    { path: '/lineOfBusiness', icon: 'view_list', title: 'Line Of Business' },
    { path: '/welcomeScreen', icon: 'view_list', title: 'Welcome Screen' },
    { path: '/contactUs', icon: 'view_list', title: 'Contact Us' },
  ];

  medicalNetworkLinks = [
    { path: '/uploader', icon: 'cloud_upload', title: 'Uploader' },
    { path: '/tpa', icon: 'view_list', title: 'TPA' },
    {
      path: '/insuranceCompany',
      icon: 'view_list',
      title: 'Insurance Company',
    },
    {
      path: '/category',
      icon: 'view_list',
      title: 'Category',
    },
    {
      path: '/city',
      icon: 'view_list',
      title: 'City',
    },
    {
      path: '/area',
      icon: 'view_list',
      title: 'Area',
    },
    {
      path: '/providerType',
      icon: 'view_list',
      title: 'Provider Type',
    },
    {
      path: '/speciality',
      icon: 'view_list',
      title: 'Speciality',
    },
    {
      path: '/subSpeciality',
      icon: 'view_list',
      title: 'Sub Speciality',
    },
    {
      path: '/provider',
      icon: 'view_list',
      title: 'Provider',
    },
  ];

  clientLinks = [
    { path: '/clientCity', icon: 'view_list', title: 'City' },
    { path: '/clientArea', icon: 'view_list', title: 'Area' },
    // { path: '/userInfo', icon: 'view_list', title: 'UsersInfo' },
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
    private routeSerializer: RouteSerializerService
  ) {}

  logout() {
    this.router.navigateByUrl("/login")
    this.authService.SignOut();
  }
  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      if (user) {
        this.router.navigateByUrl(lastRoute);
        return (this.isUser = true);
      }
      return (this.isUser = false);
    });
    // Restore the user's last route after a page refresh
    const lastRoute = this.routeSerializer.getLastRoute();
  }
}
