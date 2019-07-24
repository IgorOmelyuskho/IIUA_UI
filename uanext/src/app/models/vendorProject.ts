export interface VendorProject {
  id?: string;
  userId?: number;
  name: string;
  avatara?: any;
  legalEntityName: string;
  goal: string;
  region: string;
  address: string;
  sphereActivities: any[];
  companyAge: number;
  employeesNumberMin?: string;
  employeesNumberMax?: string;
  employeesToHire: number;
  grossIncome: string;
  averageCheck: number;
  mounthlyClients: number;
  averagePrice: number;
  description: string;
  moneyRequired: number;
  investmentDescription: string;
  steps?: any[];
  videos?: any[];
  images?: any[];
  files?: any[];
  rating?: string;
  queuePosition?: any;

  TEST_3D_Objects_Arr?: any[];
}
