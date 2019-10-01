export interface FilterFields {
  page?: string | number;
  pageSize?: string | number;

  coordinateFrame?: {
    upperBoundX: number,
    upperBoundY: number,
    lowerBoundX: number,
    lowerBoundY: number
  };

  projectName?: string;
  companyName?: string;

  moneyRequiredFrom?: string;
  moneyRequiredTo?: string;

  region?: string;

  sphereActivities?: { id: string, name: string }[];

  companyAgeFrom?: string;
  companyAgeTo?: string;

  employeesFrom?: string;
  employeesTo?: string;

  avgCheckFrom?: string;
  avgCheckTo?: string;

  updateRate?: string[];
}

export enum FilterItemsName {
  MONEY_REQUIRED = 'MONEY_REQUIRED',
  REGION = 'REGION',
  FIELD_OF_ACTIVITY = 'FIELD_OF_ACTIVITY',
  EMPLOYEES = 'EMPLOYEES',
  AVG_CHECK = 'AVG_CHECK',
  COMPANY_AGE = 'COMPANY_AGE',
  UPDATE_RATE = 'UPDATE_RATE',
  CLEAR_ALL = 'CLEAR_ALL'
}
