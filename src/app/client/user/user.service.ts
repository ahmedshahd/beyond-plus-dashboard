import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_USERS_PROFILES, GET_USER_PROFILE } from 'src/app/graphql/qraphql.queries';



@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private apollo: Apollo) {}

  getUserProfile(uuid: string) {
    return this.apollo.watchQuery({
      query: GET_USER_PROFILE,
      variables: { uuid },
    }).valueChanges;
  }

  getUsersProfiles(phoneNumber?: string) {
    return this.apollo.watchQuery({
      query: GET_USERS_PROFILES,
      variables: { phoneNumber },
    }).valueChanges;
  }
}
