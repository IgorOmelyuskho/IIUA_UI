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

    if (filterParam.fieldOfActivity && filterParam.fieldOfActivity.length !== 0) {
      for (let i = 0; i < filterParam.fieldOfActivity.length; i++) {
        filterItems.push({
          value: filterParam.fieldOfActivity[i].name,
          text: filterParam.fieldOfActivity[i].name,
          name: FilterItemsName.FIELD_OF_ACTIVITY
        });
      }
    }

    if (filterParam.employeesFrom && filterParam.employeesTo) {
      filterItems.push({
        text: filterParam.employeesFrom + ' - ' + filterParam.employeesTo + ' сотрудника',
        name: FilterItemsName.EMPLOYEES
      });
    }

    if (filterParam.avgCheckFrom && filterParam.avgCheckTo) {
      filterItems.push({
        text: 'средний чек ' + filterParam.avgCheckFrom + ' - ' + filterParam.avgCheckTo + ' грн',
        name: FilterItemsName.AVG_CHECK
      });
    }

    if (filterParam.companyAgeFrom && filterParam.companyAgeTo) {
      filterItems.push({
        text: filterParam.companyAgeFrom + ' - ' + filterParam.companyAgeTo + ' лет',
        name: FilterItemsName.COMPANY_AGE
      });
    }

    if (filterParam.updateRate && filterParam.updateRate.length !== 0) {
      this.setUpdateRateFields(filterParam, filterItems);
    }

    this.items = filterItems;
  }

  setUpdateRateFields(filterParam, filterItems) {
    for (let i = 0; i < filterParam.updateRate.length; i++) {
      if (filterParam.updateRate[i].name === 'Часто') {
        filterItems.push({
          value: filterParam.updateRate[i].name,
          text: 'Частые обновления',
          name: FilterItemsName.UPDATE_RATE
        });
      }

      if (filterParam.updateRate[i].name === 'Средне') {
        filterItems.push({
          value: filterParam.updateRate[i].name,
          text: 'Средние обновления',
          name: FilterItemsName.UPDATE_RATE
        });
      }

      if (filterParam.updateRate[i].name === 'Редко') {
        filterItems.push({
          value: filterParam.updateRate[i].name,
          text: 'Редкие обновления',
          name: FilterItemsName.UPDATE_RATE
        });
      }
    }
  }

}
