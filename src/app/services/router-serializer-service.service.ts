import { Injectable } from '@angular/core';
import { Router, NavigationEnd, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RouteSerializerService {
  // constructor(private router: Router) {}

  // saveLastRoute(urlTree: any): void {
  //   localStorage.setItem('lastRoute', this.router.serializeUrl(urlTree));
  // }

  // getLastRoute(): string {
  //   return localStorage.getItem('lastRoute') || '';
  // }
  constructor(private router: Router) {
    // Listen for navigation events and save the current route to local storage
    this.router.events.subscribe((event) => {
      // console.log('event', event);
      // console.log(
      //   'this.serializeUrl(this.router.url)',
      //   this.serializeUrl(this.router.url)
      // );
      if (event instanceof NavigationEnd) {
        localStorage.setItem('lastRoute', this.serializeUrl(this.router.url));
      }
    });
  }

  getLastRoute(): string {
    // Return the last route stored in local storage, or the default route if none is found
    return localStorage.getItem('lastRoute') || '';
  }

  private serializeUrl(url: string): string {
    const urlTree: UrlTree = this.router.createUrlTree([url]);
    return this.router.serializeUrl(urlTree);
  }
}
