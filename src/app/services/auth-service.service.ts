import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import {  Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: Observable<any>;
  constructor(public afAuth: AngularFireAuth, public router: Router) {
    this.user = this.afAuth.authState;
  }
  // Sign in with email/password
  SignIn(email: string, password: string) {
    try {
      return this.afAuth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      throw error;
    }
  }
  // Sign up with email/password
  SignUp(email: string, password: string) {
    try {
      return this.afAuth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      throw error;
    }
  }
  // Sign out
  SignOut() {
    try {
      return this.afAuth.signOut();
    } catch (error) {
      throw error;
    }
  }

  // getCurrentUser(): Promise<any> {
  //   return this.afAuth.currentUser;
  // }
}
