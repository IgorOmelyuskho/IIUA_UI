export const environment = {
  production: true,
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
