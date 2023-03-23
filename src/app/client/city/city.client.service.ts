import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import {
  CREATE_CLIENT_CITY,
  GET_CLIENT_CITY,
  REMOVE_CLIENT_CITY,
  UPDATE_CLIENT_CITY,
} from 'src/app/graphql/qraphql.queries';

@Injectable({
  providedIn: 'root',
})
export class CityClientService {
  constructor(private apollo: Apollo) {}
  getCities(
    language: string,
    search?: string,
    page?: number,
    limit?: number
  ): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: GET_CLIENT_CITY,
      variables: {
        language,
        search,
        page,
        limit,
      },
    }).valueChanges;
  }

  createCity(name: string, language: string): Observable<any> {
    return this.apollo
      .mutate({
        mutation: CREATE_CLIENT_CITY,
        variables: {
          createClientCityInput: {
            name,
          },
          language,
        },
        refetchQueries: [
          {
            query: GET_CLIENT_CITY,
            variables: {
              language,
            },
          },
        ],
      })
      .pipe(map((result) => result.data));
  }

  removeCity(id: number, language): Observable<any> {
    return this.apollo
      .mutate({
        mutation: REMOVE_CLIENT_CITY,
        variables: {
          removeClientCityId: id,
        },
        refetchQueries: [
          {
            query: GET_CLIENT_CITY,
            variables: {
              language,
            },
          },
        ],
      })
      .pipe(map((result: any) => result.data.removeCity));
  }

  updateCity(id: number, language: string, name?: string): Observable<any> {
    return this.apollo
      .mutate({
        mutation: UPDATE_CLIENT_CITY,
        variables: {
          updateClientCityInput: {
            id,
            name,
          },
          language,
        },
        refetchQueries: [
          {
            query: GET_CLIENT_CITY,
            variables: {
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
