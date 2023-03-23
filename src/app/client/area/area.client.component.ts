import { Component } from '@angular/core';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { CityClientService } from '../city/city.client.service';
import { AreaClientService } from './area.client.service';

@Component({
  selector: 'app-area.client',
  templateUrl: './area.client.component.html',
  styleUrls: ['./area.client.component.scss'],
})
export class AreaClientComponent {
  createDialog: boolean;
  editDialog: boolean;
  areas: any;

  area: any;

  editId: number;

  selectedAreas: any;

  submitted: boolean;

  languageOptions: SelectItem[] = [
    { label: 'English', value: 'ENGLISH' },
    { label: 'Arabic', value: 'ARABIC' },
  ];
  selectedLanguage: any = { label: 'English', value: 'ENGLISH' };
  cityOptions: SelectItem[];
  selectedCity: any;

  constructor(
    private areaService: AreaClientService,
    private cityService: CityClientService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.cityService
      .getCities(this.selectedLanguage.value)
      .subscribe(({ data, error }: any) => {
        if (data) {
          const city = data.listAllClientCities.clientCity;
          this.cityOptions = city.map((city) => {
            return {
              cityId: city.id,
              name: city.name,
            };
          });
        } else {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error loading City Options',
          });
        }
      });
  }

  onSearchInputChange(event) {
    const name = event.target.value;

    this.areaService
      .getAreas(this.selectedCity.cityId, name)
      .subscribe(({ data, error }: any) => {
        if (data) {
          this.areas = data.listAllClientAreasByClientCityId.clientArea;
          console.log(' this.areas on search ', this.areas);
        } else {
          console.log(error);
        }
      });
  }

  onLanguageChange() {
    this.cityService
      .getCities(this.selectedLanguage.value)
      .subscribe(({ data, error }: any) => {
        if (data) {
          const city = data.listAllClientCities.clientCity;
          this.cityOptions = city.map((city) => {
            return {
              cityId: city.id,
              name: city.name,
            };
          });
        } else {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error loading City Options',
          });
        }
      });
  }

  onCityChange() {
    return this.areaService
      .getAreas(this.selectedCity.cityId, undefined, undefined)
      .subscribe(({ data, error }: any) => {
        if (data) {
          console.log('data on change', data);
          this.areas = data.listAllClientAreasByClientCityId.clientArea;
          console.log(' this.areas', this.areas);
          this.messageService.add({
            severity: 'success',
            summary: 'Areas data loaded successfully',
            life: 1000,
          });
        } else {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error loading Areas data',
            life: 1000,
          });
        }
      });
  }

  openNew() {
    this.area = {
      cityId: this.selectedCity?.cityId ?? null,
      language: this.selectedLanguage?.value ?? '',
    };
    this.submitted = false;
    this.createDialog = true;
  }

  editArea(area: any) {
    this.area = {
      cityId: area.clientCityId,
      name: area.name,
      language: area.language,
    };
    this.editDialog = true;
    this.editId = area.id;
  }

  updateArea(area) {
    this.areaService
      .updateArea(this.editId, this.area.cityId, this.area.name)
      .subscribe(
        (data) => {
          console.log(data);
          this.editDialog = false;
          this.editId = undefined;
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Area Updated',
            life: 1000,
          });
        },
        (error) => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error Updating Area ',
            life: 1000,
          });
        }
      );
  }

  deleteArea(area: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + area.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.areaService.removeArea(area.id, area.clientCityId).subscribe(
          (data) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Area Deleted',
              life: 1000,
            });
          },
          (error) => {
            console.log(error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error Deleting Area ',
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

  addArea() {
    this.submitted = true;
    this.areaService
      .createArea(this.area.cityId, this.area.name, this.area.language)
      .subscribe(
        (data) => {
          this.createDialog = false;
          this.area = {};
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Area Created',
            life: 1000,
          });
        },
        (error) => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error Creating Area ',
            life: 1000,
          });
        }
      );
  }
}
