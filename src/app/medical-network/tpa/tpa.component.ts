import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TpaService } from './tpa.service';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-tpa',
  templateUrl: './tpa.component.html',
  styleUrls: ['./tpa.component.scss'],
})
export class TpaComponent {
  createDialog: boolean;
  editDialog: boolean;
  tpas: any;

  tpa: any;

  editId: number;

  selectedTpas: any;

  submitted: boolean;

  languageOptions: SelectItem[] = [
    { label: 'English', value: 'ENGLISH' },
    { label: 'Arabic', value: 'ARABIC' },
  ];
  selectedLanguage: any = { label: 'English', value: 'ENGLISH' };

  constructor(
    private tpaService: TpaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.tpaService
      .getTpas(this.selectedLanguage.value)
      .subscribe(({ data, error }: any) => {
        if (data) {
          this.tpas = data.listAllTpas.tpa;
          this.messageService.add({
            severity: 'success',
            summary: 'TPA data loaded successfully',
            life: 3000,
          });
        } else {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error loading TPA data',
            life: 3000,
          });
        }
      });
  }

  onSearchInputChange(event) {
    const name = event.target.value;
    this.tpaService
      .getTpas(this.selectedLanguage.value, name)
      .subscribe(({ data, error }: any) => {
        if (data) {
          this.tpas = data.listAllTpas.tpa;
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
            this.tpas = data.listAllTpas.tpa;
            this.messageService.add({
              severity: 'success',
              summary: 'TPA data loaded successfully',
            });
          } else {
            console.log(error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error loading TPA data',
            });
          }
        });
    } else if (this.selectedLanguage.value === 'ARABIC') {
      this.tpaService
        .getTpas(this.selectedLanguage.value)
        .subscribe(({ data, error }: any) => {
          if (data) {
            this.tpas = data.listAllTpas.tpa;
            this.messageService.add({
              severity: 'success',
              summary: 'TPA data loaded successfully',
            });
          } else {
            console.log(error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error loading TPA data',
            });
          }
        });
    }
  }

  openNew() {
    this.tpa = {};
    this.submitted = false;
    this.createDialog = true;
  }

  deleteSelectedTpas() {
    // this.confirmationService.confirm({
    //   message: 'Are you sure you want to delete the selected tpas?',
    //   header: 'Confirm',
    //   icon: 'pi pi-exclamation-triangle',
    //   accept: () => {
    //     this.tpas = this.tpas.filter(
    //       (val) => !this.selectedTpas.includes(val)
    //     );
    //     this.selectedTpas = null;
    //     this.messageService.add({
    //       severity: 'success',
    //       summary: 'Successful',
    //       detail: 'Tpas Deleted',
    //       life: 3000,
    //     });
    //   },
    // });
  }

  editTpa(tpa: any) {
    this.tpa = {};
    this.editDialog = true;
    this.editId = tpa.id;
  }

  updateTpa(tpa) {
    this.tpaService.updateTpa(this.editId, tpa.language, tpa.name).subscribe(
      (data) => {
        this.editDialog = false;
        this.editId = undefined;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Tpa Updated',
          life: 3000,
        });
      },
      (error) => {
        console.log(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error Updating TPA ',
          life: 3000,
        });
      }
    );
  }

  deleteTpa(tpa: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + tpa.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.tpaService.removeTpa(tpa.id, tpa.language).subscribe(
          (data) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Tpa Deleted',
              life: 3000,
            });
          },
          (error) => {
            console.log(error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error Deleting TPA ',
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

  addTpa() {
    this.submitted = true;
    this.tpaService.createTpa(this.tpa.name, this.tpa.language).subscribe(
      (data) => {
        this.createDialog = false;
        this.tpa = {};
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Tpa Created',
          life: 3000,
        });
      },
      (error) => {
        console.log(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error Creating TPA ',
          life: 3000,
        });
      }
    );
  }
}
