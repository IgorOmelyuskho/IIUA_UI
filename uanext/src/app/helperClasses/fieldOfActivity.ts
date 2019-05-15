export interface FieldActivityInterface {
  id: string;
  name: string;
  checked: boolean;
}

export const fieldActivityOptions: FieldActivityInterface[] = [
  { id: '0', name: 'Выбрать все', checked: false },
  { id: '1', name: 'Agriculture, Forestry and Fisheries', checked: false },
  { id: '2', name: 'Mining and quarrying', checked: false },
  { id: '3', name: 'Manufacturing industry', checked: false },
  { id: '4', name: 'Supply of electricity, gas, steam and air conditioning', checked: false },
  { id: '5', name: 'Water supply; sewage, waste management', checked: false },
  { id: '6', name: 'Construction', checked: false },
  { id: '7', name: 'Wholesale and retail trade; repair of motor vehicles and motorcycles', checked: false },
  { id: '8', name: 'Transport, warehousing, postal and courier activities', checked: false },
  { id: '9', name: 'Temporary placement and organization of food', checked: false },
  { id: '10', name: 'Information and telecommunications', checked: false },
];
