import { Component } from '@angular/core';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { CityClientService } from './city.client.service';

@Component({
  selector: 'app-city.client',
  templateUrl: './city.client.component.html',
  styleUrls: ['./city.client.component.scss'],
})
export class CityClientComponent {
  createDialog: boolean;
  editDialog: boolean;
  cities: any;

  city: any;

  editId: number;

  selectedCities: any;

  submitted: boolean;

  languageOptions: SelectItem[] = [
    { label: 'English', value: 'ENGLISH' },
    { label: 'Arabic', value: 'ARABIC' },
  ];
  selectedLanguage: any = { label: 'English', value: 'ENGLISH' };

  constructor(
    private cityService: CityClientService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.cityService
      .getCities(this.selectedLanguage.value)
      .subscribe(({ data, error }: any) => {
        if (data) {
          console.log('data', data);
          this.cities = data.listAllClientCities.clientCity;
          console.log('this.cities', this.cities);
          this.messageService.add({
            severity: 'success',
            summary: 'City data loaded successfully',
            life: 1000,
          });
        } else {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error loading City data',
            life: 1000,
          });
        }
      });
  }

  onSearchInputChange(event) {
    const name = event.target.value;
    console.log('name', name);
    this.cityService
      .getCities(this.selectedLanguage.value, name)
      .subscribe(({ data, error }: any) => {
        if (data) {
          console.log('search data', data);
          this.cities = data.listAllClientCities.clientCity;
        } else {
          console.log(error);
        }
      });
  }

  onLanguageChange() {
    console.log('this.selectedLanguage.value', this.selectedLanguage.value);
    this.cityService
      .getCities(this.selectedLanguage.value)
      .subscribe(({ data, error }: any) => {
        if (data) {
          this.cities = data.listAllClientCities.clientCity;
          this.messageService.add({
            severity: 'success',
            summary: 'City data loaded successfully',
          });
        } else {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error loading City data',
          });
        }
      });
  }

  openNew() {
    this.city = {};
    this.submitted = false;
    this.createDialog = true;
  }

  editCity(city: any) {
    this.city = {
      language: city.language,
      name: city.name,
    };
    this.editDialog = true;
    this.editId = city.id;
  }

  updateCity(city) {
    this.cityService
      .updateCity(this.editId, city.language, city.name)
      .subscribe(
        (data) => {
          this.editDialog = false;
          this.editId = undefined;
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'City Updated',
            life: 1000,
          });
        },
        (error) => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error Updating City ',
            life: 1000,
          });
        }
      );
  }

  deleteCity(city: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + city.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.cityService.removeCity(city.id, city.language).subscribe(
          (data) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'City Deleted',
              life: 1000,
            });
          },
          (error) => {
            console.log(error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error Deleting City ',
              life: 1000,
            });
          }
        );
      },
    });
  }

  hideDialog() {
    this.createDialog = false;
    this.editDialog = false;
    this.submitted = false;
  }

  addCity() {
    this.submitted = true;
    this.cityService.createCity(this.city.name, this.city.language).subscribe(
      (data) => {
        this.createDialog = false;
        this.city = {};
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'City Created',
          life: 1000,
        });
      },
      (error) => {
        console.log(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error Creating City ',
          life: 1000,
        });
      }
    );
  }
}
