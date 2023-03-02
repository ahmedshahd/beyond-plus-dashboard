import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import {
  CREATE_SPECIALITY,
  GET_SPECIALITY,
  REMOVE_SPECIALITY,
  UPDATE_SPECIALITY,
} from 'src/app/graphql/qraphql.queries';

@Injectable({
  providedIn: 'root',
})
export class SpecialityService {
  constructor(private apollo: Apollo) {}

  getSpecialities(
    providerTypeId,
    language: string,
    search?: string,
    page?: number,
    limit?: number
  ): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: GET_SPECIALITY,
      variables: {
        providerTypeId: [parseInt(providerTypeId)],
        language,
        search,
        page,
        limit,
      },
    }).valueChanges;
  }

  createSpeciality(
    providerTypeId,
    name: string,
    language: string
  ): Observable<any> {
    return this.apollo
      .mutate({
        mutation: CREATE_SPECIALITY,
        variables: {
          createSpecialityInput: {
            providerTypeId: parseInt(providerTypeId),
            name,
          },
          language: language,
        },
        refetchQueries: [
          {
            query: GET_SPECIALITY,
            variables: {
              providerTypeId: [parseInt(providerTypeId)],
              language,
            },
          },
        ],
      })
      .pipe(map((result: any) => result.data));
  }

  removeSpeciality(
    id: number,
    providerTypeId,
    language: string
  ): Observable<any> {
    return this.apollo
      .mutate({
        mutation: REMOVE_SPECIALITY,
        variables: {
          removeSpecialityId: id,
        },
        refetchQueries: [
          {
            query: GET_SPECIALITY,
            variables: {
              language,
              providerTypeId: [parseInt(providerTypeId)],
            },
          },
        ],
      })
      .pipe(map((result: any) => result.data.removeSpeciality));
  }

  updateSpeciality(
    id: number,
    providerTypeId?,
    name?: string,
    language?: string
  ): Observable<any> {
    return this.apollo
      .mutate({
        mutation: UPDATE_SPECIALITY,
        variables: {
          updateSpecialityInput: {
            id,
            providerTypeId: parseInt(providerTypeId),
            name,
          },
        },
        refetchQueries: [
          {
            query: GET_SPECIALITY,
            variables: {
              providerTypeId: [parseInt(providerTypeId)],
              language,
            },
          },
        ],
      })
      .pipe(
        map((result) => {
          result.data;
        })
      );
  }
}
