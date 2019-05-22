
export interface UpdateRateInterface {
  id: string;
  name: string;
  checked: boolean;
}

export const updateRateOptions: UpdateRateInterface[] = [
  { id: '0', name: 'Выбрать все', checked: false },
  { id: '1', name: 'Часто', checked: false },
  { id: '2', name: 'Средне', checked: false },
  { id: '3', name: 'Редко', checked: false },
];

