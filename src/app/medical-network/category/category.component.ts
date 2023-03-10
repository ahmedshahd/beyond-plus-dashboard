import { TpaService } from './../tpa/tpa.service';
import { Component } from '@angular/core';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { CategoryService } from './category.service';
import { InsuranceCompanyService } from '../insurance-company/insurance-company.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent {
  createDialog: boolean;
  editDialog: boolean;
  categories: any;

  category: any;

  editId: number;

  selectedCategories: any;

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
    private categoryService: CategoryService,
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
    this.categoryService
      .getCategories(
        this.selectedInsuranceCompany.insuranceCompanyId,
        this.selectedLanguage.value,
        name
      )
      .subscribe(({ data, error }: any) => {
        console.log(
          'data',
          data.listAllCategoriesByInsuranceCompanyId.category
        );
        if (data) {
          this.categories = data.listAllCategoriesByInsuranceCompanyId.category;
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
            life: 3000,
          });
        }
      });
  }

  onInsuranceCompanyChange() {
    console.log(
      'this.selectedInsuranceCompany, this.selectedLanguage.value',
      this.selectedInsuranceCompany.insuranceCompanyId,
      this.selectedLanguage.value
    );
    return this.categoryService
      .getCategories(
        this.selectedInsuranceCompany.insuranceCompanyId,
        this.selectedLanguage.value
      )
      .subscribe(({ data, error }: any) => {
        if (data) {
          this.categories = data.listAllCategoriesByInsuranceCompanyId.category;
          this.messageService.add({
            severity: 'success',
            summary: 'Category data loaded successfully',
            life: 3000,
          });
        } else {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error loading Category data',
            life: 3000,
          });
        }
      });
  }

  openNew() {
    this.category = {
      insuranceCompanyId:
        this.selectedInsuranceCompany?.insuranceCompanyId ?? null,
      language: this.selectedLanguage?.value ?? '',
    };
    this.submitted = false;
    this.createDialog = true;
  }

  deleteSelectedCategories() {}

  editCategory(category: any) {
    this.category = {
      insuranceCompanyId: category.insuranceCompanyId,
      tier: category.tier,
      tierRank: category.tierRank,
      language: category.language,
    };
    this.editDialog = true;
    this.editId = category.id;
  }

  updateCategory(category) {
    this.categoryService
      .updateCategory(
        this.editId,
        this.category.insuranceCompanyId,
        this.category.tier,
        this.category.tierRank,
        category.language
      )
      .subscribe(
        (data) => {
          console.log(data);
          this.editDialog = false;
          this.editId = undefined;
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Category Updated',
            life: 3000,
          });
        },
        (error) => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error Updating Category ',
            life: 3000,
          });
        }
      );
  }

  deleteCategory(category: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + category.tier + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoryService
          .removeCategory(
            category.id,
            category.insuranceCompanyId,
            category.language
          )
          .subscribe(
            (data) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Category Deleted',
                life: 3000,
              });
            },
            (error) => {
              console.log(error);
              this.messageService.add({
                severity: 'error',
                summary: 'Error Deleting Category ',
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

  addCategory() {
    this.submitted = true;
    this.categoryService
      .createCategory(
        this.category.insuranceCompanyId,
        this.category.tier,
        this.category.tierRank,
        this.category.language
      )
      .subscribe(
        (data) => {
          this.createDialog = false;
          this.category = {};
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Category Created',
            life: 3000,
          });
        },
        (error) => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error Creating Category ',
            life: 3000,
          });
        }
      );
  }
}
