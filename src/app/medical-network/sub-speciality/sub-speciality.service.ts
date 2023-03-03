import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import {
  CREATE_SUB_SPECIALITY,
  GET_SUB_SPECIALITY,
  REMOVE_SUB_SPECIALITY,
  UPDATE_SUB_SPECIALITY,
} from 'src/app/graphql/qraphql.queries';

@Injectable({
  providedIn: 'root',
})
export class SubSpecialityService {
  constructor(private apollo: Apollo) {}

  getSubSpecialities(
    specialityId,
    language: string,
    search?: string,
    page?: number,
    limit?: number
  ): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: GET_SUB_SPECIALITY,
      variables: {
        specialityId: [parseInt(specialityId)],
        language,
        search,
        page,
        limit,
      },
    }).valueChanges;
  }

  createSubSpeciality(
    specialityId,
    name: string,
    language: string
  ): Observable<any> {
    return this.apollo
      .mutate({
        mutation: CREATE_SUB_SPECIALITY,
        variables: {
          createSubSpecialityInput: {
            specialityId: parseInt(specialityId),
            name,
          },
          language: language,
        },
        refetchQueries: [
          {
            query: GET_SUB_SPECIALITY,
            variables: {
              specialityId: [parseInt(specialityId)],
              language,
            },
          },
        ],
      })
      .pipe(map((result: any) => result.data));
  }

  removeSubSpeciality(
    id: number,
    specialityId,
    language: string
  ): Observable<any> {
    return this.apollo
      .mutate({
        mutation: REMOVE_SUB_SPECIALITY,
        variables: {
          removeSubSpecialityId: id,
        },
        refetchQueries: [
          {
            query: GET_SUB_SPECIALITY,
            variables: {
              language,
              specialityId: [parseInt(specialityId)],
            },
          },
        ],
      })
      .pipe(map((result: any) => result.data.removeSubSpeciality));
  }

  updateSubSpeciality(
    id: number,
    specialityId?,
    name?: string,
    language?: string
  ): Observable<any> {
    return this.apollo
      .mutate({
        mutation: UPDATE_SUB_SPECIALITY,
        variables: {
          updateSubSpecialityInput: {
            id,
            specialityId: parseInt(specialityId),
            name,
          },
        },
        refetchQueries: [
          {
            query: GET_SUB_SPECIALITY,
            variables: {
              specialityId: [parseInt(specialityId)],
              language,
            },
          },
        ],
      })
      .pipe(
        map((result: any) => {
          result.data;
        })
      );
  }
}
