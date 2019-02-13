export interface VendorCompany {
  id?: string;
  name: string;
  avatar?: any; // imageData
  legalEntityName: string;
  goal: string;
  region: string;
  address: string;
  fieldOfActivity: string;
  companyAge: number;
  employeesNumber: string;
  employeesToHire: number;
  grossIncome: string;
  averageCheck: string;
  mounthlyClients: number;
  averagePrice: string;
  description: string;
  moneyRequired: string;
  investmentDescription: string;
  steps?: any; // string[];

  photos?: any; // any[]; // imageData
  videos?: any; // any[]; // unknow
  files?: any; // any[]; // fileData
}
