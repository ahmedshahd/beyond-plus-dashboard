import { Component } from '@angular/core';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { AreaService } from '../area/area.service';
import { CategoryService } from '../category/category.service';
import { CityService } from '../city/city.service';
import { InsuranceCompanyService } from '../insurance-company/insurance-company.service';
import { ProviderTypeService } from '../provider-type/provider-type.service';
import { SpecialityService } from '../speciality/speciality.service';
import { TpaService } from '../tpa/tpa.service';
import { ProviderService } from './provider.service';
import { SubSpecialityService } from '../sub-speciality/sub-speciality.service';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.scss'],
})
export class ProviderComponent {
  filter() {
    throw new Error('Method not implemented.');
  }
  createDialog: boolean;

  editDialog: boolean;

  providers: [];

  provider = {
    id: null,
    insuranceCompanyId: null,
    tierRank: null,
    areaId: null,
    specialityId: null,
    providerTypeId: null,
    subSpecialityId: null,
    address: '',
    email: '',
    hasChronicMedication: false,
    isOnline: false,
    latitude: 0.0,
    longitude: 0.0,
    name: '',
    phoneNumber: [],
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
  selectedCities: [];
  //// for Area drop down ///
  areaOptions: SelectItem[];
  selectedAreas: [];
  //// for Provider Type drop down ///
  providerTypeOptions: SelectItem[];
  selectedProviderTypes: [];
  //// for Speciality drop down ///
  specialityOptions: SelectItem[];
  selectedSpecialities: [];
  //// for Sub Speciality drop down ///
  subSpecialityOptions: SelectItem[];
  selectedSubSpecialities: [];

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

    const selectedAreasId = this.selectedAreas.map((area: any) => area.areaId);

    const selectedProviderTypesId = this.selectedProviderTypes
      ? this.selectedProviderTypes.map(
          (providerType: any) => providerType.providerTypeId
        )
      : [];

    const selectedSpecialitiesId = this.selectedSpecialities
      ? this.selectedSpecialities.map(
          (speciality: any) => speciality.specialityId
        )
      : [];

    const selectedSubSpecialitiesId = this.selectedSubSpecialities
      ? this.selectedSubSpecialities.map(
          (subSpeciality: any) => subSpeciality.subSpecialityId
        )
      : [];
    return this.providerService
      .getProviders(
        this.selectedInsuranceCompany.insuranceCompanyId,
        this.selectedCategory.tierRank,
        selectedAreasId,
        selectedProviderTypesId,
        selectedSpecialitiesId,
        selectedSubSpecialitiesId,
        name
      )
      .subscribe(({ data, error }: any) => {
        if (data) {
          console.log('data', data);
          this.providers = data.listAllProviders.provider;
          this.messageService.add({
            severity: 'success',
            summary: 'Provider data loaded successfully',
            life: 1000,
          });
        } else {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error loading Provider data',
            life: 1000,
          });
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
    this.provider = {
      ...this.provider,
      insuranceCompanyId: this.selectedInsuranceCompany.insuranceCompanyId,
    };

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
            life: 1000,
          });
        }
      });
    this.cityService
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
            life: 1000,
          });
        }
      });
    this.categoryService
      .getCategories(
        this.selectedInsuranceCompany.insuranceCompanyId,
        this.selectedLanguage.value
      )
      .subscribe(({ data, error }: any) => {
        if (data) {
          const categories =
            data.listAllCategoriesByInsuranceCompanyId.category;
          this.categoryOptions = categories.map((category) => {
            return {
              categoryId: category.id,
              name: category.tier,
              tierRank: category.tierRank,
            };
          });
        } else {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error loading Speciality data',
            life: 1000,
          });
        }
      });
  }
  onCategoryChange() {
    this.provider = {
      ...this.provider,
      tierRank: this.selectedCategory.tierRank,
    };
  }
  onCityChange() {
    const selectedCitiesId = this.selectedCities.map((city: any) => {
      return city.cityId;
    });

    return this.areaService
      .getAreas(selectedCitiesId, this.selectedLanguage.value)
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
            life: 1000,
          });
        }
      });
  }

  onAreaChange() {
    const selectedAreasId = this.selectedAreas.map((area: any) => {
      return area.areaId;
    });
    this.provider = {
      ...this.provider,
      areaId: selectedAreasId,
    };
  }

  onProviderTypeChange() {
    const providerTypesId = this.selectedProviderTypes.map(
      (providerType: any) => {
        return providerType.providerTypeId;
      }
    );
    console.log('providerTypesId', providerTypesId);
    return this.specialityService
      .getSpecialities(providerTypesId, this.selectedLanguage.value)
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
            life: 1000,
          });
        }
      });
  }

  onSpecialityChange() {
    const selectedSpecialitiesId = this.selectedSpecialities.map(
      (speciality: any) => {
        return speciality.specialityId;
      }
    );
    return this.subSpecialityService
      .getSubSpecialities(selectedSpecialitiesId, this.selectedLanguage.value)
      .subscribe(({ data, error }: any) => {
        if (data) {
          const subSpecialities =
            data.listAllSubSpecialityBySpecialityId.subSpeciality;

          this.subSpecialityOptions = subSpecialities.map((subSpeciality) => {
            return {
              subSpecialityId: subSpeciality.id,
              name: subSpeciality.name,
            };
          });
          console.log('this.subSpecialityOptions', this.subSpecialityOptions);
        } else {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error loading Sub Speciality data',
            life: 1000,
          });
        }
      });
  }

  onSubSpecialityChange() {
    const selectedAreasId = this.selectedAreas.map((area: any) => {
      return area.areaId;
    });
    const selectedProviderTypesId = this.selectedProviderTypes.map(
      (providerType: any) => {
        return providerType.providerTypeId;
      }
    );

    const selectedSpecialitiesId = this.selectedSpecialities.map(
      (speciality: any) => {
        return speciality.specialityId;
      }
    );
    const selectedSubSpecialitiesId = this.selectedSubSpecialities.map(
      (subSpeciality: any) => {
        return subSpeciality.subSpecialityId;
      }
    );

    return this.providerService
      .getProviders(
        this.selectedInsuranceCompany.insuranceCompanyId,
        this.selectedCategory.tierRank,
        selectedAreasId,
        selectedProviderTypesId,
        selectedSpecialitiesId,
        selectedSubSpecialitiesId
      )
      .subscribe(({ data, error }: any) => {
        if (data) {
          this.providers = data.listAllProviders.provider;
          this.messageService.add({
            severity: 'success',
            summary: 'Provider data loaded successfully',
            life: 1000,
          });
        } else {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error loading Provider data',
            life: 1000,
          });
        }
      });
  }

  onSearchClick() {
    const selectedAreasId = this.selectedAreas.map((area: any) => area.areaId);

    const selectedProviderTypesId = this.selectedProviderTypes
      ? this.selectedProviderTypes.map(
          (providerType: any) => providerType.providerTypeId
        )
      : [];

    const selectedSpecialitiesId = this.selectedSpecialities
      ? this.selectedSpecialities.map(
          (speciality: any) => speciality.specialityId
        )
      : [];

    const selectedSubSpecialitiesId = this.selectedSubSpecialities
      ? this.selectedSubSpecialities.map(
          (subSpeciality: any) => subSpeciality.subSpecialityId
        )
      : [];

    // console.log(
    //   'this.selectedInsuranceCompany.insuranceCompanyId:',
    //   this.selectedInsuranceCompany.insuranceCompanyId
    // );
    // console.log(
    //   'this.selectedCategory.tierRank:',
    //   this.selectedCategory.tierRank
    // );
    // console.log('selectedAreasId:', selectedAreasId);
    // console.log('selectedProviderTypesId:', selectedProviderTypesId);
    // console.log('selectedSpecialitiesId:', selectedSpecialitiesId);
    // console.log('selectedSubSpecialitiesId:', selectedSubSpecialitiesId);
    return this.providerService
      .getProviders(
        this.selectedInsuranceCompany.insuranceCompanyId,
        this.selectedCategory.tierRank,
        selectedAreasId,
        selectedProviderTypesId,
        selectedSpecialitiesId,
        selectedSubSpecialitiesId
      )
      .subscribe(({ data, error }: any) => {
        if (data) {
          console.log('data', data);
          this.providers = data.listAllProviders.provider;
          this.messageService.add({
            severity: 'success',
            summary: 'Provider data loaded successfully',
            life: 1000,
          });
        } else {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error loading Provider data',
            life: 1000,
          });
        }
      });
  }

  openNew() {
    this.provider = {
      id: null,

      insuranceCompanyId:
        this.selectedInsuranceCompany?.insuranceCompanyId ?? null,
      tierRank: this.selectedCategory?.tierRank ?? null,
      areaId: null,
      specialityId: null,
      providerTypeId: null,
      subSpecialityId: null,
      address: '',
      // areaId: this.selectedAreas?.areaId ?? null,
      email: '',
      hasChronicMedication: false,
      isOnline: false,
      latitude: 0.0,
      longitude: 0.0,
      name: '',
      phoneNumber: [''],
      // specialityId: this.selectedSpecialities?.specialityId ?? null,
      websiteUrl: '',
      language: this.selectedLanguage?.value ?? null,
    };
    this.submitted = false;
    this.createDialog = true;
  }

  deleteSelectedProviders() {}

  addPhoneNumber() {
    this.provider.phoneNumber.push('');
  }

  deletePhoneNumber(index) {
    this.provider.phoneNumber.splice(index, 1);
  }

  editProvider(provider: any) {
    this.provider = {
      id: provider.id,
      insuranceCompanyId: provider.insuranceCompanyId,
      tierRank: provider.tierRank,
      areaId: provider.areaId,
      specialityId: provider.specialityId,
      providerTypeId: provider.providerTypeId,
      subSpecialityId: provider.subSpecialityId,
      address: provider.address,
      email: provider.email,
      hasChronicMedication: provider.hasChronicMedication,
      isOnline: provider.isOnline,
      latitude: provider.latitude,
      longitude: provider.longitude,
      name: provider.name,
      phoneNumber: [...provider.phoneNumber],
      websiteUrl: provider.websiteUrl,
      language: provider.language,
    };
    this.editDialog = true;
    this.editId = provider.id;
  }

  updateProvider(provider) {
    this.providerService
      .updateProvider(
        this.editId,
        provider.insuranceCompanyId,
        provider.tierRank,
        provider.areaId,
        provider.providerTypeId,
        provider.specialityId,
        provider.subSpecialityId,
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
            life: 1000,
          });
        },
        (error) => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error Updating Provider ',
            life: 1000,
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
            provider.insuranceCompanyId,
            provider.tierRank,
            provider.areaId,
            provider.providerTypeId,
            provider.specialityId,
            provider.subSpecialityId
          )
          .subscribe(
            (data) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Provider Deleted',
                life: 1000,
              });
            },
            (error) => {
              console.log(error);
              this.messageService.add({
                severity: 'error',
                summary: 'Error Deleting Provider ',
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

  addProvider() {
    this.submitted = true;
    console.log(
      ' this.provider.subSpecialityId',
      this.provider.subSpecialityId
    );
    this.providerService
      .createProvider(
        this.provider.insuranceCompanyId,
        this.provider.tierRank,
        this.provider.areaId,
        this.provider.providerTypeId,
        this.provider.specialityId,
        this.provider.address,
        this.provider.name,
        this.provider.phoneNumber,
        this.provider.language,
        this.provider.subSpecialityId,
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
            insuranceCompanyId: null,
            tierRank: null,
            areaId: null,
            specialityId: null,
            providerTypeId: null,
            subSpecialityId: null,
            address: '',
            email: '',
            hasChronicMedication: false,
            isOnline: false,
            latitude: 0.0,
            longitude: 0.0,
            name: '',
            phoneNumber: [],
            websiteUrl: '',
            language: '',
          };
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Provider Created',
            life: 1000,
          });
        },
        (error) => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error Creating Provider ',
            life: 1000,
          });
        }
      );
  }
}
