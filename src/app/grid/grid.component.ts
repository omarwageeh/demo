import { Component, OnInit } from '@angular/core';
import { MessageService, SortEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { CountryService } from '../country.service';
import { Dialog } from 'primeng/dialog';

type Country = {
  name: string;
  currencies: {} | string;
  capital: string;
  region: string;
};

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  providers: [MessageService],
})
export class GridComponent implements OnInit {
  countries!: Country[];
  loading: boolean = true;
  modal: boolean = false;
  clonedCountries: { [s: string]: any } = {};

  constructor(
    private countryService: CountryService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.countryService.getContries().subscribe((data: any) => {
      this.loading = false;
      data.forEach((country: any) => {
        country.name = country.name.common;
        if (country.currencies !== null && country.currencies !== undefined)
          country.currencies = Object.keys(country.currencies)[0].toString();
        else country.currencies = 'NULL';
      });
      this.countries = data;
    });
  }
  handleSubmit(di: Dialog, event: Event, country: Country) {
    this.modal = false;
    let countryList = this.countries.slice(0);
    countryList.push(country);
    this.countries = countryList;
  }
  toggleModal() {
    this.modal = !this.modal;
  }
  onRowDelete(index: any) {
    delete this.countries[index];

    this.countries = this.countries.filter((country) => country !== undefined);
  }
  onRowEditInit(country: any) {
    this.clonedCountries[country.id as string] = { ...country };
  }

  onRowEditSave(country: any, index: number) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Country is updated',
    });
    this.countries[index] = country;
  }
  filter(event: Event, dt: Table) {
    const value = (event.target as HTMLInputElement).value;
    return dt.filterGlobal(value, 'contains');
  }

  onRowEditCancel(country: any, index: number) {
    this.countries[index] = this.clonedCountries[country.id as string];
    delete this.clonedCountries[country.id as string];
  }
  customSort(event: SortEvent) {
    event.data?.sort((data1, data2) => {
      let value1 = data1[event.field!];
      let value2 = data2[event.field!];
      let result: any = null;

      if (value1 == null && value2 != null) result = -1;
      else if (value1 != null && value2 == null) result = 1;
      else if (value1 == null && value2 == null) result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string')
        result = value1.localeCompare(value2);
      else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

      return event.order! * result!;
    });
  }
  clear(table: Table) {
    table.clear();
  }
}
