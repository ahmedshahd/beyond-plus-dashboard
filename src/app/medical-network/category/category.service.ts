import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import {
  CREATE_CATEGORY,
  GET_CATEGORY,
  REMOVE_CATEGORY,
  UPDATE_CATEGORY,
} from 'src/app/graphql/qraphql.queries';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private apollo: Apollo) {}

  getCategories(
    insuranceCompanyId: number,
    language: string,
    search?: string,
    page?: number,
    limit?: number
  ): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: GET_CATEGORY,
      variables: {
        insuranceCompanyId,
        language,
        search,
        page,
        limit,
      },
    }).valueChanges;
  }

  createCategory(
    insuranceCompanyId,
    tier: string,
    tierRank: string,
    language: string
  ): Observable<any> {
    console.log(insuranceCompanyId);
    return this.apollo
      .mutate({
        mutation: CREATE_CATEGORY,
        variables: {
          createCategoryInput: {
            insuranceCompanyId: parseInt(insuranceCompanyId),
            tier: tier,
            tierRank: tierRank,
          },
          language: language,
        },
        refetchQueries: [
          {
            query: GET_CATEGORY,
            variables: {
              insuranceCompanyId: parseInt(insuranceCompanyId),
              language,
            },
          },
        ],
      })
      .pipe(map((result) => result.data));
  }

  removeCategory(
    id: number,
    insuranceCompanyId,
    language: string
  ): Observable<any> {
    return this.apollo
      .mutate({
        mutation: REMOVE_CATEGORY,
        variables: {
          removeCategoryId: id,
        },
        refetchQueries: [
          {
            query: GET_CATEGORY,
            variables: {
              language,
              insuranceCompanyId: parseInt(insuranceCompanyId),
            },
          },
        ],
      })
      .pipe(map((result: any) => result.data.removeCategory));
  }

  updateCategory(
    id: number,
    insuranceCompanyId?,
    tier?: string,
    tierRank?: string,
    language?: string
  ): Observable<any> {
    return this.apollo
      .mutate({
        mutation: gql`
          mutation Mutation($updateCategoryInput: UpdateCategoryInput!) {
            updateCategory(updateCategoryInput: $updateCategoryInput) {
              id
              tier
              tierRank
              language
            }
          }
        `,
        variables: {
          updateCategoryInput: {
            id,
            insuranceCompanyId: parseInt(insuranceCompanyId),
            tier,
            tierRank,
          },
        },
        refetchQueries: [
          {
            query: GET_CATEGORY,
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
