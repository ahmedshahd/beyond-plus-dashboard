import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  SEND_NOTIFICATION_TO_DEVICE,
  SEND_NOTIFICATION_TO_MULTIPLE_DEVICES,
} from '../../graphql/qraphql.queries';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(private apollo: Apollo) {}

  sendNotificationToSingleDevice(
    uuid: string,
    title: string,
    body: string,
    image?: any
  ) {
    return this.apollo.mutate({
      mutation: SEND_NOTIFICATION_TO_DEVICE,
      variables: {
        sendNotificationToDeviceInput: {
          uuid,
          title,
          body,
        },
        image,
      },
    });
  }
  sendNotificationToMultipleDevices(title: string, body: string, image: any) {
    return this.apollo.mutate({
      mutation: SEND_NOTIFICATION_TO_MULTIPLE_DEVICES,
      variables: {
        sendNotificationToMultipleDevicesInput: { title, body },
        image,
      },
    });
  }
}
