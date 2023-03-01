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
  tpaId: number;

  onLanguageChange() {
    if (this.selectedLanguage.value === 'ENGLISH') {
      this.insuranceCompanyService
        .getInsuranceCompanies(this.selectedLanguage.value, this.tpaId)
        .subscribe(({ data, error }: any) => {
          if (data) {
            this.insuranceCompanies =
              data.listAllInsuranceCompanys.insuranceCompany;
            this.messageService.add({
              severity: 'success',
              summary: 'Insurance Company data loaded successfully',
            });
          } else {
            console.log(error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error loading Insurance Company data',
            });
          }
        });
    } else if (this.selectedLanguage.value === 'ARABIC') {
      this.insuranceCompanyService
        .getInsuranceCompanies(this.selectedLanguage.value, this.tpaId)
        .subscribe(({ data, error }: any) => {
          if (data) {
            this.insuranceCompanies =
              data.listAllInsuranceCompanys.insuranceCompany;
            this.messageService.add({
              severity: 'success',
              summary: 'Insurance Company data loaded successfully',
            });
          } else {
            console.log(error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error loading Insurance Company data',
            });
          }
        });
    }
  }

  constructor(
    private insuranceCompanyService: InsuranceCompanyService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.insuranceCompanyService
      .getInsuranceCompanies(this.selectedLanguage.value, this.tpaId)
      .subscribe(({ data, error }: any) => {
        if (data) {
          this.insuranceCompanies =
            data.listAllInsuranceCompanys.insuranceCompany;
          this.messageService.add({
            severity: 'success',
            summary: 'Insurance Company data loaded successfully',
          });
        } else {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error loading Insurance Company data',
          });
        }
      });
  }

  openNew() {
    this.insuranceCompany = {};
    this.submitted = false;
    this.createDialog = true;
  }

  deleteSelectedInsuranceCompanys() {}

  editInsuranceCompany(insuranceCompany: any) {
    this.editDialog = true;
    this.editId = insuranceCompany.id;
  }

  updateInsuranceCompany(insuranceCompany) {
    this.insuranceCompanyService
      .updateInsuranceCompany(
        this.editId,
        insuranceCompany.name,
        insuranceCompany.tpaId,
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
            life: 3000,
          });
        },
        (error) => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error Updating Insurance Company ',
            life: 3000,
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
        console.log(insuranceCompany);
        this.insuranceCompanyService
          .removeInsuranceCompany(
            insuranceCompany.id,
            insuranceCompany.language
          )
          .subscribe(
            (data) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'InsuranceCompany Deleted',
                life: 3000,
              });
            },
            (error) => {
              console.log(error);
              this.messageService.add({
                severity: 'error',
                summary: 'Error Deleting Insurance Company ',
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
            life: 3000,
          });
        },
        (error) => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error Creating Insurance Company ',
            life: 3000,
          });
        }
      );
  }
}
