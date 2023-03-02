import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import {
  CREATE_CITY,
  GET_CITY,
  REMOVE_CITY,
  UPDATE_CITY,
} from 'src/app/graphql/qraphql.queries';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  constructor(private apollo: Apollo) {}

  getCities(
    insuranceCompanyId: number,
    language: string,
    search?: string,
    page?: number,
    limit?: number
  ): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: GET_CITY,
      variables: {
        insuranceCompanyId,
        language,
        search,
        page,
        limit,
      },
    }).valueChanges;
  }

  createCity(
    insuranceCompanyId,
    countryId,
    name: string,
    language: string
  ): Observable<any> {
    return this.apollo
      .mutate({
        mutation: CREATE_CITY,
        variables: {
          createCityInput: {
            insuranceCompanyId: parseInt(insuranceCompanyId),
            countryId: parseInt(countryId),
            name,
          },
          language: language,
        },
        refetchQueries: [
          {
            query: GET_CITY,
            variables: {
              insuranceCompanyId: parseInt(insuranceCompanyId),
              language,
            },
          },
        ],
      })
      .pipe(map((result: any) => result.data));
  }

  removeCity(
    id: number,
    insuranceCompanyId,
    language: string
  ): Observable<any> {
    return this.apollo
      .mutate({
        mutation: REMOVE_CITY,
        variables: {
          removeCityId: id,
        },
        refetchQueries: [
          {
            query: GET_CITY,
            variables: {
              language,
              insuranceCompanyId: parseInt(insuranceCompanyId),
            },
          },
        ],
      })
      .pipe(map((result: any) => result.data.removeCity));
  }

  updateCity(
    id: number,
    insuranceCompanyId?,
    name?: string,
    language?: string
  ): Observable<any> {
    return this.apollo
      .mutate({
        mutation: UPDATE_CITY,
        variables: {
          updateCityInput: {
            id,
            insuranceCompanyId: parseInt(insuranceCompanyId),
            name,
          },
        },
        refetchQueries: [
          {
            query: GET_CITY,
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
