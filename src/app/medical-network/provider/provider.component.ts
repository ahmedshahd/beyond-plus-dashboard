import { Component } from '@angular/core';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { AreaService } from '../area/area.service';
import { CategoryService } from '../category/category.service';
import { CityService } from '../city/city.service';
import { InsuranceCompanyService } from '../insurance-company/insurance-company.service';
import { ProviderTypeService } from '../provider-type/provider-type.service';
import { SpecialityService } from '../speciality/speciality.service';
import { SubSpecialityService } from '../sub-speciality/sub-speciality.service';
import { TpaService } from '../tpa/tpa.service';
import { ProviderService } from './provider.service';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.scss'],
})
export class ProviderComponent {
  createDialog: boolean;

  editDialog: boolean;

  providers: [];

  provider = {
    id: null,
    address: '',
    areaId: null,
    categoryId: null,
    email: '',
    hasChronicMedication: false,
    isOnline: false,
    latitude: null,
    longitude: null,
    name: '',
    phoneNumber: [],
    specialityId: null,
    subSpecialityId: null,
    websiteUrl: '',
    language: '',
  };

  editId: number;

  selectedProviders;

  submitted: boolean;

  //// for Language drop down ///
  languageOptions: SelectItem[] = [
    { label: 'English', value: 'ENGLISH' },
    { label: 'Arabic', value: 'ARABIC' },
  ];
  selectedLanguage: any = { label: 'English', value: 'ENGLISH' };
  //// for TPA drop down ///
  tpaOptions: SelectItem[];
  selectedTpa: any;
  //// for Insurance Company drop down ///
  insuranceCompanyOptions: SelectItem[];
  selectedInsuranceCompany: any;
  //// for Category drop down ///
  categoryOptions: SelectItem[];
  selectedCategory: any;
  //// for City drop down ///
  cityOptions: SelectItem[];
  selectedCity: any;
  //// for Area drop down ///
  areaOptions: SelectItem[];
  selectedArea: any;
  //// for Provider Type drop down ///
  providerTypeOptions: SelectItem[];
  selectedProviderType: any;
  //// for Speciality drop down ///
  specialityOptions: SelectItem[];
  selectedSpeciality: any;
  //// for Sub Speciality drop down ///
  subSpecialityOptions: SelectItem[];
  selectedSubSpeciality: any;

  constructor(
    private tpaService: TpaService,
    private insuranceCompanyService: InsuranceCompanyService,
    private categoryService: CategoryService,
    private cityService: CityService,
    private areaService: AreaService,
    private providerTypeService: ProviderTypeService,
    private specialityService: SpecialityService,
    private subSpecialityService: SubSpecialityService,
    private providerService: ProviderService,
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

    this.providerService
      .getProviders(
        this.selectedCategory.categoryId,
        this.selectedSpeciality.specialityId,
        this.selectedSubSpeciality.subSpecialityId,
        this.selectedArea.areaId,
        this.selectedLanguage.value,
        name
      )
      .subscribe(({ data, error }: any) => {
        if (data) {
          this.providers =
            data.listAllProvidersByProviderTypeIdAndAreaId.provider;
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
            life: 3000,
          });
        }
      });
  }

  onInsuranceCompanyChange() {
    this.providerTypeService
      .getProviderTypes(
        this.selectedInsuranceCompany.insuranceCompanyId,
        this.selectedLanguage.value,
        undefined,
        undefined,
        150
      )
      .subscribe(({ data, error }: any) => {
        if (data) {
          const providerTypes =
            data.listAllProviderTypesByInsuranceCompanyId.providerType;
          this.providerTypeOptions = providerTypes.map((providerType) => {
            return {
              providerTypeId: providerType.id,
              name: providerType.name,
            };
          });
        } else {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error loading Speciality data',
            life: 3000,
          });
        }
      });
    return this.cityService
      .getCities(
        this.selectedInsuranceCompany.insuranceCompanyId,
        this.selectedLanguage.value
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
            summary: 'Error loading Speciality data',
            life: 3000,
          });
        }
      });
  }

  onCityChange() {
    // return this.cityService
    //   .getCities(
    //     this.selectedInsuranceCompany.insuranceCompanyId,
    //     this.selectedLanguage.value
    //   )
    //   .subscribe(({ data, error }: any) => {
    //     if (data) {
    //       const cities = data.listAllCitiesByInsuranceCompanyId.city;
    //       this.cityOptions = cities.map((city) => {
    //         return {
    //           cityId: city.id,
    //           name: city.name,
    //         };
    //       });
    //     } else {
    //       console.log(error);
    //       this.messageService.add({
    //         severity: 'error',
    //         summary: 'Error loading Speciality data',
    //         life: 3000,
    //       });
    //     }
    //   });

    return this.areaService
      .getAreas(this.selectedCity.cityId, this.selectedLanguage.value)
      .subscribe(({ data, error }: any) => {
        if (data) {
          const areas = data.listAllAreasByCityId.area;
          this.areaOptions = areas.map((area) => {
            return {
              areaId: area.id,
              name: area.name,
            };
          });
        } else {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error loading Areas data',
            life: 3000,
          });
        }
      });
  }

  onAreaChange() {
    // return this.areaService
    //   .getAreas(this.selectedCity.cityId, this.selectedLanguage.value)
    //   .subscribe(({ data, error }: any) => {
    //     if (data) {
    //       const areas = data.listAllAreasByCityId.area;
    //       this.areaOptions = areas.map((area) => {
    //         return {
    //           areaId: area.id,
    //           name: area.name,
    //         };
    //       });
    //     } else {
    //       console.log(error);
    //       this.messageService.add({
    //         severity: 'error',
    //         summary: 'Error loading Speciality data',
    //         life: 3000,
    //       });
    //     }
    //   });
  }

  onProviderTypeChange() {
    return this.specialityService
      .getSpecialities(
        this.selectedProviderType.providerTypeId,
        this.selectedLanguage.value
      )
      .subscribe(({ data, error }: any) => {
        if (data) {
          const specialities =
            data.listAllSpecialityByProviderTypeId.speciality;
          this.specialityOptions = specialities.map((speciality) => {
            return {
              specialityId: speciality.id,
              name: speciality.name,
            };
          });
        } else {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error loading ProviderType data',
            life: 3000,
          });
        }
      });
  }

  onSpecialityChange() {
    return this.subSpecialityService
      .getSubSpecialities(
        this.selectedSpeciality.specialityId,
        this.selectedLanguage.value
      )
      .subscribe(({ data, error }: any) => {
        if (data) {
          const subSpecialities =
            data.listAllSubSpecialityBySpecialityId.subSpeciality;
          this.specialityOptions = subSpecialities.map((subSpeciality) => {
            return {
              subSpecialityId: subSpeciality.id,
              name: subSpeciality.name,
            };
          });
        } else {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error loading Sub Peciality data',
            life: 3000,
          });
        }
      });
  }

  onSubSpecialityChange() {
    return this.providerService
      .getProviders(
        this.selectedCategory.categoryId,
        this.selectedSpeciality.specialityId,
        this.selectedSubSpeciality.subSpecialityId,
        this.selectedArea.areaId,
        this.selectedLanguage.value
      )
      .subscribe(({ data, error }: any) => {
        if (data) {
          this.providers =
            data.listAllProvidersByProviderTypeIdAndAreaId.provider;
          this.messageService.add({
            severity: 'success',
            summary: 'Provider data loaded successfully',
            life: 3000,
          });
        } else {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error loading Provider data',
            life: 3000,
          });
        }
      });
  }

  openNew() {
    this.provider = {
      id: null,
      address: '',
      areaId: null,
      categoryId: null,
      email: '',
      hasChronicMedication: false,
      isOnline: false,
      latitude: null,
      longitude: null,
      name: '',
      phoneNumber: [],
      specialityId: null,
      subSpecialityId: null,
      websiteUrl: '',
      language: '',
    };
    this.submitted = false;
    this.createDialog = true;
  }

  deleteSelectedProviders() {}

  editProvider(provider: any) {
    this.provider = {
      id: null,
      address: '',
      areaId: null,
      categoryId: null,
      email: '',
      hasChronicMedication: false,
      isOnline: false,
      latitude: null,
      longitude: null,
      name: '',
      phoneNumber: [],
      specialityId: null,
      subSpecialityId: null,
      websiteUrl: '',
      language: '',
    };
    this.editDialog = true;
    this.editId = provider.id;
  }

  updateProvider(provider) {
    this.providerService
      .updateProvider(
        this.editId,
        provider.categoryId,
        provider.specialityId,
        provider.subSpecialityId,
        provider.areaId,
        provider.address,
        provider.websiteUrl,
        provider.hasChronicMedication,
        provider.email,
        provider.isOnline,
        provider.latitude,
        provider.longitude,
        provider.name,
        provider.phoneNumber,
        provider.language
      )
      .subscribe(
        (data) => {
          this.editDialog = false;
          this.editId = undefined;
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Provider Updated',
            life: 3000,
          });
        },
        (error) => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error Updating Provider ',
            life: 3000,
          });
        }
      );
  }

  deleteProvider(provider: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + provider.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.providerService
          .removeProvider(
            provider.id,
            provider.categoryId,
            provider.specialityId,
            provider.subSpecialityId,
            provider.areaId,
            provider.language
          )
          .subscribe(
            (data) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Provider Deleted',
                life: 3000,
              });
            },
            (error) => {
              console.log(error);
              this.messageService.add({
                severity: 'error',
                summary: 'Error Deleting Provider ',
                life: 3000,
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

  addProvider() {
    this.submitted = true;
    console.log('this.provider from add', this.provider);

    this.providerService
      .createProvider(
        this.provider.categoryId,
        this.provider.specialityId,
        this.provider.subSpecialityId,
        this.provider.areaId,
        this.provider.address,
        this.provider.name,
        this.provider.phoneNumber,
        this.provider.language,
        this.provider.websiteUrl,
        this.provider.hasChronicMedication,
        this.provider.email,
        this.provider.isOnline,
        this.provider.latitude,
        this.provider.longitude
      )
      .subscribe(
        (data) => {
          this.createDialog = false;
          this.provider = {
            id: null,
            address: '',
            areaId: null,
            categoryId: null,
            email: '',
            hasChronicMedication: false,
            isOnline: false,
            latitude: null,
            longitude: null,
            name: '',
            phoneNumber: [],
            specialityId: null,
            subSpecialityId: null,
            websiteUrl: '',
            language: '',
          };
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Provider Created',
            life: 3000,
          });
        },
        (error) => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error Creating Provider ',
            life: 3000,
          });
        }
      );
  }
}
