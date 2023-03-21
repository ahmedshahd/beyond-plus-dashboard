import { Component } from '@angular/core';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { InsuranceCompanyService } from '../insurance-company/insurance-company.service';
import { TpaService } from '../tpa/tpa.service';
import { ProviderTypeService } from './provider-type.service';

@Component({
  selector: 'app-provider-type',
  templateUrl: './provider-type.component.html',
  styleUrls: ['./provider-type.component.scss'],
})
export class ProviderTypeComponent {
  createDialog: boolean;
  editDialog: boolean;
  providerTypes: any;

  providerType: any;

  editId: number;

  selectedProviderTypes: any;

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

  constructor(
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

    this.providerTypeService
      .getProviderTypes(
        this.selectedInsuranceCompany.insuranceCompanyId,
        this.selectedLanguage.value,
        name
      )
      .subscribe(({ data, error }: any) => {
        if (data) {
          this.providerTypes =
            data.listAllProviderTypesByInsuranceCompanyId.providerType;
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
          const insuranceCompany =
            data.listAllInsuranceCompaniesByTpaId.insuranceCompany;
          this.insuranceCompanyOptions = insuranceCompany.map((company) => {
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
          this.providerTypes =
            data.listAllProviderTypesByInsuranceCompanyId.providerType;
          this.messageService.add({
            severity: 'success',
            summary: 'ProviderType data loaded successfully',
            life: 1000,
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

  openNew() {
    this.providerType = {
      insuranceCompanyId:
        this.selectedInsuranceCompany?.insuranceCompanyId ?? null,
      language: this.selectedLanguage?.value ?? '',
    };
    this.submitted = false;
    this.createDialog = true;
  }

  deleteSelectedProviderTypes() {}

  editProviderType(providerType: any) {
    this.providerType = {
      insuranceCompanyId: providerType.insuranceCompanyId,
      name: providerType.name,
      language: providerType.language,
    };
    this.editDialog = true;
    this.editId = providerType.id;
  }

  updateProviderType(providerType) {
    const countryId = providerType.language === 'ENGLISH' ? 4 : 5;

    this.providerTypeService
      .updateProviderType(
        this.editId,
        this.providerType.insuranceCompanyId,
        this.providerType.name,
        providerType.language
      )
      .subscribe(
        (data) => {
          console.log(data);
          this.editDialog = false;
          this.editId = undefined;
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'ProviderType Updated',
            life: 1000,
          });
        },
        (error) => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error Updating ProviderType ',
            life: 1000,
          });
        }
      );
  }

  deleteProviderType(providerType: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + providerType.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.providerTypeService
          .removeProviderType(
            providerType.id,
            providerType.insuranceCompanyId,
            providerType.language
          )
          .subscribe(
            (data) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'ProviderType Deleted',
                life: 1000,
              });
            },
            (error) => {
              console.log(error);
              this.messageService.add({
                severity: 'error',
                summary: 'Error Deleting ProviderType ',
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

  addProviderType() {
    this.submitted = true;
    this.providerTypeService
      .createProviderType(
        this.providerType.insuranceCompanyId,
        this.providerType.name,
        this.providerType.language
      )
      .subscribe(
        (data) => {
          this.createDialog = false;
          this.providerType = {};
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'ProviderType Created',
            life: 1000,
          });
        },
        (error) => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error Creating ProviderType ',
            life: 1000,
          });
        }
      );
  }
}
