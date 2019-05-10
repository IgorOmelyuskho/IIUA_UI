import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FilterFields, FilterItemsName } from 'src/app/models';

@Component({
  selector: 'app-filter-items',
  templateUrl: './filter-items.component.html',
  styleUrls: ['./filter-items.component.scss']
})
export class FilterItemsComponent implements OnInit {
  @Output() filterItemRemove = new EventEmitter<any>();

  @Input()
  set filter(filter: FilterFields) {
    if (filter == null) {
      return;
    }
    this.setFilterItems(filter);
  }

  items: any[];

  constructor() { }

  ngOnInit() {
  }

  itemOnClick(item) {
    this.filterItemRemove.emit(item);
  }

  clearAll() {
    this.filterItemRemove.emit({name: FilterItemsName.CLEAR_ALL});
  }

  setFilterItems(filterParam: FilterFields) {
    const filterItems: any[] = [];

    if (filterParam.moneyRequiredFrom && filterParam.moneyRequiredTo) {
      filterItems.push({
        text: 'бюджет ' + filterParam.moneyRequiredFrom + ' - ' + filterParam.moneyRequiredTo + ' грн',
        name: FilterItemsName.MONEY_REQUIRED
      });
    }

    if (filterParam.region) {
      filterItems.push({
        text: filterParam.region,
        name: FilterItemsName.REGION
      });
    }

    if (filterParam.fieldOfActivity_TODO_NAME && filterParam.fieldOfActivity_TODO_NAME.length !== 0) {
      for (let i = 0; i < filterParam.fieldOfActivity_TODO_NAME.length; i++) {
        filterItems.push({
          value: filterParam.fieldOfActivity_TODO_NAME[i],
          text: filterParam.fieldOfActivity_TODO_NAME[i],
          name: FilterItemsName.FIELD_OF_ACTIVITY
        });
      }
    }

    if (filterParam.employeesFrom_TODO_NAME && filterParam.employeesTo_TODO_NAME) {
      filterItems.push({
        text: filterParam.employeesFrom_TODO_NAME + ' - ' + filterParam.employeesTo_TODO_NAME + ' сотрудника',
        name: FilterItemsName.EMPLOYEES
      });
    }

    if (filterParam.avgCheckFrom_TODO_NAME && filterParam.avgCheckTo_TODO_NAME) {
      filterItems.push({
        text: 'средний чек ' + filterParam.avgCheckFrom_TODO_NAME + ' - ' + filterParam.avgCheckTo_TODO_NAME + ' грн',
        name: FilterItemsName.AVG_CHECK
      });
    }

    if (filterParam.companyAgeFrom && filterParam.companyAgeTo) {
      filterItems.push({
        text: filterParam.companyAgeFrom + ' - ' + filterParam.companyAgeTo + ' лет',
        name: FilterItemsName.COMPANY_AGE
      });
    }

    if (filterParam.updateRate_TODO_NAME && filterParam.updateRate_TODO_NAME.length !== 0) {
      this.setUpdateRateFields(filterParam, filterItems);
    }

    this.items = filterItems;
  }

  setUpdateRateFields(filterParam, filterItems) {
    for (let i = 0; i < filterParam.updateRate_TODO_NAME.length; i++) {
      if (filterParam.updateRate_TODO_NAME[i] === 'Часто') {
        filterItems.push({
          value: filterParam.updateRate_TODO_NAME[i],
          text: 'Частые обновления',
          name: FilterItemsName.UPDATE_RATE
        });
      }

      if (filterParam.updateRate_TODO_NAME[i] === 'Средне') {
        filterItems.push({
          value: filterParam.updateRate_TODO_NAME[i],
          text: 'Средние обновления',
          name: FilterItemsName.UPDATE_RATE
        });
      }

      if (filterParam.updateRate_TODO_NAME[i] === 'Редко') {
        filterItems.push({
          value: filterParam.updateRate_TODO_NAME[i],
          text: 'Редкие обновления',
          name: FilterItemsName.UPDATE_RATE
        });
      }
    }
  }

}
