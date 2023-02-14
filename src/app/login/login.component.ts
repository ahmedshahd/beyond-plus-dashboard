import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  // login(userInfo: UserInfo) {
  //   this.authService.login(userInfo);
  // }
}
