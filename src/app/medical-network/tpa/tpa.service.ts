import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import {
  CREATE_TPA,
  GET_TPA,
  REMOVE_TPA,
  UPDATE_TPA,
} from 'src/app/graphql/qraphql.queries';

@Injectable({
  providedIn: 'root',
})
export class TpaService {
  constructor(private apollo: Apollo) {}
  getTpas(
    language: string,
    search?: string,
    page?: number,
    limit?: number
  ): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: GET_TPA,
      variables: {
        language,
        search,
        page,
        limit,
      },
    }).valueChanges;
  }

  createTpa(name: string, language: string): Observable<any> {
    return this.apollo
      .mutate({
        mutation: CREATE_TPA,
        variables: {
          createTpaInput: {
            name,
          },
          language,
        },
        refetchQueries: [
          {
            query: GET_TPA,
            variables: {
              language,
            },
          },
        ],
      })
      .pipe(map((result) => result.data));
  }

  removeTpa(id: number, language): Observable<any> {
    return this.apollo
      .mutate({
        mutation: REMOVE_TPA,
        variables: {
          removeTpaId: id,
        },
        refetchQueries: [
          {
            query: GET_TPA,
            variables: {
              language,
            },
          },
        ],
      })
      .pipe(map((result: any) => result.data.removeTpa));
  }

  updateTpa(id: number, name: string, language: string): Observable<any> {
    return this.apollo
      .mutate({
        mutation: UPDATE_TPA,
        variables: {
          updateTpaInput: {
            id,
            name,
          },
          language,
        },
        refetchQueries: [
          {
            query: GET_TPA,
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
