import { WellnessTipsService } from './wellness-tip.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user/user.service';
import { MessageService } from 'primeng/api';
import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc =
  'https://fastly.jsdelivr.net/npm/pdfjs-dist@2.16.105/legacy/build/pdf.worker.min.js';

@Component({
  selector: 'app-wellnes-tip',
  templateUrl: './wellnes-tip.component.html',
  styleUrls: ['./wellnes-tip.component.scss'],
})
export class WellnesTipComponent implements OnInit {
  @ViewChild('pdfContainer') pdfContainer: ElementRef;

  removeAttachment(index: number) {
    const attachments = this.wellnessTipForm.get('attachments').value;
    attachments.splice(index, 1);
    this.wellnessTipForm.get('attachments').setValue([...attachments]);
  }

  wellnessTips: any;
  selectedUserUuid: any;
  selectedUser: any;
  error: any;
  isLoading: boolean = false;

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private wellnessTipsService: WellnessTipsService
  ) {}

  userOptions: [];

  wellnessTipForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    details: new FormControl(),
    attachments: new FormControl(null,),
    allUsersCheck: new FormControl(false),
    user: new FormControl({ value: 'Select User', disabled: false }),
  });

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

  onUserChange() {
    this.selectedUserUuid = this.wellnessTipForm.get('user').value.uuid;
  }

  onListUserChange() {
    this.selectedUserUuid = this.selectedUser.uuid;
    this.wellnessTipsService
      .getUserWellnessTips(this.selectedUserUuid)
      .subscribe(({ data, error }: any) => {
        this.wellnessTips = data.wellnessTipsOfUser;

        this.error = error;
      });
  }

  createWellnessTip() {
    const globalChecked = this.wellnessTipForm.get('allUsersCheck').value;
    this.isLoading = true;

    if (!globalChecked) {
      const createWellnessTipInput = {
        name: this.wellnessTipForm.value.name,
        description: this.wellnessTipForm.value.description,
        details: this.wellnessTipForm.value.details,
        userProfileUuid: this.selectedUserUuid,
      };
      const attachments = this.wellnessTipForm.get('attachments').value;
      const userProfileUuid = this.selectedUserUuid;
      return this.wellnessTipsService
        .createWellnessTip(createWellnessTipInput, attachments, userProfileUuid)
        .subscribe(
          ({ data }: any) => {
            this.isLoading = false;

            this.resetForm();
          },
          (error) => {
            this.isLoading = false;

            this.error = error;
          }
        );
    }
    const createGlobalWellnessTipInput = {
      name: this.wellnessTipForm.value.name,
      description: this.wellnessTipForm.value.description,
      details: this.wellnessTipForm.value.details,
    };
    const attachments = this.wellnessTipForm.get('attachments').value;

    return this.wellnessTipsService
      .createGlobalWellnessTip(createGlobalWellnessTipInput, attachments)
      .subscribe(
        ({ data }: any) => {
          this.isLoading = false;

          this.resetForm();
        },
        (error) => {
          this.isLoading = false;

          this.error = error;
        }
      );
  }

  removeWellnessTip(id: number) {
    return this.wellnessTipsService
      .removeWellnessTip(id, this.selectedUserUuid)
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
      this.wellnessTipForm.get('attachments').setValue(fileList);
    }
  }
  resetForm() {
    this.wellnessTipForm.reset();
  }
}
