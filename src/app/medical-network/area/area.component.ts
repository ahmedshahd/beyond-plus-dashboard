import { CityService } from './../city/city.service';
import { Component } from '@angular/core';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { InsuranceCompanyService } from '../insurance-company/insurance-company.service';
import { TpaService } from '../tpa/tpa.service';
import { AreaService } from './area.service';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss'],
})
export class AreaComponent {
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
  tpaOptions: SelectItem[];
  selectedTpa: any;
  insuranceCompanyOptions: SelectItem[];
  selectedInsuranceCompany: any;
  cityOptions: SelectItem[];
  selectedCity: any;

  constructor(
    private areaService: AreaService,
    private tpaService: TpaService,
    private insuranceCompanyService: InsuranceCompanyService,
    private cityService: CityService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.tpaService
      .getTpas(this.selectedLanguage.value)
      .subscribe(({ data, error }: any) => {
        if (data) {
          const tpa = data.listAllTpas.tpa;
          this.tpaOptions = tpa.map((tpa) => {
            return {
              tpaId: tpa.id,
              name: tpa.name,
            };
          });
        } else {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error loading TPA Options',
          });
        }
      });
  }

  onSearchInputChange(event) {
    const name = event.target.value;

    this.areaService
      .getAreas(this.selectedCity.cityId, this.selectedLanguage.value, name)
      .subscribe(({ data, error }: any) => {
        if (data) {
          this.areas = data.listAllAreasByCityId.area;
        } else {
          console.log(error);
        }
      });
  }

  onLanguageChange() {
    if (this.selectedLanguage.value === 'ENGLISH') {
      this.tpaService
        .getTpas(this.selectedLanguage.value)
        .subscribe(({ data, error }: any) => {
          if (data) {
            const tpa = data.listAllTpas.tpa;
            this.tpaOptions = tpa.map((tpa) => {
              return {
                tpaId: tpa.id,
                name: tpa.name,
              };
            });
          } else {
            console.log(error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error loading TPA Options',
            });
          }
        });
    } else if (this.selectedLanguage.value === 'ARABIC') {
      this.tpaService
        .getTpas(this.selectedLanguage.value)
        .subscribe(({ data, error }: any) => {
          if (data) {
            const tpa = data.listAllTpas.tpa;
            this.tpaOptions = tpa.map((tpa) => {
              return {
                tpaId: tpa.id,
                name: tpa.name,
              };
            });
          } else {
            console.log(error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error loading TPA Options',
            });
          }
        });
    }
  }
  onTpaChange() {
    return this.insuranceCompanyService
      .getInsuranceCompanies(
        this.selectedLanguage.value,
        this.selectedTpa.tpaId
      )
      .subscribe(({ data, error }: any) => {
        if (data) {
          const insuranceCompanies =
            data.listAllInsuranceCompaniesByTpaId.insuranceCompany;
          this.insuranceCompanyOptions = insuranceCompanies.map((company) => {
            return {
              insuranceCompanyId: company.id,
              name: company.name,
            };
          });
        } else {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error loading Insurance Company Options',
            life: 1000,
          });
        }
      });
  }

  onInsuranceCompanyChange() {
    return this.cityService
      .getCities(
        this.selectedInsuranceCompany.insuranceCompanyId,
        this.selectedLanguage.value,
        undefined,
        undefined,
        150
      )
      .subscribe(({ data, error }: any) => {
        if (data) {
          const cities = data.listAllCitiesByInsuranceCompanyId.city;
          this.cityOptions = cities.map((city) => {
            return {
              cityId: city.id,
              name: city.name,
            };
          });
        } else {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error loading Area data',
            life: 1000,
          });
        }
      });
  }

  onCityChange() {
    return this.areaService
      .getAreas(
        this.selectedCity.cityId,
        this.selectedLanguage.value,
        undefined,
        undefined,
        150
      )
      .subscribe(({ data, error }: any) => {
        if (data) {
          this.areas = data.listAllAreasByCityId.area;
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
      cityId: area.cityId,
      name: area.name,
      language: area.language,
    };
    this.editDialog = true;
    this.editId = area.id;
  }

  updateArea(area) {
    this.areaService
      .updateArea(this.editId, this.area.cityId, this.area.name, area.language)
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
        this.areaService
          .removeArea(area.id, area.cityId, area.language)
          .subscribe(
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
