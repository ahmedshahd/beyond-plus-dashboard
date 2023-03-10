import { SpecialityService } from './speciality.service';
import { Component } from '@angular/core';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { InsuranceCompanyService } from '../insurance-company/insurance-company.service';
import { TpaService } from '../tpa/tpa.service';
import { ProviderTypeService } from '../provider-type/provider-type.service';

@Component({
  selector: 'app-speciality',
  templateUrl: './speciality.component.html',
  styleUrls: ['./speciality.component.scss'],
})
export class SpecialityComponent {
  createDialog: boolean;
  editDialog: boolean;
  specialities: any;

  speciality: any;

  editId: number;

  selectedSpecialities: any;

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
  providerTypeOptions: SelectItem[];
  selectedProviderType: any;

  constructor(
    private specialityService: SpecialityService,
    private providerTypeService: ProviderTypeService,
    private tpaService: TpaService,
    private insuranceCompanyService: InsuranceCompanyService,
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

    this.specialityService
      .getSpecialities(
        this.selectedProviderType.providerTypeId,
        this.selectedLanguage.value,
        name
      )
      .subscribe(({ data, error }: any) => {
        if (data) {
          this.specialities = data.listAllSpecialityByProviderTypeId.speciality;
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
    return this.providerTypeService
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
  }
  onProviderTypeChange() {
    return this.specialityService
      .getSpecialities(
        this.selectedProviderType.providerTypeId,
        this.selectedLanguage.value
      )
      .subscribe(({ data, error }: any) => {
        if (data) {
          this.specialities = data.listAllSpecialityByProviderTypeId.speciality;
          this.messageService.add({
            severity: 'success',
            summary: 'Speciality data loaded successfully',
            life: 3000,
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

  openNew() {
    this.speciality = {
      providerTypeId: this.selectedProviderType?.providerTypeId ?? null,
      language: this.selectedLanguage?.value ?? '',
    };
    this.submitted = false;
    this.createDialog = true;
  }

  deleteSelectedSpecialities() {}

  editSpeciality(speciality: any) {
    this.speciality = {
      name: speciality.name,
      language: speciality.language,
      providerTypeId: speciality.providerTypeId,
    };
    this.editDialog = true;
    this.editId = speciality.id;
  }

  updateSpeciality(speciality) {
    this.specialityService
      .updateSpeciality(
        this.editId,
        this.speciality.providerTypeId,
        this.speciality.name,
        speciality.language
      )
      .subscribe(
        (data) => {
          this.editDialog = false;
          this.editId = undefined;
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Speciality Updated',
            life: 3000,
          });
        },
        (error) => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error Updating Speciality ',
            life: 3000,
          });
        }
      );
  }

  deleteSpeciality(speciality: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + speciality.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.specialityService
          .removeSpeciality(
            speciality.id,
            speciality.providerTypeId,
            speciality.language
          )
          .subscribe(
            (data) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Speciality Deleted',
                life: 3000,
              });
            },
            (error) => {
              console.log(error);
              this.messageService.add({
                severity: 'error',
                summary: 'Error Deleting Speciality ',
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

  addSpeciality() {
    this.submitted = true;
    this.specialityService
      .createSpeciality(
        this.speciality.providerTypeId,
        this.speciality.name,
        this.speciality.language
      )
      .subscribe(
        (data) => {
          this.createDialog = false;
          this.speciality = {};
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Speciality Created',
            life: 3000,
          });
        },
        (error) => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error Creating Speciality ',
            life: 3000,
          });
        }
      );
  }
}
