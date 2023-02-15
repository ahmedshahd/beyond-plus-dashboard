import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isEnabledLogin: Boolean = true;

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  async onSubmit() {
    try {
      this.isEnabledLogin = false;
      const data: any = await this.authService.SignIn(
        this.loginForm.value.email,
        this.loginForm.value.password
      );
      // .then(() => {
      //   this.isEnabledLogin = true;
      //   this.loginForm.reset();
      //   this.router.navigateByUrl('/uploader');
      // });
    } catch (error) {
      this.isEnabledLogin = true;
      this.loginForm.reset();
    }
  }

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe((user) => {
      console.log('user', user);
      if (user) {
        this.router.navigateByUrl('/uploader');
      } else {
        this.router.navigateByUrl('/login');
      }
    });
  }
}
