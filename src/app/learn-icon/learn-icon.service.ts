import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  CREATE_LEARN_ICON,
  GET_LEARN_ICON,
  REMOVE_LEARN_ICON,
} from '../graphql/qraphql.queries';


@Injectable({
  providedIn: 'root',
})
export class LearnIconService {
  constructor(private apollo: Apollo) {}

  createLearnIcon(createLearnIconInput: any, language: string, image: any) {
    return this.apollo.mutate({
      mutation: CREATE_LEARN_ICON,
      variables: {
        createLearnIconInput,
        language,
        image,
      },
      refetchQueries: [{ query: GET_LEARN_ICON, variables: { language } }],
    });
  }


  removeLearnIcon(id: number, language: string) {
    return this.apollo.mutate({
      mutation: REMOVE_LEARN_ICON,
      variables: { removeLearnIconId: id },
      refetchQueries: [{ query: GET_LEARN_ICON, variables: { language } }],
    });
  }

  getLearnIcon(language: string) {
    return this.apollo.watchQuery({
      query: GET_LEARN_ICON,
      variables: { language },
    }).valueChanges;
  }
}
