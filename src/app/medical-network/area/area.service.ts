import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import {
  CREATE_AREA,
  GET_AREA,
  REMOVE_AREA,
  UPDATE_AREA,
} from 'src/app/graphql/qraphql.queries';

@Injectable({
  providedIn: 'root',
})
export class AreaService {
  constructor(private apollo: Apollo) {}

  getAreas(
    cityId: number[],
    language: string,
    search?: string,
    page?: number,
    limit?: number
  ): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: GET_AREA,
      variables: {
        cityId,
        language,
        search,
        page,
        limit,
      },
    }).valueChanges;
  }

  createArea(cityId, name: string, language: string): Observable<any> {
    return this.apollo
      .mutate({
        mutation: CREATE_AREA,
        variables: {
          createAreaInput: {
            cityId: parseInt(cityId),
            name,
          },
          language: language,
        },
        refetchQueries: [
          {
            query: GET_AREA,
            variables: {
              cityId: [parseInt(cityId)],
              language,
            },
          },
        ],
      })
      .pipe(map((result: any) => result.data));
  }

  removeArea(id: number, cityId, language: string): Observable<any> {
    return this.apollo
      .mutate({
        mutation: REMOVE_AREA,
        variables: {
          removeAreaId: id,
        },
        refetchQueries: [
          {
            query: GET_AREA,
            variables: {
              language,
              cityId: [parseInt(cityId)],
            },
          },
        ],
      })
      .pipe(map((result: any) => result.data.removeArea));
  }

  updateArea(
    id: number,
    cityId?,
    name?: string,
    language?: string
  ): Observable<any> {
    return this.apollo
      .mutate({
        mutation: UPDATE_AREA,
        variables: {
          updateAreaInput: {
            id,
            cityId: parseInt(cityId),
            name,
          },
        },
        refetchQueries: [
          {
            query: GET_AREA,
            variables: {
              cityId: [parseInt(cityId)],
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
