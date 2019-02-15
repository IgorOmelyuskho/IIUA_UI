export interface VendorCompany {
  id?: number;
  name: string;
  avatar?: any;
  legalEntityName: string;
  goal: string;
  region: string;
  address: string;
  fieldOfActivity: string;
  companyAge: number;
  employeesNumber: string;
  employeesToHire: number;
  grossIncome: string;
  averageCheck: number;
  mounthlyClients: number;
  averagePrice: number;
  description: string;
  moneyRequired: number;
  investmentDescription: string;
  steps?: any; // string[];

  photos?: any; // any[]; // imageData
  videos?: any; // any[]; // unknow
  files?: any; // any[]; // fileData
}
