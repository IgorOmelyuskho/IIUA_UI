// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  signalR: 'http://proxy.alexduxa.online/notifications/chatHub',
  auth: 'http://proxy.alexduxa.online/auth',
  projects: 'http://proxy.alexduxa.online/projects',
  map: 'http://proxy.alexduxa.online/map',
  notifications: 'http://proxy.alexduxa.online/notifications',

  authenticate: '/api/Auth/authenticate',
  vendorRegister: '/api/Vendor/register',
  investorRegister: '/api/Investor/register',
  investorProfile: '/api/Investor/',
  vendorProfile: '/api/Vendor/',
  projectUserRegister: '/api/ProjectUser/register',
  projectUserProfile: '/api/ProjectUser/',
  adminRegister: '/api/todo/register',
  adminProfile: '/api/todo/',

  vendorProject: '/api/Projects/',
  uploadImages: '/api/Image/',
  uploadFiles: '/api/File/',
  uploadVideos: '/api/Videos',
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
