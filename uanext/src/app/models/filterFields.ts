export interface FilterFields {
  page?: string | number;
  pageSize?: string | number;

  moneyRequiredFrom?: string;
  moneyRequiredTo?: string;

  region?: string;

  fieldOfActivity_TODO_NAME?: string[];

  companyAgeFrom?: string;
  companyAgeTo?: string;

  employeesFrom_TODO_NAME?: string;
  employeesTo_TODO_NAME?: string;

  avgCheckFrom_TODO_NAME?: string;
  avgCheckTo_TODO_NAME?: string;

  updateRate_TODO_NAME?: string[];
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
