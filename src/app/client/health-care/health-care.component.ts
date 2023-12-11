import { Component, ElementRef, ViewChild } from '@angular/core';
import * as pdfjsLib from 'pdfjs-dist';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user/user.service';
import { MessageService } from 'primeng/api';
import { HealthCareService } from './health-care.service';

pdfjsLib.GlobalWorkerOptions.workerSrc =
  'https://fastly.jsdelivr.net/npm/pdfjs-dist@2.16.105/legacy/build/pdf.worker.min.js';

@Component({
  selector: 'app-health-care',
  templateUrl: './health-care.component.html',
  styleUrls: ['./health-care.component.scss'],
})
export class HealthCareComponent {
  @ViewChild('pdfContainer') pdfContainer: ElementRef;

  healthCares: any;
  selectedUserUuid: any;
  selectedUser: any;
  error: any;
  userOptions: [];
  isLoading: boolean = false;

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private healthCareService: HealthCareService
  ) {}

  ngOnInit(): void {
    this.userService.getUsersProfiles().subscribe(({ data, error }: any) => {
      if (data) {
        const users = data.usersProfiles;
        console.log('users', users);
        this.userOptions = users.map(({ uuid, phoneNumber }) => {
          return {
            uuid,
            phoneNumber,
          };
        });
      } else {
        console.log(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error loading Users Options',
        });
      }
    });
  }

  healthCareForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    details: new FormControl(),
    attachments: new FormControl(null),
    allUsersCheck: new FormControl(false),
    user: new FormControl({ value: 'Select User', disabled: false }),
  });

  removeAttachment(index: number) {
    const attachments = this.healthCareForm.get('attachments').value;
    attachments.splice(index, 1);
    this.healthCareForm.get('attachments').setValue([...attachments]);
  }

  onUserChange() {
    this.selectedUserUuid = this.healthCareForm.get('user').value.uuid;
  }

  onListUserChange() {
    this.selectedUserUuid = this.selectedUser.uuid;
    this.healthCareService
      .getUserHealthCare(this.selectedUserUuid)
      .subscribe(({ data, error }: any) => {
        this.healthCares = data.healthCareOfUser;

        this.error = error;
      });
  }

  createHealthCare() {
    const globalChecked = this.healthCareForm.get('allUsersCheck').value;
    this.isLoading = true;

    if (!globalChecked) {
      const createHealthCareInput = {
        name: this.healthCareForm.value.name,
        description: this.healthCareForm.value.description,
        details: this.healthCareForm.value.details,
        userProfileUuid: this.selectedUserUuid,
      };
      const attachments = this.healthCareForm.get('attachments').value;
      const userProfileUuid = this.selectedUserUuid;
      return this.healthCareService
        .createHealthCare(createHealthCareInput, attachments, userProfileUuid)
        .subscribe(
          ({ data }: any) => {
            this.isLoading = false;
            this.resetForm();
          },
          (error) => {
            console.log('error creating health care', error);
            this.isLoading = false;
            this.error = error;
          }
        );
    }
    const createGlobalHealthCareInput = {
      name: this.healthCareForm.value.name,
      description: this.healthCareForm.value.description,
      details: this.healthCareForm.value.details,
    };
    const attachments = this.healthCareForm.get('attachments').value;
    return this.healthCareService
      .createGlobalHealthCare(createGlobalHealthCareInput, attachments)
      .subscribe(
        ({ data }: any) => {
          this.resetForm();
          this.isLoading = false;
        },
        (error) => {
          this.error = error;
          this.isLoading = false;
        }
      );
  }

  removeHealthCare(id: number) {
    return this.healthCareService
      .removeHealthCare(id, this.selectedUserUuid)
      .subscribe(
        ({ data }: any) => {
          this.resetForm();
        },
        (error) => {
          this.error = error;
        }
      );
  }

  onFileChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const { files } = target;
    if (files && files.length) {
      // Convert the FileList to an array
      const fileList: File[] = Array.from(files);
      this.healthCareForm.get('attachments').setValue(fileList);
    }
  }
  resetForm() {
    this.healthCareForm.reset();
  }
}
