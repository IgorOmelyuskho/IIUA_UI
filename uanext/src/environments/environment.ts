// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  signalR: 'https://proxy.alexduxa.online/notifications/api/CoordinatesHub',
  auth: 'https://master.iiua.com.ua/auth',
  projects: 'https://master.iiua.com.ua/projects',
  map: 'https://master.iiua.com.ua/map',
  notifications: 'https://master.iiua.com.ua/notifications',
  files: 'https://master.iiua.com.ua/files',

  authenticate: '/api/Auth/authenticate',
  vendorRegister: '/api/Vendor/register',
  investorRegister: '/api/Investor/register',
  investorProfile: '/api/Investor/',
  vendorProfile: '/api/Vendor/',
  projectUserRegister: '/api/ProjectUser/register',
  projectUserProfile: '/api/ProjectUser/',
  emailValidate: '/validate/',
  passwordRecovery: '/api/PasswordRecovery/',
  passwordRecovery_2: '/api/PasswordRecovery/recovery/',
  adminRegister: '/api/todo/register',
  adminProfile: '/api/todo/',

  socialAuthVendor: '/api/SocialAuth/social-vendor',
  socialAuthInvestor: '/api/SocialAuth/social-investor',
  socialAuth: '/api/SocialAuth/social-auth',

  vendorProject: '/api/Projects/',
  // uploadImages: '/api/Image/',
  uploadFiles: '/api/Upload',
  // uploadVideos: '/api/Videos',
  filteringProjects: '/api/FilteringProjects',

  get3DObject: '/api/Map/Get3DObject',
  post3DObject: '/api/Map/Post3DObject',
  postHistoryData: '/api/Map/PostHistoryData',
  getLastHistoryCoordinates: '/api/Map/GetLastHistoryCoordinates',
  search3DObject: '/api/Map/Search3DObject',

  Notification: '/api/Notification'
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
