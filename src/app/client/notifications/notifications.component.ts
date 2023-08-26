import { Component } from '@angular/core';
import { UserService } from '../user/user.service';
import { MessageService } from 'primeng/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from './notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent {
  selectedUserUuid: any;
  selectedUser: any;
  error: any;
  userOptions: [];

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private notificationsService: NotificationsService
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

  notificationsForm = new FormGroup({
    title: new FormControl('', Validators.required),
    body: new FormControl('', Validators.required),
    image: new FormControl(null),
    allUsersCheck: new FormControl(false, Validators.required),
    user: new FormControl({ value: 'Select User', disabled: false }),
  });

  onUserChange() {
    this.selectedUserUuid = this.notificationsForm.get('user').value.uuid;
  }

  removeImage() {
    this.notificationsForm.get('image').setValue(null);
  }

  onFileChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const { files } = target;
    console.log('files', files);
    if (files && files.length) {
      this.notificationsForm.get('image').setValue(files[0]);
    }
    console.log('object, ', this.notificationsForm.get('image').value);
  }
  sendNotification() {
    const globalChecked = this.notificationsForm.get('allUsersCheck').value;
    const title = this.notificationsForm.value.title;
    const body = this.notificationsForm.value.body;
    const image = this.notificationsForm.get('image').value;

    if (!globalChecked) {
      const uuid = this.selectedUserUuid;
      return this.notificationsService
        .sendNotificationToSingleDevice(uuid, title, body, image)
        .subscribe(
          ({ data }: any) => {
            this.resetForm();
          },
          (error) => {
            this.error = error;
          }
        );
    }
    return this.notificationsService
      .sendNotificationToMultipleDevices(title, body, image)
      .subscribe(
        ({ data }: any) => {
          console.log('data multiple', data);
          this.resetForm();
        },
        (error) => {
          this.error = error;
        }
      );
  }
  resetForm() {
    this.notificationsForm.reset();
  }
}
