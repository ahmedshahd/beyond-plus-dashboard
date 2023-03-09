import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from './../services/auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return new Promise((resolve, reject) => {
      this.authService.getCurrentUser().then(
        (user) => {
          if (user) {
            resolve(true);
          } else {
            this.router.navigate(['/login']);
            resolve(false);
          }
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
}

// import { Injectable } from '@angular/core';
// import {
//   CanActivate,
//   ActivatedRouteSnapshot,
//   RouterStateSnapshot,
//   Router,
//   UrlTree,
// } from '@angular/router';
// import { Observable } from 'rxjs';
// import { AuthService } from '../services/auth-service.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthGuard implements CanActivate {
//   constructor(private authService: AuthService, private router: Router) {}

//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ):
//     | Observable<boolean | UrlTree>
//     | Promise<boolean | UrlTree>
//     | boolean
//     | UrlTree {
//     const isAuthenticated = this.authService.getCurrentUser();
//     console.log('isAuthenticated', isAuthenticated);
//     if (isAuthenticated) {
//       return true;
//     } else {
//       // Redirect to login page with current route as query parameter
//       const returnUrl = state.url;
//       return this.router.createUrlTree(['/login'], {
//         queryParams: { returnUrl },
//       });
//     }
//   }
// }

// export class AuthGuard implements CanActivate {
//   constructor(private router: Router) {}

//   canActivate(): Observable<boolean | UrlTree> {
//     // Check if the user is logged in by implementing your own authentication logic here
//     // For example, you could check if there's a token stored in local storage or if there's a valid session cookie
//     const isLoggedIn = true; // Replace this with your authentication check

//     if (isLoggedIn) {
//       return Observable.of(true);
//     } else {
//       // If the user is not logged in, redirect to the login page
//       return this.router.navigate(['/login']).pipe(map(() => false));
//     }
//   }
// }
