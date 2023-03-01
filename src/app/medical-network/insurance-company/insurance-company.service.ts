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
    page?: number,
    search?: string,
    limit?: number
  ): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: GET_INSURANCE_COMPANY,
      variables: {
        tpaId,
        language,
        page,
        search,
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
              language,
            },
          },
        ],
      })
      .pipe(map((result) => result.data));
  }

  removeInsuranceCompany(id: number, language): Observable<any> {
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
          },
          language,
        },
        refetchQueries: [
          {
            query: GET_INSURANCE_COMPANY,
            variables: {
              language,
            },
          },
        ],
      })
      .pipe(
        map((result: any) => {
          console.log('result.data', result.data);
          result.data;
        })
      );
  }
}
