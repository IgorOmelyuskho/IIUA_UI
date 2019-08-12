const domain = 'https://master.iiua.com.ua';

export const environment = {
  production: true,
  signalR: domain + '/notifications/api/CoordinatesHub',
  auth:  domain + '/auth',
  projects: domain +  '/projects',
  map:  domain + '/map',
  notifications: domain +  '/notifications',
  files: domain + '/files',
  chat: domain + '/conversations',

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

  get3DObject: '/api/Map/Get3DObject',
  post3DObject: '/api/Map/Post3DObject',
  postHistoryData: '/api/Map/PostHistoryData',
  getLastHistoryCoordinates: '/api/Map/GetLastHistoryCoordinates',
  search3DObject: '/api/Map/Search3DObject',
  mapFilteringProjects: '/api/Map/projects-filtering',

  Notification: '/api/Notification',

  getOrCreateChat: '/api/Conversations/GetOrCreateP2P',
  getAllChats: '/api/Conversations/GetAll',
  getChatById: '/api/Conversations/GetById',
  getChatByProjectId: '/api/Conversations/GetByProjectId',
  getMessagesByChatId: '/api/Messages/GetByConversationId',
  createMessage: '/api/Messages/CreateMessage',
  updateMessage: '/api/Messages/UpdateMessage'
};
