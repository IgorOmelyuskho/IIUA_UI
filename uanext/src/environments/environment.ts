// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const domain = 'https://master.iiua.com.ua';

export const environment = {
  production: false,
  signalR: domain + '/notifications/cord',
  auth: domain + '/auth',
  projects: domain + '/projects',
  map: domain + '/map',
  notifications: domain + '/notifications',
  files: domain + '/files',
  chat: domain + '/conversation',

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

  uploadFiles: '/api/Upload',

  vendorProject: '/api/Projects/',
  filteringProjects: '/api/FilteringProjects/Filtering-projects',
  sphereActivity: '/api/SphereActivity',
  changeQueuePosition: '/api/Projects/ChangeQueuePosition',
  addProjectGeoObject: '/api/Projects/AddProjectGeoObject',
  getLatestProjects: '/api/Projects/GetLatestProjects',
  getProjectById: '/api/Projects/GetProjectById',
  removeProject: '/api/Projects/',

  get3DObject: '/api/Map/Get3DObject',
  post3DObject: '/api/Map/Post3DObject',
  postHistoryData: '/api/Map/PostHistoryData',
  getLastHistoryCoordinates: '/api/Map/GetLastHistoryCoordinates',
  search3DObject: '/api/Map/Search3DObject',
  mapFilteringProjects: '/api/Map/ProjectsFiltering',
  addGeoModel: '/api/Map/addGeoModel',
  getGeoModels: '/api/Map/getGeoModels',
  updateGeoObjectSettings: '/api/Map/UpdateGeoObjectSettings',

  createAdvertising: '/api/Notification/advertising',
  notificationMessage: '/api/Notification/message',

  getOrCreateChat: '/api/Conversations/GetOrCreateP2P',
  getAllChats: '/api/Conversations/GetAll',
  getChatById: '/api/Conversations/GetById',
  getChatByProjectId: '/api/Conversations/GetByProjectId',
  getMessagesByChatId: '/api/Messages/GetByConversationId',
  createMessage: '/api/Messages/CreateMessage',
  updateMessage: '/api/Messages/UpdateMessage',
  getParticipantById: '/api/Participants/GetByParticipantId',
  getParticipantByChatId: '/api/Participants/GetByConversationId',
  getPaginationOfConversations: '/api/Conversations/GetPaginationOfConversations',
  blockConversationP2P: '/api/Conversations/BlockConversationP2P',
  unblockConversationP2P: '/api/Conversations/UnblockConversationP2P',
  updateLastReadDate: '/api/Participants/UpdateLastReadDate',
  getOrCreateHelp: '/api/Conversations/GetOrCreateHelp'
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
