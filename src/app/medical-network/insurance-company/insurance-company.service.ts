import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import {
  CREATE_INSURANCE_COMPANY,
  GET_INSURANCE_COMPANY,
  REMOVE_INSURANCE_COMPANY,
  UPDATE_INSURANCE_COMPANY,
} from 'src/app/graphql/qraphql.queries';

@Injectable({
  providedIn: 'root',
})
export class InsuranceCompanyService {
  constructor(private apollo: Apollo) {}
  getInsuranceCompanies(
    language: string,
    tpaId: number,
    search?: string,
    page?: number,
    limit?: number
  ): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: GET_INSURANCE_COMPANY,
      variables: {
        language,
        tpaId,
        search,
        page,
        limit,
      },
    }).valueChanges;
  }

  createInsuranceCompany(
    name: string,
    tpaId: number,
    language: string
  ): Observable<any> {
    return this.apollo
      .mutate({
        mutation: CREATE_INSURANCE_COMPANY,
        variables: {
          createInsuranceCompanyInput: {
            name,
            tpaId,
          },
          language,
        },
        refetchQueries: [
          {
            query: GET_INSURANCE_COMPANY,
            variables: {
              tpaId,
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

  removeInsuranceCompany(
    id: number,
    tpaId: number,
    language: string
  ): Observable<any> {
    return this.apollo
      .mutate({
        mutation: REMOVE_INSURANCE_COMPANY,
        variables: {
          removeInsuranceCompanyId: id,
        },
        refetchQueries: [
          {
            query: GET_INSURANCE_COMPANY,
            variables: {
              language,
              tpaId,
            },
          },
        ],
      })
      .pipe(map((result: any) => result.data.removeInsuranceCompany));
  }

  updateInsuranceCompany(
    id: number,
    tpaId: number,
    name: string,
    language: string
  ): Observable<any> {
    return this.apollo
      .mutate({
        mutation: UPDATE_INSURANCE_COMPANY,
        variables: {
          updateInsuranceCompanyInput: {
            id,
            name,
            tpaId,
          },
          language,
        },
        refetchQueries: [
          {
            query: GET_INSURANCE_COMPANY,
            variables: {
              language,
              tpaId,
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
