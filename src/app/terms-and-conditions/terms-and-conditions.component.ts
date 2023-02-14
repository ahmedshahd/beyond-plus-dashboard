import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import {
  CREATE_TERMS_AND_CONDITIONS,
  GET_TERMS_AND_CONDITIONS,
  REMOVE_TERMS_AND_CONDITIONS,
} from '../graphql/qraphql.queries';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss'],
})
export class TermsAndConditionsComponent implements OnInit {
  termsAndConditions: any[] = [];
  error: any;

  termsAndConditionsForm = new FormGroup({
    language: new FormControl('Select Language', Validators.required),
    text: new FormControl('', Validators.required),
  });

  createTermsAndConditions() {
    this.apollo
      .mutate({
        mutation: CREATE_TERMS_AND_CONDITIONS,
        variables: {
          createTermsAndConditionsInput: {
            text: this.termsAndConditionsForm.value.text,
          },
          language: this.termsAndConditionsForm.value.language,
        },
        refetchQueries: [
          {
            query: GET_TERMS_AND_CONDITIONS,
            variables: {
              language: 'ARABIC',
            },
          },
        ],
      })
      .subscribe(
        ({ data }: any) => {
          this.termsAndConditions = data.termsAndConditions;
          this.termsAndConditionsForm.reset();
        },
        (error) => {
          this.error = error;
        }
      );
  }

  removeTermsAndConditions(id: number) {
    this.apollo
      .mutate({
        mutation: REMOVE_TERMS_AND_CONDITIONS,
        variables: {
          removeTermsAndConditionsId: id,
        },
        refetchQueries: [
          {
            query: GET_TERMS_AND_CONDITIONS,
            variables: {
              language: 'ARABIC',
            },
          },
        ],
      })
      .subscribe(
        ({ data }: any) => {
          this.termsAndConditions = data.removeTermsAndConditions;
        },
        (error) => {
          this.error = error;
        }
      );
  }

  constructor(private apollo: Apollo) {}
  get selectedLanguage() {
    return this.termsAndConditionsForm.get('language');
  }
  get text() {
    return this.termsAndConditionsForm.get('text');
  }

  changeSelectedLanguage(e: any) {
    this.selectedLanguage?.setValue(e.target.value, {
      onlySelf: true,
    });
  }
  getEnglishTermsAndConditions() {
    this.apollo
      .watchQuery({
        query: GET_TERMS_AND_CONDITIONS,
        variables: {
          language: 'ENGLISH',
        },
      })
      .valueChanges.subscribe(({ data, error }: any) => {
        this.termsAndConditions = data.termsAndConditions;
        this.error = error;
      });
  }
  getArabicTermsAndConditions() {
    this.apollo
      .watchQuery({
        query: GET_TERMS_AND_CONDITIONS,
        variables: {
          language: 'ARABIC',
        },
      })
      .valueChanges.subscribe(({ data, error }: any) => {
        this.termsAndConditions = data.termsAndConditions;
        this.error = error;
      });
  }

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: GET_TERMS_AND_CONDITIONS,
        variables: {
          language: 'ARABIC',
        },
      })
      .valueChanges.subscribe(({ data, error }: any) => {
        this.termsAndConditions = data.termsAndConditions;
        this.error = error;
      });
  }
}
