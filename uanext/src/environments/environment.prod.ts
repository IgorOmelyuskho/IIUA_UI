export const environment = {
  production: true,
  signalR: 'http://proxy.alexduxa.online/notifications/api/CoordinatesHub/',
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
