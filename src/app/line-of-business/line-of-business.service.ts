import { LineOfBusinessComponent } from './line-of-business.component';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';

import {
  CREATE_LINE_OF_BUSINESS,
  GET_LINE_OF_BUSINESS,
  REMOVE_LINE_OF_BUSINESS,
} from '../graphql/qraphql.queries';

@Injectable({
  providedIn: 'root',
})
export class LineOfBusinessService {
  constructor(private apollo: Apollo) {}

  createLineOfBusiness(
    createLineOfBusinessInput: any,
    language: string,
    image: any
  ) {
    return this.apollo.mutate({
      mutation: CREATE_LINE_OF_BUSINESS,
      variables: {
        createLineOfBusinessInput,
        language,
        image,
      },
      refetchQueries: [
        { query: GET_LINE_OF_BUSINESS, variables: { language } },
      ],
    });
  }

  removeLineOfBusiness(id: number, language: string) {
    return this.apollo.mutate({
      mutation: REMOVE_LINE_OF_BUSINESS,
      variables: { removeLineOfBusinessId: id },
      refetchQueries: [
        { query: GET_LINE_OF_BUSINESS, variables: { language } },
      ],
    });
  }

  getLineOfBusiness(language: string) {
    return this.apollo.watchQuery({
      query: GET_LINE_OF_BUSINESS,
      variables: { language },
    }).valueChanges;
  }
}
