import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import {
  CREATE_LINE_OF_BUSINESS,
  GET_LINE_OF_BUSINESS,
  REMOVE_LINE_OF_BUSINESS,
} from '../graphql/qraphql.queries';

@Component({
  selector: 'app-line-of-business',
  templateUrl: './line-of-business.component.html',
  styleUrls: ['./line-of-business.component.scss'],
})
export class LineOfBusinessComponent implements OnInit {
  lineOfBusinesses: any[] = [];
  error: any;

  lineOfBusinessForm = new FormGroup({
    language: new FormControl('Select Language', Validators.required),
    description: new FormControl('', Validators.required),
    details: new FormControl('', Validators.required),
    imageUrl: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
  });

  createLineOfBusiness() {
    console.log('object', this.lineOfBusinessForm.value);
    this.apollo
      .mutate({
        mutation: CREATE_LINE_OF_BUSINESS,
        variables: {
          createLineOfBusinessInput: {
            description: this.lineOfBusinessForm.value.description,
            imageUrl: this.lineOfBusinessForm.value.imageUrl,
            name: this.lineOfBusinessForm.value.name,
            details: this.lineOfBusinessForm.value.details,
          },
          language: this.lineOfBusinessForm.value.language,
        },
        refetchQueries: [
          {
            query: GET_LINE_OF_BUSINESS,
            variables: {
              language: 'ARABIC',
            },
          },
        ],
      })
      .subscribe(
        ({ data }: any) => {
          this.lineOfBusinesses = data.lineOfBusiness;
          this.lineOfBusinessForm.reset();
        },
        (error) => {
          this.error = error;
        }
      );
  }

  removeLineOfBusiness(id: number) {
    this.apollo
      .mutate({
        mutation: REMOVE_LINE_OF_BUSINESS,
        variables: {
          removeLineOfBusinessId: id,
        },
        refetchQueries: [
          {
            query: GET_LINE_OF_BUSINESS,
            variables: {
              language: 'ARABIC',
            },
          },
        ],
      })
      .subscribe(
        ({ data }: any) => {
          this.lineOfBusinesses = data.lineOfBusiness;
        },
        (error) => {
          this.error = error;
        }
      );
  }

  constructor(private apollo: Apollo) {}
  get selectedLanguage() {
    return this.lineOfBusinessForm.get('language');
  }
  get description() {
    return this.lineOfBusinessForm.get('description');
  }
  get name() {
    return this.lineOfBusinessForm.get('name');
  }
  get imageUrl() {
    return this.lineOfBusinessForm.get('imageUrl');
  }
  get details() {
    return this.lineOfBusinessForm.get('details');
  }

  changeSelectedLanguage(e: any) {
    this.selectedLanguage?.setValue(e.target.value, {
      onlySelf: true,
    });
  }
  getEnglishLineOfBusiness() {
    this.apollo
      .watchQuery({
        query: GET_LINE_OF_BUSINESS,
        variables: {
          language: 'ENGLISH',
        },
      })
      .valueChanges.subscribe(({ data, error }: any) => {
        this.lineOfBusinesses = data.lineOfBusiness;
        this.error = error;
      });
  }
  getArabicLineOfBusiness() {
    this.apollo
      .watchQuery({
        query: GET_LINE_OF_BUSINESS,
        variables: {
          language: 'ARABIC',
        },
      })
      .valueChanges.subscribe(({ data, error }: any) => {
        this.lineOfBusinesses = data.lineOfBusiness;
        this.error = error;
      });
  }

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: GET_LINE_OF_BUSINESS,
        variables: {
          language: 'ARABIC',
        },
      })
      .valueChanges.subscribe(({ data, error }: any) => {
        this.lineOfBusinesses = data.lineOfBusiness;
        this.error = error;
      });
  }
}
