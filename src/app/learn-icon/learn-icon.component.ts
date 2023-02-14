import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import {
  CREATE_LEARN_ICON,
  GET_LEARN_ICON,
  REMOVE_LEARN_ICON,
} from '../graphql/qraphql.queries';

@Component({
  selector: 'app-learn-icon',
  templateUrl: './learn-icon.component.html',
  styleUrls: ['./learn-icon.component.scss'],
})
export class LearnIconComponent implements OnInit {
  learnIcons: any[] = [];
  error: any;

  learnIconForm = new FormGroup({
    name: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
    language: new FormControl('Select Language', Validators.required),
  });

  createLearnIcon() {
    this.apollo
      .mutate({
        mutation: CREATE_LEARN_ICON,
        variables: {
          createLearnIconInput: {
            name: this.learnIconForm.value.name,
            content: this.learnIconForm.value.content,
          },
          language: this.learnIconForm.value.language,
        },
        refetchQueries: [
          {
            query: GET_LEARN_ICON,
            variables: {
              language: 'ARABIC',
            },
          },
        ],
      })
      .subscribe(
        ({ data }: any) => {
          this.learnIcons = data.learnIcon;
          this.learnIconForm.reset();
        },
        (error) => {
          this.error = error;
        }
      );
  }

  removeLearnIcon(id: number) {
    this.apollo
      .mutate({
        mutation: REMOVE_LEARN_ICON,
        variables: {
          removeLearnIconId: id,
        },
        refetchQueries: [
          {
            query: GET_LEARN_ICON,
            variables: {
              language: 'ARABIC',
            },
          },
        ],
      })
      .subscribe(
        ({ data }: any) => {
          this.learnIcons = data.removeLearnIcon;
        },
        (error) => {
          this.error = error;
        }
      );
  }

  constructor(private apollo: Apollo) {}
  get selectedLanguage() {
    return this.learnIconForm.get('language');
  }
  get question() {
    return this.learnIconForm.get('question');
  }

  changeSelectedLanguage(e: any) {
    this.selectedLanguage?.setValue(e.target.value, {
      onlySelf: true,
    });
  }
  getEnglishLearnIcon() {
    this.apollo
      .watchQuery({
        query: GET_LEARN_ICON,
        variables: {
          language: 'ENGLISH',
        },
      })
      .valueChanges.subscribe(({ data, error }: any) => {
        this.learnIcons = data.learnIcon;
        this.error = error;
      });
  }
  getArabicLearnIcon() {
    this.apollo
      .watchQuery({
        query: GET_LEARN_ICON,
        variables: {
          language: 'ARABIC',
        },
      })
      .valueChanges.subscribe(({ data, error }: any) => {
        this.learnIcons = data.learnIcon;
        this.error = error;
      });
  }

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: GET_LEARN_ICON,
        variables: {
          language: 'ARABIC',
        },
      })
      .valueChanges.subscribe(({ data, error }: any) => {
        this.learnIcons = data.learnIcon;
        this.error = error;
      });
  }
}
