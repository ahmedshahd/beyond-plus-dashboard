import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  GET_WELLNESS_TIPS_OF_USER,
  CREATE_WELLNESS_TIP,
  UPDATE_WELLNESS_TIP,
  REMOVE_WELLNESS_TIP,
} from '../../graphql/qraphql.queries';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WellnessTipsService {
  constructor(private apollo: Apollo) {}

  createWellnessTip(createWellnessTipInput: any, attachments: any, uuid: any) {
    console.log('here create');
    return this.apollo
      .mutate({
        mutation: CREATE_WELLNESS_TIP,
        variables: {
          createWellnessTipInput,
          attachments,
        },
        refetchQueries: [
          {
            query: GET_WELLNESS_TIPS_OF_USER,
            variables: { userProfileUuid: uuid },
          },
        ],
      })

  }

  removeWellnessTip(id: number, uuid: string) {
    console.log('object', id, uuid);
    return this.apollo
      .mutate({
        mutation: REMOVE_WELLNESS_TIP,
        variables: { removeWellnessTipId: id },
        refetchQueries: [
          {
            query: GET_WELLNESS_TIPS_OF_USER,
            variables: { userProfileUuid: uuid },
          },
        ],
      })

  }

  UpdateWellnessTip(
    uuid: string,
    updateWellnessTipInput: any,
    attachments?: any
  ) {
    return this.apollo
      .mutate({
        mutation: UPDATE_WELLNESS_TIP,
        variables: {
          updateWellnessTipInput,
          attachments,
        },
        refetchQueries: [
          {
            query: GET_WELLNESS_TIPS_OF_USER,
            variables: { userProfileUuid: uuid },
          },
        ],
      })
  }

  getUserWellnessTips(uuid: string) {
    return this.apollo.watchQuery({
      query: GET_WELLNESS_TIPS_OF_USER,
      variables: { userProfileUuid: uuid },
    }).valueChanges;
  }
}
