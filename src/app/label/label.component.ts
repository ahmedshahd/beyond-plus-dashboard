import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  CREATE_LABEL,
  GET_LABEL,
  REMOVE_LABEL,
} from '../graphql/qraphql.queries';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss'],
})
export class LabelComponent implements OnInit {
  labels: any[] = [];
  error: any;

  labelForm = new FormGroup({
    language: new FormControl('Select Language', Validators.required),
    name: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
  });

  createLabel() {
    this.apollo
      .mutate({
        mutation: CREATE_LABEL,
        variables: {
          createLabelInput: {
            name: this.labelForm.value.name,
            content: this.labelForm.value.content,
          },
          language: this.labelForm.value.language,
        },
        refetchQueries: [
          {
            query: GET_LABEL,
            variables: {
              language: 'ARABIC',
            },
          },
        ],
      })
      .subscribe(
        ({ data }: any) => {
          this.labels = data.label;
          this.labelForm.reset();
        },
        (error) => {
          this.error = error;
        }
      );
  }

  removeLabel(id: number) {
    this.apollo
      .mutate({
        mutation: REMOVE_LABEL,
        variables: {
          removeLabelId: id,
        },
        refetchQueries: [
          {
            query: GET_LABEL,
            variables: {
              language: 'ARABIC',
            },
          },
        ],
      })
      .subscribe(
        ({ data }: any) => {
          this.labels = data.removeLabel;
        },
        (error) => {
          this.error = error;
        }
      );
  }

  constructor(private apollo: Apollo) {}
  get selectedLanguage() {
    return this.labelForm.get('language');
  }
  get name() {
    return this.labelForm.get('name');
  }
  get content() {
    return this.labelForm.get('content');
  }

  changeSelectedLanguage(e: any) {
    this.selectedLanguage?.setValue(e.target.value, {
      onlySelf: true,
    });
  }
  getEnglishLabel() {
    this.apollo
      .watchQuery({
        query: GET_LABEL,
        variables: {
          language: 'ENGLISH',
        },
      })
      .valueChanges.subscribe(({ data, error }: any) => {
        this.labels = data.label;
        this.error = error;
      });
  }
  getArabicLabel() {
    this.apollo
      .watchQuery({
        query: GET_LABEL,
        variables: {
          language: 'ARABIC',
        },
      })
      .valueChanges.subscribe(({ data, error }: any) => {
        this.labels = data.label;
        this.error = error;
      });
  }

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: GET_LABEL,
        variables: {
          language: 'ARABIC',
        },
      })
      .valueChanges.subscribe(({ data, error }: any) => {
        this.labels = data.label;
        this.error = error;
      });
  }
}
