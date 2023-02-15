import { Injectable } from '@angular/core';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
// export class AuthService {
//   user: Observable<any>;
//   constructor(public afAuth: AngularFireAuth, public router: Router) {
//     this.user = this.afAuth.authState;
//   }
//   // Sign in with email/password
//   SignIn(email: string, password: string) {
//     try {
//       return this.afAuth.signInWithEmailAndPassword(email, password);
//     } catch (error) {
//       throw error;
//     }
//   }
//   // Sign up with email/password
//   SignUp(email: string, password: string) {
//     try {
//       return this.afAuth.createUserWithEmailAndPassword(email, password);
//     } catch (error) {
//       throw error;
//     }
//   }
//   // Sign out
//   SignOut() {
//     try {
//       return this.afAuth.signOut();
//     } catch (error) {
//       throw error;
//     }
//   }
// }
export class AuthService {
  private isAuthenticated = new BehaviorSubject(this.afAuth.authState || false);
  isAuthenticated$ = this.isAuthenticated.asObservable();

  constructor(public afAuth: AngularFireAuth, public router: Router) {}

  SignIn(email: string, password: string) {
    try {
      if (this.afAuth.signInWithEmailAndPassword(email, password)) {
        this.router.navigateByUrl('/uploader');
        return this.isAuthenticated.next(true);
      }
      this.isAuthenticated.next(false);
    } catch (error) {
      throw error;
    }
  }

  SignOut() {
    try {
      this.isAuthenticated.next(false);
      this.router.navigateByUrl('/login');
      return this.afAuth.signOut();
    } catch (error) {
      throw error;
    }
  }
}
