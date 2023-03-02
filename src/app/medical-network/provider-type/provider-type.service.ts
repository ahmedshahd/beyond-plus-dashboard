import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import {
  CREATE_PROVIDER_TYPE,
  GET_PROVIDER_TYPE,
  REMOVE_PROVIDER_TYPE,
  UPDATE_PROVIDER_TYPE,
} from 'src/app/graphql/qraphql.queries';

@Injectable({
  providedIn: 'root',
})
export class ProviderTypeService {
  constructor(private apollo: Apollo) {}

  getProviderTypes(
    insuranceCompanyId: number,
    language: string,
    search?: string,
    page?: number,
    limit?: number
  ): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: GET_PROVIDER_TYPE,
      variables: {
        insuranceCompanyId,
        language,
        search,
        page,
        limit,
      },
    }).valueChanges;
  }

  createProviderType(
    insuranceCompanyId,
    name: string,
    language: string
  ): Observable<any> {
    return this.apollo
      .mutate({
        mutation: CREATE_PROVIDER_TYPE,
        variables: {
          createProviderTypeInput: {
            insuranceCompanyId: parseInt(insuranceCompanyId),
            name,
          },
          language: language,
        },
        refetchQueries: [
          {
            query: GET_PROVIDER_TYPE,
            variables: {
              insuranceCompanyId: parseInt(insuranceCompanyId),
              language,
            },
          },
        ],
      })
      .pipe(map((result: any) => result.data));
  }

  removeProviderType(
    id: number,
    insuranceCompanyId,
    language: string
  ): Observable<any> {
    return this.apollo
      .mutate({
        mutation: REMOVE_PROVIDER_TYPE,
        variables: {
          removeProviderTypeId: id,
        },
        refetchQueries: [
          {
            query: GET_PROVIDER_TYPE,
            variables: {
              insuranceCompanyId: insuranceCompanyId,
              language,
            },
          },
        ],
      })
      .pipe(map((result: any) => result.data.removeProviderType));
  }

  updateProviderType(
    id: number,
    insuranceCompanyId?,
    name?: string,
    language?: string
  ): Observable<any> {
    return this.apollo
      .mutate({
        mutation: UPDATE_PROVIDER_TYPE,
        variables: {
          updateProviderTypeInput: {
            id,
            insuranceCompanyId: parseInt(insuranceCompanyId),
            name,
          },
        },
        refetchQueries: [
          {
            query: GET_PROVIDER_TYPE,
            variables: {
              insuranceCompanyId: parseInt(insuranceCompanyId),
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
