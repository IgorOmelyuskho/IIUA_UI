import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter, OnChanges } from '@angular/core';
import FormHelper from '../../services/helperServices/formHelper';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, throttleTime, distinctUntilChanged } from 'rxjs/operators';
import { FilterFields, FilterItemsName } from 'src/app/models';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, AfterViewInit {
  @Output() filterChange = new EventEmitter<any>();

  @Input()
  set filterItemForRemove(itemForReset: any) {
    console.log('CHANGE INPUT');
    this.resetItem(itemForReset);
  }

  fieldActivityOptions = [
    { name: 'Выбрать все', checked: false },
    { name: 'Agriculture, Forestry and Fisheries', checked: false },
    { name: 'Mining and quarrying', checked: false },
    { name: 'Manufacturing industry', checked: false },
    { name: 'Supply of electricity, gas, steam and air conditioning', checked: false },
    { name: 'Water supply; sewage, waste management', checked: false },
    { name: 'Construction', checked: false },
    { name: 'Wholesale and retail trade; repair of motor vehicles and motorcycles', checked: false },
    { name: 'Transport, warehousing, postal and courier activities', checked: false },
    { name: 'Temporary placement and organization of food', checked: false },
    { name: 'Information and telecommunications', checked: false },
  ];

  updateRateOptions = [
    { name: 'Выбрать все', checked: false },
    { name: 'Часто', checked: false },
    { name: 'Средне', checked: false },
    { name: 'Редко', checked: false },
  ];

  FormHelper = FormHelper;

  noUiSlider: any;

  filter$: BehaviorSubject<FilterFields> = new BehaviorSubject(null);

  budgetElement: any;
  budgetFromElement: any;
  budgetToElement: any;
  budgetMin = 0;
  budgetMax = 100000000;

  region = 'ALL';

  fieldOfActivity: string[] = null;

  updateRate: string[] = null;

  ageElement: any;
  ageFromElement: any;
  ageToElement: any;
  ageMin = 0;
  ageMax = 100;

  employeesElement: any;
  employeesFromElement: any;
  employeesToElement: any;
  employeesMin = 0;
  employeesMax = 1000;

  avgCheckElement: any;
  avgCheckFromElement: any;
  avgCheckToElement: any;
  avgCheckMin = 0;
  avgCheckMax = 10000;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.noUiSlider = window['noUiSlider'];
    this.initBudgetSlider();
    this.initAgeSlider();
    this.initEmployeesSlider();
    this.initAvgCheckSlider();

    this.fieldOfActivity = this.selectedFieldOfActivity();

    this.filter$
      .pipe(
        debounceTime(10), // use for performance, not use big value - (slow filter item)
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)) // fix bug
      )
      .subscribe(
        val => {
          this.filterChange.emit(val);
        }
      );
  }

  resetItem(itemForReset: any) {
    if (itemForReset == null) {
      console.log('itemForReset == NULL');
      return;
    }

    if (itemForReset === FilterItemsName.CLEAR_ALL) {
      this.resetAll();
    }

    if (itemForReset.name === FilterItemsName.MONEY_REQUIRED) {
      this.moneyRequiredReset();
    }

    if (itemForReset.name === FilterItemsName.REGION) {
      this.regionReset();
    }

    if (itemForReset.name === FilterItemsName.FIELD_OF_ACTIVITY) {
      this.fieldOfActivityReset(itemForReset);
    }

    if (itemForReset.name === FilterItemsName.EMPLOYEES) {
      this.employeesReset();
    }

    if (itemForReset.name === FilterItemsName.AVG_CHECK) {
      this.avgCheckReset();
    }

    if (itemForReset.name === FilterItemsName.COMPANY_AGE) {
      this.companyAgeReset();
    }

    if (itemForReset.name === FilterItemsName.UPDATE_RATE) {
      this.updateRateReset(itemForReset);
    }
  }

  resetAll() {
    console.log('RESET ALL');
    this.fieldOfActivityResetAll();
    this.updateRateResetAll();
    this.moneyRequiredReset();
    this.regionReset();
    this.employeesReset();
    this.avgCheckReset();
    this.companyAgeReset();
  }

  moneyRequiredReset() {
    this.budgetToElement.value = this.budgetMax;
    this.budgetFromElement.value = this.budgetMin;
    this.budgetElement.noUiSlider.set([this.budgetMin, null]);
    this.budgetElement.noUiSlider.set([null, this.budgetMax]);
  }

  regionReset() {
    this.region = 'ALL';
    this.filterOnChange();
  }

  fieldOfActivityReset(forReset: any) {
    this.fieldActivityOptions[0].checked = false;

    for (let i = 0; i < this.fieldActivityOptions.length; i++) {
      if (forReset.value === this.fieldActivityOptions[i].name) {
        this.fieldActivityOptions[i].checked = false;
        this.fieldOfActivity = this.selectedFieldOfActivity();
        this.filterOnChange();
        return;
      }
    }
  }

  fieldOfActivityResetAll() {
    for (let i = 0; i < this.fieldActivityOptions.length; i++) {
      this.fieldActivityOptions[i].checked = false;
    }

    this.fieldOfActivity = this.selectedFieldOfActivity();
    this.filterOnChange();
  }

  employeesReset() {
    this.employeesToElement.value = this.employeesMax;
    this.employeesFromElement.value = this.employeesMin;
    this.employeesElement.noUiSlider.set([this.employeesMin, null]);
    this.employeesElement.noUiSlider.set([null, this.employeesMax]);
  }

  avgCheckReset() {
    this.avgCheckToElement.value = this.avgCheckMax;
    this.avgCheckFromElement.value = this.avgCheckMin;
    this.avgCheckElement.noUiSlider.set([this.avgCheckMin, null]);
    this.avgCheckElement.noUiSlider.set([null, this.avgCheckMax]);
  }

  companyAgeReset() {
    this.ageToElement.value = this.ageMax;
    this.ageFromElement.value = this.ageMin;
    this.ageElement.noUiSlider.set([this.ageMin, null]);
    this.ageElement.noUiSlider.set([null, this.ageMax]);
  }

  updateRateReset(forReset: any) {
    this.updateRateOptions[0].checked = false;

    for (let i = 0; i < this.updateRateOptions.length; i++) {
      if (forReset.value === this.updateRateOptions[i].name) {
        this.updateRateOptions[i].checked = false;
        this.updateRate = this.selectedUpdateRate();
        this.filterOnChange();
        return;
      }
    }
  }

  updateRateResetAll() {
    for (let i = 0; i < this.updateRateOptions.length; i++) {
      this.updateRateOptions[i].checked = false;
    }

    this.updateRate = this.selectedUpdateRate();
    this.filterOnChange();
  }





  selectedFieldOfActivity(): string[] {
    return this.fieldActivityOptions
      .filter(opt => opt.checked)
      .filter(opt => opt.name !== this.fieldActivityOptions[0].name)
      .map(opt => opt.name);
  }

  fieldActivityChange(event) {
    if (event.target.value === this.fieldActivityOptions[0].name) {
      if (event.target.checked === true) {
        for (let i = 0; i < this.fieldActivityOptions.length; i++) {
          this.fieldActivityOptions[i].checked = true;
        }
      } else {
        for (let i = 0; i < this.fieldActivityOptions.length; i++) {
          this.fieldActivityOptions[i].checked = false;
        }
      }
    } else {
      this.fieldActivityOptions[0].checked = this.checkedAllFieldOfActivityOptions();
    }

    this.fieldOfActivity = this.selectedFieldOfActivity();
    this.filterOnChange();
  }

  checkedAllFieldOfActivityOptions(): boolean {
    for (let i = 1; i < this.fieldActivityOptions.length; i++) {
      if (this.fieldActivityOptions[i].checked === false) {
        return false;
      }
    }

    return true;
  }

  selectedUpdateRate(): string[] {
    return this.updateRateOptions
      .filter(opt => opt.checked)
      .filter(opt => opt.name !== this.updateRateOptions[0].name)
      .map(opt => opt.name);
  }

  updateRateChange(event) {
    if (event.target.value === this.updateRateOptions[0].name) {
      if (event.target.checked === true) {
        for (let i = 0; i < this.updateRateOptions.length; i++) {
          this.updateRateOptions[i].checked = true;
        }
      } else {
        for (let i = 0; i < this.updateRateOptions.length; i++) {
          this.updateRateOptions[i].checked = false;
        }
      }
    } else {
      this.updateRateOptions[0].checked = this.checkedAllUpdateRateOptions();
    }

    this.updateRate = this.selectedUpdateRate();
    this.filterOnChange();
  }

  checkedAllUpdateRateOptions(): boolean {
    for (let i = 1; i < this.updateRateOptions.length; i++) {
      if (this.updateRateOptions[i].checked === false) {
        return false;
      }
    }

    return true;
  }




  initBudgetSlider() {
    this.budgetElement = document.getElementById('budget-range');
    this.budgetFromElement = document.getElementById('budget-from');
    this.budgetToElement = document.getElementById('budget-to');

    this.noUiSlider.create(this.budgetElement, {
      start: [0, 30000000],
      connect: true,
      range: {
        'min': this.budgetMin,
        'max': this.budgetMax
      }
    });

    this.budgetElement.noUiSlider.on('update', (values, handle) => {
      const value = values[handle];
      if (handle) {
        this.budgetToElement.value = Math.round(value);
      } else {
        this.budgetFromElement.value = Math.round(value);
      }

      this.filterOnChange();
    });

    this.budgetFromElement.addEventListener('input', () => {
      this.budgetElement.noUiSlider.set([this.budgetFromElement.value, null]);
    });

    this.budgetToElement.addEventListener('input', () => {
      this.budgetElement.noUiSlider.set([null, this.budgetToElement.value]);
    });
  }

  initAgeSlider() {
    this.ageElement = document.getElementById('age-range');
    this.ageFromElement = document.getElementById('age-from');
    this.ageToElement = document.getElementById('age-to');

    this.noUiSlider.create(this.ageElement, {
      start: [0, 50],
      connect: true,
      range: {
        'min': this.ageMin,
        'max': this.ageMax
      }
    });

    this.ageElement.noUiSlider.on('update', (values, handle) => {
      const value = values[handle];
      if (handle) {
        this.ageToElement.value = Math.round(value);
      } else {
        this.ageFromElement.value = Math.round(value);
      }

      this.filterOnChange();
    });

    this.ageFromElement.addEventListener('input', () => {
      this.ageElement.noUiSlider.set([this.ageFromElement.value, null]);
    });

    this.ageToElement.addEventListener('input', () => {
      this.ageElement.noUiSlider.set([null, this.ageToElement.value]);
    });
  }

  initEmployeesSlider() {
    this.employeesElement = document.getElementById('employees-range');
    this.employeesFromElement = document.getElementById('employees-from');
    this.employeesToElement = document.getElementById('employees-to');

    this.noUiSlider.create(this.employeesElement, {
      start: [0, 500],
      connect: true,
      range: {
        'min': this.employeesMin,
        'max': this.employeesMax
      }
    });

    this.employeesElement.noUiSlider.on('update', (values, handle) => {
      const value = values[handle];
      if (handle) {
        this.employeesToElement.value = Math.round(value);
      } else {
        this.employeesFromElement.value = Math.round(value);
      }

      this.filterOnChange();
    });

    this.employeesFromElement.addEventListener('input', () => {
      this.employeesElement.noUiSlider.set([this.employeesFromElement.value, null]);
    });

    this.employeesToElement.addEventListener('input', () => {
      this.employeesElement.noUiSlider.set([null, this.employeesToElement.value]);
    });
  }

  initAvgCheckSlider() {
    this.avgCheckElement = document.getElementById('avg-check-range');
    this.avgCheckFromElement = document.getElementById('avg-check-from');
    this.avgCheckToElement = document.getElementById('avg-check-to');

    this.noUiSlider.create(this.avgCheckElement, {
      start: [0, 1000],
      connect: true,
      range: {
        'min': this.avgCheckMin,
        'max': this.avgCheckMax
      }
    });

    this.avgCheckElement.noUiSlider.on('update', (values, handle) => {
      const value = values[handle];
      if (handle) {
        this.avgCheckToElement.value = Math.round(value);
      } else {
        this.avgCheckFromElement.value = Math.round(value);
      }

      this.filterOnChange();
    });

    this.avgCheckFromElement.addEventListener('input', () => {
      this.avgCheckElement.noUiSlider.set([this.avgCheckFromElement.value, null]);
    });

    this.avgCheckToElement.addEventListener('input', () => {
      this.avgCheckElement.noUiSlider.set([null, this.avgCheckToElement.value]);
    });
  }



  filterOnChange(): void {
    const filter: FilterFields = {};

    try { // todo
      if (
        this.budgetFromElement.value !== '' && // todo remove ?
        this.budgetToElement.value !== '' && // todo remove ?
        !(this.budgetFromElement.value === this.budgetMin.toString() &&
          this.budgetToElement.value === this.budgetMax.toString()
        )
      ) {
        filter.moneyRequiredFrom = this.budgetFromElement.value;
        filter.moneyRequiredTo = this.budgetToElement.value;
      }

      if (this.region != null && this.region !== 'ALL') {
        filter.region = this.region;
      }

      if (this.fieldOfActivity != null && this.fieldOfActivity.length !== 0) {
        filter.fieldOfActivity_TODO_NAME = this.fieldOfActivity;
      }

      if (this.updateRate != null && this.updateRate.length !== 0) {
        filter.updateRate_TODO_NAME = this.updateRate;
      }

      if (
        this.ageFromElement.value !== '' &&
        this.ageToElement.value !== '' &&
        !(this.ageFromElement.value === this.ageMin.toString() &&
          this.ageToElement.value === this.ageMax.toString()
        )
      ) {
        filter.companyAgeFrom = this.ageFromElement.value;
        filter.companyAgeTo = this.ageToElement.value;
      }

      if (
        this.employeesFromElement.value !== '' &&
        this.employeesToElement.value !== '' &&
        !(this.employeesFromElement.value === this.employeesMin.toString() &&
          this.employeesToElement.value === this.employeesMax.toString()
        )
      ) {
        filter.employeesFrom_TODO_NAME = this.employeesFromElement.value;
        filter.employeesTo_TODO_NAME = this.employeesToElement.value;
      }

      if (
        this.avgCheckFromElement.value !== '' &&
        this.avgCheckToElement.value !== '' &&
        !(this.avgCheckFromElement.value === this.avgCheckMin.toString() &&
          this.avgCheckToElement.value === this.avgCheckMax.toString()
        )
      ) {
        filter.avgCheckFrom_TODO_NAME = this.avgCheckFromElement.value;
        filter.avgCheckTo_TODO_NAME = this.avgCheckToElement.value;
      }

      console.log(filter);
      // this.filterChange.emit(filter);
      this.filter$.next(filter);
    } catch (err) {
      console.log(filter);
      // this.filterChange.emit(filter);
      this.filter$.next(filter);
    }
  }

}