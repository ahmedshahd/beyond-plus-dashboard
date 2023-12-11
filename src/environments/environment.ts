// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API_KEY: '2ab9c3d4e5f91ab7c3d4e5f6',
  API_URI: 'https://plus-dev.beyond-solution.com',
  // API_URI: 'http://localhost:8000',


  //Production
  AUTH0_DOMIN: 'dev-50c81431dzyp4dfe.us.auth0.com',
  AUTH0_CLIENT_ID: 'IG6B2tG117PbY3j1HwHWm5Y3o6HQttMm',

  //development
//  AUTH0_DOMIN: 'dev-50c81431dzyp4dfe.us.auth0.com',
//  AUTH0_CLIENT_ID: 'w9oHzxGe9iSXG0JwnAzmsA1JCTtl3QlT',

  FIREBASE: {
    apiKey: 'AIzaSyCahXoNVbQz7oXFK-b4kfx3Qlox5h82S3k',
    authDomain: 'rc-waba.firebaseapp.com',
    projectId: 'rc-waba',
    storageBucket: 'rc-waba.appspot.com',
    messagingSenderId: '275077301012',
    appId: '1:275077301012:web:8ab2e2abd481eefeb93801',
    measurementId: 'G-SHX76G2Y3P',
    databaseURL: 'https://rc-waba.firebaseio.com',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
