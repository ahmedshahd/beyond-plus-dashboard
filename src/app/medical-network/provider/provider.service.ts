import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import {
  CREATE_PROVIDER,
  GET_PROVIDER,
  REMOVE_PROVIDER,
  UPDATE_PROVIDER,
} from 'src/app/graphql/qraphql.queries';

@Injectable({
  providedIn: 'root',
})
export class ProviderService {
  constructor(private apollo: Apollo) {}

  getProviders(
    insuranceCompanyId: number,
    tierRank: number,
    areaId: number[],
    providerTypeId?: number[],
    specialityId?: number[],
    subSpecialityId?: number[],
    search?: string,
    page?: number,
    limit?: number
  ): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: GET_PROVIDER,
      variables: {
        insuranceCompanyId,
        tierRank,
        areaId,
        providerTypeId,
        specialityId,
        subSpecialityId,
        search,
        page,
        limit,
      },
    }).valueChanges;
  }

  createProvider(
    insuranceCompanyId: number,
    tierRank: number,
    areaId: number,
    providerTypeId: number,
    specialityId: number,
    address: string,
    name: string,
    phoneNumber: string[],
    language: string,
    subSpecialityId?: number,
    websiteUrl?: string,
    hasChronicMedication?: boolean,
    email?: string,
    isOnline?: boolean,
    latitude?: number,
    longitude?: number
  ): Observable<any> {
    return this.apollo
      .mutate({
        mutation: CREATE_PROVIDER,
        variables: {
          createProviderInput: {
            insuranceCompanyId,
            tierRank,
            areaId,
            providerTypeId,
            specialityId,
            subSpecialityId,
            address,
            name,
            phoneNumber,
            websiteUrl,
            hasChronicMedication,
            email,
            isOnline,
            latitude,
            longitude,
          },
          language: language,
        },
        refetchQueries: [
          {
            query: GET_PROVIDER,
            variables: {
              insuranceCompanyId,
              tierRank,
              areaId,
              providerTypeId,
              specialityId,
              subSpecialityId,
            },
          },
        ],
      })
      .pipe(map((result: any) => result.data));
  }

  removeProvider(
    id: number,
    insuranceCompanyId: number,
    tierRank: number,
    areaId: number,
    providerTypeId: number,
    specialityId: number,
    subSpecialityId?: number
  ): Observable<any> {
    return this.apollo
      .mutate({
        mutation: REMOVE_PROVIDER,
        variables: {
          removeProviderId: id,
        },
        refetchQueries: [
          {
            query: GET_PROVIDER,
            variables: {
              insuranceCompanyId,
              tierRank,
              areaId,
              providerTypeId,
              specialityId,
              subSpecialityId,
            },
          },
        ],
      })
      .pipe(map((result: any) => result.data.removeProvider));
  }

  updateProvider(
    id: number,
    insuranceCompanyId?: number,
    tierRank?: number,
    areaId?: number,
    providerTypeId?: number,
    specialityId?: number,
    subSpecialityId?: number,
    address?: string,
    websiteUrl?: string,
    hasChronicMedication?: boolean,
    email?: string,
    isOnline?: boolean,
    latitude?: number,
    longitude?: number,
    name?: string,
    phoneNumber?: string[],
    language?: string
  ): Observable<any> {
    return this.apollo
      .mutate({
        mutation: UPDATE_PROVIDER,
        variables: {
          updateProviderInput: {
            id,
            insuranceCompanyId,
            tierRank,
            areaId,
            providerTypeId,
            specialityId,
            subSpecialityId,
            address,
            websiteUrl,
            hasChronicMedication,
            email,
            isOnline,
            latitude,
            longitude,
            name,
            phoneNumber,
          },
        },
        refetchQueries: [
          {
            query: GET_PROVIDER,
            variables: {
              insuranceCompanyId,
              tierRank,
              areaId,
              providerTypeId,
              specialityId,
              subSpecialityId,
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
