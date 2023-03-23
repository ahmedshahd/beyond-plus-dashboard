import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import {
  CREATE_CLIENT_AREA,
  GET_CLIENT_AREA,
  REMOVE_CLIENT_AREA,
  UPDATE_CLIENT_AREA,
} from 'src/app/graphql/qraphql.queries';

@Injectable({
  providedIn: 'root',
})
export class AreaClientService {
  constructor(private apollo: Apollo) {}
  getAreas(
    clientCityId: number[],
    search?: string,
    page?: number,
    limit?: number
  ): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: GET_CLIENT_AREA,
      variables: {
        clientCityId,
        search,
        page,
        limit,
      },
    }).valueChanges;
  }

  createArea(
    clientCityId: number,
    name: string,
    language: string
  ): Observable<any> {
    return this.apollo
      .mutate({
        mutation: CREATE_CLIENT_AREA,
        variables: {
          createClientAreaInput: {
            name,
            clientCityId,
          },
          language,
        },
        refetchQueries: [
          {
            query: GET_CLIENT_AREA,
            variables: {
              clientCityId,
            },
          },
        ],
      })
      .pipe(map((result) => result.data));
  }

  removeArea(id: number, clientCityId: number): Observable<any> {
    return this.apollo
      .mutate({
        mutation: REMOVE_CLIENT_AREA,
        variables: {
          removeClientAreaId: id,
        },
        refetchQueries: [
          {
            query: GET_CLIENT_AREA,
            variables: {
              clientCityId: [clientCityId],
            },
          },
        ],
      })
      .pipe(map((result: any) => result.data.removeClientArea));
  }

  updateArea(
    id: number,
    clientCityId?: number,
    name?: string
  ): Observable<any> {
    return this.apollo
      .mutate({
        mutation: UPDATE_CLIENT_AREA,
        variables: {
          updateAreaInput: {
            id,
            name,
            clientCityId,
          },
        },
        refetchQueries: [
          {
            query: GET_CLIENT_AREA,
            variables: {
              clientCityId,
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
