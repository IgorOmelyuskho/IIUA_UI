export const environment = {
  production: true,
  signalR: 'http://proxy.alexduxa.online/notifications/api/CoordinatesHub',
  auth: 'http://master.iiua.com.ua/auth',
  projects: 'http://master.iiua.com.ua/projects',
  map: 'http://master.iiua.com.ua/map',
  notifications: 'http://master.iiua.com.ua/notifications',
  files: 'http://todo',

  authenticate: '/api/Auth/authenticate',
  vendorRegister: '/api/Vendor/register',
  investorRegister: '/api/Investor/register',
  investorProfile: '/api/Investor/',
  vendorProfile: '/api/Vendor/',
  projectUserRegister: '/api/ProjectUser/register',
  projectUserProfile: '/api/ProjectUser/',
  adminRegister: '/api/todo/register',
  adminProfile: '/api/todo/',

  // todo add rout for files
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
