import { Component, OnInit } from '@angular/core';
import { MessageService, SortEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { CountryService } from '../country.service';
import { Dialog } from 'primeng/dialog';

type Country = {
  name: string;
  currencies: string;
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
  handleSubmit = (country: Country) => {
    let countryList = this.countries.slice(0);
    countryList.push(country);
    this.countries = [...countryList];
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Country is added',
    });
  };
  closeModal = () => {
    this.modal = true;
  };
  onRowDelete(index: any) {
    delete this.countries[index];
    this.countries = this.countries.filter((country) => country !== undefined);
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Country is deleted',
    });
  }
  // onRowEditInit(country: any) {
  //   this.clonedCountries[country.id as string] = { ...country };
  // }

  onRowEditSave(country: any, index: number) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Country is updated',
    });
    //Dont need to do this step as country itself is a reference to the original
    //on in the array and so when it is changed in the table it is changed in the array
    //this.countries[index] = country;
  }

  // onRowEditCancel(country: any, index: number) {
  //   this.countries[index] = this.clonedCountries[country.id as string];
  //   delete this.clonedCountries[country.id as string];
  // }

  filter(event: Event, dt: Table) {
    const value = (event.target as HTMLInputElement).value;
    return dt.filterGlobal(value, 'contains');
  }

  clear(table: Table) {
    table.clear();
  }
}
