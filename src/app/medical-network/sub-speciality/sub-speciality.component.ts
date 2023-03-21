import { Component } from '@angular/core';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { InsuranceCompanyService } from '../insurance-company/insurance-company.service';
import { ProviderTypeService } from '../provider-type/provider-type.service';
import { SpecialityService } from '../speciality/speciality.service';
import { TpaService } from '../tpa/tpa.service';
import { SubSpecialityService } from './sub-speciality.service';

@Component({
  selector: 'app-sub-speciality',
  templateUrl: './sub-speciality.component.html',
  styleUrls: ['./sub-speciality.component.scss'],
})
export class SubSpecialityComponent {
  createDialog: boolean;

  editDialog: boolean;

  subSpecialities: any;

  subSpeciality: any;

  editId: number;

  selectedSubSpecialities: any;

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

  specialityOptions: SelectItem[];

  selectedSpeciality: any;

  constructor(
    private specialityService: SpecialityService,
    private subSpecialityService: SubSpecialityService,
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

    this.subSpecialityService
      .getSubSpecialities(
        this.selectedSpeciality.specialityId,
        this.selectedLanguage.value,
        name
      )
      .subscribe(({ data, error }: any) => {
        if (data) {
          this.subSpecialities =
            data.listAllSubSpecialityBySpecialityId.subSpeciality;
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
            life: 1000,
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
    return this.subSpecialityService
      .getSubSpecialities(
        this.selectedSpeciality.specialityId,
        this.selectedLanguage.value
      )
      .subscribe(({ data, error }: any) => {
        if (data) {
          this.subSpecialities =
            data.listAllSubSpecialityBySpecialityId.subSpeciality;
          this.messageService.add({
            severity: 'success',
            summary: 'Sub Speciality data loaded successfully',
            life: 1000,
          });
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

  openNew() {
    this.subSpeciality = {
      specialityId: this.selectedSpeciality?.specialityId ?? null,
      language: this.selectedLanguage?.value ?? '',
    };
    this.submitted = false;
    this.createDialog = true;
  }

  deleteSelectedSubSpecialities() {}

  editSubSpeciality(subSpeciality: any) {
    this.subSpeciality = {
      name: subSpeciality.name,
      specialityId: subSpeciality.specialityId,
      language: subSpeciality.language,
    };
    this.editDialog = true;
    this.editId = subSpeciality.id;
  }

  updateSubSpeciality(subSpeciality) {
    this.subSpecialityService
      .updateSubSpeciality(
        this.editId,
        this.subSpeciality.specialityId,
        this.subSpeciality.name,
        subSpeciality.language
      )
      .subscribe(
        (data) => {
          this.editDialog = false;
          this.editId = undefined;
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Sub Speciality Updated',
            life: 1000,
          });
        },
        (error) => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error Updating Sub Speciality ',
            life: 1000,
          });
        }
      );
  }

  deleteSubSpeciality(subSpeciality: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + subSpeciality.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.subSpecialityService
          .removeSubSpeciality(
            subSpeciality.id,
            subSpeciality.specialityId,
            subSpeciality.language
          )
          .subscribe(
            (data) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Sub Speciality Deleted',
                life: 1000,
              });
            },
            (error) => {
              console.log(error);
              this.messageService.add({
                severity: 'error',
                summary: 'Error Deleting Sub Speciality ',
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

  addSubSpeciality() {
    this.submitted = true;
    this.subSpecialityService
      .createSubSpeciality(
        this.subSpeciality.specialityId,
        this.subSpeciality.name,
        this.subSpeciality.language
      )
      .subscribe(
        (data) => {
          this.createDialog = false;
          this.subSpeciality = {};
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Sub Speciality Created',
            life: 1000,
          });
        },
        (error) => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error Creating Sub Speciality ',
            life: 1000,
          });
        }
      );
  }
}
