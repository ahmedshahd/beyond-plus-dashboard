import { TpaService } from './../tpa/tpa.service';
import { Component } from '@angular/core';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { InsuranceCompanyService } from './insurance-company.service';

@Component({
  selector: 'app-insurance-company',
  templateUrl: './insurance-company.component.html',
  styleUrls: ['./insurance-company.component.scss'],
})
export class InsuranceCompanyComponent {
  createDialog: boolean;
  editDialog: boolean;
  insuranceCompanies: any;
  insuranceCompany: any;
  editId: number;
  selectedInsuranceCompanies: any;
  submitted: boolean;
  languageOptions: SelectItem[] = [
    { label: 'English', value: 'ENGLISH' },
    { label: 'Arabic', value: 'ARABIC' },
  ];
  selectedLanguage: any = { label: 'English', value: 'ENGLISH' };
  tpaOptions: SelectItem[];
  selectedTpa: any;

  constructor(
    private insuranceCompanyService: InsuranceCompanyService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private tpaService: TpaService
  ) {}
  onSearchInputChange(event) {
    const name = event.target.value;
    this.insuranceCompanyService
      .getInsuranceCompanies(
        this.selectedLanguage.value,
        this.selectedTpa.tpaId,
        name
      )
      .subscribe(({ data, error }: any) => {
        if (data) {
          this.insuranceCompanies =
            data.listAllInsuranceCompaniesByTpaId.insuranceCompany;
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
      .getInsuranceCompanies(this.selectedLanguage, this.selectedTpa.tpaId)
      .subscribe(({ data, error }: any) => {
        if (data) {
          this.insuranceCompanies =
            data.listAllInsuranceCompaniesByTpaId.insuranceCompany;
          this.messageService.add({
            severity: 'success',
            summary: 'Insurance Company data loaded successfully',
            life: 1000,
          });
        } else {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error loading Insurance Company data',
            life: 1000,
          });
        }
      });
  }

  openNew() {
    this.insuranceCompany = {
      tpaId: this.selectedTpa?.tpaId ?? null,
      language: this.selectedLanguage?.value ?? '',
    };
    this.submitted = false;
    this.createDialog = true;
  }

  deleteSelectedInsuranceCompanies() {}

  editInsuranceCompany(insuranceCompany: any) {
    this.insuranceCompany = {
      tpaId: insuranceCompany.tpaId,
      name: insuranceCompany.name,
      language: insuranceCompany.language,
    };
    this.editDialog = true;
    this.editId = insuranceCompany.id;
  }

  updateInsuranceCompany(insuranceCompany) {
    this.insuranceCompanyService
      .updateInsuranceCompany(
        this.editId,
        insuranceCompany.tpaId,
        insuranceCompany.name,
        insuranceCompany.language
      )
      .subscribe(
        (data) => {
          this.editDialog = false;
          this.editId = undefined;
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'InsuranceCompany Updated',
            life: 1000,
          });
        },
        (error) => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error Updating Insurance Company ',
            life: 1000,
          });
        }
      );
  }

  deleteInsuranceCompany(insuranceCompany: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + insuranceCompany.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.insuranceCompanyService
          .removeInsuranceCompany(
            insuranceCompany.id,
            insuranceCompany.tpId,
            insuranceCompany.language
          )
          .subscribe(
            (data) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'InsuranceCompany Deleted',
                life: 1000,
              });
            },
            (error) => {
              console.log(error);
              this.messageService.add({
                severity: 'error',
                summary: 'Error Deleting Insurance Company ',
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

  addInsuranceCompany() {
    this.submitted = true;

    this.insuranceCompanyService
      .createInsuranceCompany(
        this.insuranceCompany.name,
        this.insuranceCompany.tpaId,
        this.insuranceCompany.language
      )
      .subscribe(
        (data) => {
          this.createDialog = false;
          this.insuranceCompany = {};
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'InsuranceCompany Created',
            life: 1000,
          });
        },
        (error) => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error Creating Insurance Company ',
            life: 1000,
          });
        }
      );
  }

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
}
