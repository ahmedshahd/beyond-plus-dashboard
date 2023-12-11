import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  GET_HEALTH_CARE_OF_USER,
  CREATE_HEALTH_CARE,
  UPDATE_HEALTH_CARE,
  REMOVE_HEALTH_CARE,
  CREATE_GLOBAL_HEALTH_CARE
} from '../../graphql/qraphql.queries';

@Injectable({
  providedIn: 'root',
})
export class HealthCareService {
  constructor(private apollo: Apollo) {}

  createHealthCare(createHealthCareInput: any, attachments: any, uuid: any) {
    return this.apollo
      .mutate({
        mutation: CREATE_HEALTH_CARE,
        variables: {
          createHealthCareInput,
          attachments,
        },
        refetchQueries: [
          {
            query: GET_HEALTH_CARE_OF_USER,
            variables: { userProfileUuid: uuid },
          },
        ],
      })

  }

  createGlobalHealthCare(createGlobalHealthCareInput: any, attachments: any) {
    return this.apollo
      .mutate({
        mutation: CREATE_GLOBAL_HEALTH_CARE,
        variables: {
          createGlobalHealthCareInput,
          attachments,
        }
      })
  }

  removeHealthCare(id: number, uuid: string) {
    return this.apollo
      .mutate({
        mutation: REMOVE_HEALTH_CARE,
        variables: { removeHealthCareId: id },
        refetchQueries: [
          {
            query: GET_HEALTH_CARE_OF_USER,
            variables: { userProfileUuid: uuid },
          },
        ],
      })

  }

  UpdateHealthCare(
    uuid: string,
    updateHealthCareInput: any,
    attachments?: any
  ) {
    return this.apollo
      .mutate({
        mutation: UPDATE_HEALTH_CARE,
        variables: {
          updateHealthCareInput,
          attachments,
        },
        refetchQueries: [
          {
            query: GET_HEALTH_CARE_OF_USER,
            variables: { userProfileUuid: uuid },
          },
        ],
      })
  }

  getUserHealthCare(uuid: string) {
    return this.apollo.watchQuery({
      query: GET_HEALTH_CARE_OF_USER,
      variables: { userProfileUuid: uuid },
    }).valueChanges;
  }
}
