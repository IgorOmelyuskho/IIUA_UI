import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import FormHelper from '../../services/helperServices/formHelper';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, AfterViewInit {
  @Output() filterChange = new EventEmitter<any>();
  @Output() updateRateChange = new EventEmitter<any>();

  fieldActivityOptions = [
    { name: 'Выбрать все', checked: true },
    { name: 'Agriculture, Forestry and Fisheries', checked: true },
    { name: 'Mining and quarrying', checked: true },
    { name: 'Manufacturing industry', checked: true },
    { name: 'Supply of electricity, gas, steam and air conditioning', checked: true },
    { name: 'Water supply; sewage, waste management', checked: true },
    { name: 'Construction', checked: true },
    { name: 'Wholesale and retail trade; repair of motor vehicles and motorcycles', checked: true },
    { name: 'Transport, warehousing, postal and courier activities', checked: true },
    { name: 'Temporary placement and organization of food', checked: true },
    { name: 'Information and telecommunications', checked: true },
  ];

  FormHelper = FormHelper;

  noUiSlider: any;

  filter$: BehaviorSubject<any> = new BehaviorSubject({});

  budgetElement: any;
  budgetFromElement: any;
  budgetToElement: any;

  region = 'ALL';

  fieldOfActivity: string[] = null;

  ageElement: any;
  ageFromElement: any;
  ageToElement: any;

  employeesElement: any;
  employeesFromElement: any;
  employeesToElement: any;

  avgCheckElement: any;
  avgCheckFromElement: any;
  avgCheckToElement: any;

  updateRate = 'often';
  updateRates: any[] = [
    {
      value: 'often',
      name: 'Часто',
    },
    {
      value: 'average',
      name: 'Средне',
    },
    {
      value: 'rarely',
      name: 'Редко',
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.noUiSlider = window['noUiSlider'];
    this.initBudgetSlider();
    this.initAgeSlider();
    this.initEmployeesSlider();
    this.initAvgCheckSlider();

    this.updateRateChange.emit(this.updateRate);

    this.fieldOfActivity = this.selectedOptions();

    this.filter$
    .pipe(
      debounceTime(500),
    )
    .subscribe(
      val => {
        this.filterChange.emit(val);
      }
    );
  }

  updateRateOnChange(event) {
    this.updateRateChange.emit(event.value); // not use there this.updateRate
  }

  selectedOptions(): string[] {
    return this.fieldActivityOptions
      .filter(opt => opt.checked)
      .filter(opt => opt.name !== 'Выбрать все')
      .map(opt => opt.name);
  }

  fieldActivityChange(event) {
    if (event.target.value === 'Выбрать все') {
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
      for (let i = 0; i < this.fieldActivityOptions.length; i++) {
        if (this.fieldActivityOptions[i].name === 'Выбрать все') {
          this.fieldActivityOptions[i].checked = this.checkedAllOptions();
        }
      }
    }

    this.fieldOfActivity = this.selectedOptions();
    this.filterOnChange();
  }

  checkedAllOptions(): boolean {
    for (let i = 0; i < this.fieldActivityOptions.length; i++) {
      if (this.fieldActivityOptions[i].name === 'Выбрать все') {
        continue;
      }
      if (this.fieldActivityOptions[i].checked === false) {
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
        'min': 0,
        'max': 100000000
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
        'min': 0,
        'max': 100
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
        'min': 0,
        'max': 1000
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
        'min': 0,
        'max': 10000
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
    const filter: any = {};

    try {
      if (filter.moneyRequiredFrom !== '' && filter.moneyRequiredTo !== '') {
        filter.moneyRequiredFrom = this.budgetFromElement.value;
        filter.moneyRequiredTo = this.budgetToElement.value;
      }

      if (this.region != null && this.region !== 'ALL') {
        filter.region = this.region;
      }

      if (this.fieldOfActivity != null && this.fieldOfActivity.length !== 0) {
        filter.fieldOfActivity_TODO_NAME = this.fieldOfActivity;
      }

      if (this.ageFromElement.value !== '' && this.ageToElement.value !== '') {
        filter.companyAgeFrom = this.ageFromElement.value;
        filter.companyAgeTo = this.ageToElement.value;
      }

      if (this.employeesFromElement.value !== '' && this.employeesToElement.value !== '') {
        filter.employeesFrom_TODO_NAME = this.employeesFromElement.value;
        filter.employeesTo_TODO_NAME = this.employeesToElement.value;
      }

      if (this.avgCheckFromElement.value !== '' && this.avgCheckToElement.value !== '') {
        filter.avgCheckFrom_TODO_NAME = this.avgCheckFromElement.value;
        filter.avgCheckTo_TODO_NAME = this.avgCheckToElement.value;
      }

      // this.filterChange.emit(filter);
      this.filter$.next(filter);
    } catch (err) {
      // this.filterChange.emit(filter);
      this.filter$.next(filter);
    }
  }

}
