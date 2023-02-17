import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import {
  CREATE_PRIVACY_POLICY,
  GET_PRIVACY_POLICY,
  REMOVE_PRIVACY_POLICY,
} from '../graphql/qraphql.queries';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss'],
})
export class PrivacyPolicyComponent {
  privacyPolicies: any[] = [];
  error: any;
  refetchLanguage: string = 'ARABIC';

  privacyPolicyForm = new FormGroup({
    language: new FormControl('Select Language', Validators.required),
    text: new FormControl('', Validators.required),
  });

  createPrivacyPolicy() {
    this.apollo
      .mutate({
        mutation: CREATE_PRIVACY_POLICY,
        variables: {
          createPrivacyPolicyInput: {
            text: this.privacyPolicyForm.value.text,
          },
          language: this.privacyPolicyForm.value.language,
        },
        refetchQueries: [
          {
            query: GET_PRIVACY_POLICY,
            variables: {
              language: this.refetchLanguage,
            },
          },
        ],
      })
      .subscribe(
        ({ data }: any) => {
          this.privacyPolicies = data.privacyPolicy;
          this.privacyPolicyForm.reset();
        },
        (error) => {
          this.error = error;
        }
      );
  }

  removePrivacyPolicy(id: number) {
    this.apollo
      .mutate({
        mutation: REMOVE_PRIVACY_POLICY,
        variables: {
          privacyPolicyId: id,
        },
        refetchQueries: [
          {
            query: GET_PRIVACY_POLICY,

            variables: {
              language: this.refetchLanguage,
            },
          },
        ],
      })
      .subscribe(
        ({ data }: any) => {
          this.privacyPolicies = data.removePrivacyPolicy;
        },
        (error) => {
          this.error = error;
        }
      );
  }

  constructor(private apollo: Apollo) {}
  get selectedLanguage() {
    return this.privacyPolicyForm.get('language');
  }
  get text() {
    return this.privacyPolicyForm.get('text');
  }

  changeSelectedLanguage(e: any) {
    console.log(this.changeSelectedLanguage);

    this.selectedLanguage?.setValue(e.target.value, {
      onlySelf: true,
    });
  }
  getEnglishPrivacyPolicy() {
    this.refetchLanguage = 'ENGLISH';
    this.apollo
      .watchQuery({
        query: GET_PRIVACY_POLICY,
        variables: {
          language: this.refetchLanguage,
        },
      })
      .valueChanges.subscribe(({ data, error }: any) => {
        this.privacyPolicies = data.privacyPolicy;
        this.error = error;
      });
  }
  getArabicPrivacyPolicy() {
    this.refetchLanguage = 'ARABIC';

    this.apollo
      .watchQuery({
        query: GET_PRIVACY_POLICY,
        variables: {
          language: this.refetchLanguage,
        },
      })
      .valueChanges.subscribe(({ data, error }: any) => {
        this.privacyPolicies = data.privacyPolicy;
        this.error = error;
      });
  }

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: GET_PRIVACY_POLICY,
        variables: {
          language: this.refetchLanguage,
        },
      })
      .valueChanges.subscribe(({ data, error }: any) => {
        this.privacyPolicies = data.privacyPolicy;
        this.error = error;
      });
  }
}
