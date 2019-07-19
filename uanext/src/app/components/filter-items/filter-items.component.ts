import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FilterFields, FilterItemsName } from 'src/app/models';
import { TranslateService } from 'src/app/services/translate.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-filter-items',
  templateUrl: './filter-items.component.html',
  styleUrls: ['./filter-items.component.scss']
})
export class FilterItemsComponent implements OnInit, OnDestroy {
  @Output() filterItemRemove = new EventEmitter<any>();

  @Input()
  set filter(filter: FilterFields) {
    if (filter == null) {
      return;
    }
    this.setFilterItems(filter);
  }
  self = 'FilterItemsComponent';
  items: any[];
  translateItems: any;
  subscription: Subscription;

  constructor(private translateService: TranslateService) { }

  ngOnInit() {
    this.subscription = this.translateService.filterItems.subscribe(
      val => {
        this.translateItems = val;
      }
    );
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
        text: this.translateItems.budget + ' ' + filterParam.moneyRequiredFrom + ' - ' + filterParam.moneyRequiredTo + ' грн',
        name: FilterItemsName.MONEY_REQUIRED
      });
    }

    if (filterParam.region) {
      filterItems.push({
        text: filterParam.region,
        name: FilterItemsName.REGION
      });
    }

    if (filterParam.sphereActivities && filterParam.sphereActivities.length !== 0) {
      for (let i = 0; i < filterParam.sphereActivities.length; i++) {
        filterItems.push({
          value: filterParam.sphereActivities[i].name,
          text: filterParam.sphereActivities[i].name,
          name: FilterItemsName.FIELD_OF_ACTIVITY
        });
      }
    }

    if (filterParam.employeesFrom && filterParam.employeesTo) {
      filterItems.push({
        text: filterParam.employeesFrom + ' - ' + filterParam.employeesTo + ' ' + this.translateItems.employees,
        name: FilterItemsName.EMPLOYEES
      });
    }

    if (filterParam.avgCheckFrom && filterParam.avgCheckTo) {
      filterItems.push({
        text: this.translateItems.avgCheck + ' ' + filterParam.avgCheckFrom + ' - ' + filterParam.avgCheckTo + ' грн',
        name: FilterItemsName.AVG_CHECK
      });
    }

    if (filterParam.companyAgeFrom && filterParam.companyAgeTo) {
      filterItems.push({
        text: filterParam.companyAgeFrom + ' - ' + filterParam.companyAgeTo + ' ' + this.translateItems.year,
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
      if (filterParam.updateRate[i].id === '1') {
        filterItems.push({
          value: filterParam.updateRate[i].name,
          text: filterParam.updateRate[i].name2,
          name: FilterItemsName.UPDATE_RATE
        });
      }

      if (filterParam.updateRate[i].id === '2') {
        filterItems.push({
          value: filterParam.updateRate[i].name,
          text: filterParam.updateRate[i].name2,
          name: FilterItemsName.UPDATE_RATE
        });
      }

      if (filterParam.updateRate[i].id === '3') {
        filterItems.push({
          value: filterParam.updateRate[i].name,
          text: filterParam.updateRate[i].name2,
          name: FilterItemsName.UPDATE_RATE
        });
      }
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
