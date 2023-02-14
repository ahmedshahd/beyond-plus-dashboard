import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import {
  CREATE_WELCOME_SCREEN,
  GET_WELCOME_SCREEN,
  REMOVE_WELCOME_SCREEN,
} from '../graphql/qraphql.queries';

@Component({
  selector: 'app-welcome-screen',
  templateUrl: './welcome-screen.component.html',
  styleUrls: ['./welcome-screen.component.scss'],
})
export class WelcomeScreenComponent implements OnInit {
  welcomeScreens: any[] = [];
  error: any;

  welcomeScreenForm = new FormGroup({
    language: new FormControl('Select Language', Validators.required),
    title: new FormControl('', Validators.required),
    text: new FormControl('', Validators.required),
    imageUrl: new FormControl('', Validators.required),
  });

  createWelcomeScreen() {
    this.apollo
      .mutate({
        mutation: CREATE_WELCOME_SCREEN,
        variables: {
          createWelcomeScreenInput: {
            title: this.welcomeScreenForm.value.title,
            imageUrl: this.welcomeScreenForm.value.imageUrl,
            text: this.welcomeScreenForm.value.text,
          },
          language: this.welcomeScreenForm.value.language,
        },
        refetchQueries: [
          {
            query: GET_WELCOME_SCREEN,
            variables: {
              language: 'ARABIC',
            },
          },
        ],
      })
      .subscribe(
        ({ data }: any) => {
          this.welcomeScreens = data.welcomeScreen;
          this.welcomeScreenForm.reset();
        },
        (error) => {
          this.error = error;
        }
      );
  }

  removeWelcomeScreen(id: number) {
    this.apollo
      .mutate({
        mutation: REMOVE_WELCOME_SCREEN,
        variables: {
          removewelcomeScreenId: id,
        },
        refetchQueries: [
          {
            query: GET_WELCOME_SCREEN,
            variables: {
              language: 'ARABIC',
            },
          },
        ],
      })
      .subscribe(
        ({ data }: any) => {
          this.welcomeScreens = data.welcomeScreen;
        },
        (error) => {
          this.error = error;
        }
      );
  }

  constructor(private apollo: Apollo) {}
  get selectedLanguage() {
    return this.welcomeScreenForm.get('language');
  }
  get title() {
    return this.welcomeScreenForm.get('title');
  }
  get text() {
    return this.welcomeScreenForm.get('text');
  }
  get imageUrl() {
    return this.welcomeScreenForm.get('imageUrl');
  }

  changeSelectedLanguage(e: any) {
    this.selectedLanguage?.setValue(e.target.value, {
      onlySelf: true,
    });
  }
  getEnglishWelcomeScreen() {
    this.apollo
      .watchQuery({
        query: GET_WELCOME_SCREEN,
        variables: {
          language: 'ENGLISH',
        },
      })
      .valueChanges.subscribe(({ data, error }: any) => {
        this.welcomeScreens = data.welcomeScreen;
        this.error = error;
      });
  }
  getArabicWelcomeScreen() {
    this.apollo
      .watchQuery({
        query: GET_WELCOME_SCREEN,
        variables: {
          language: 'ARABIC',
        },
      })
      .valueChanges.subscribe(({ data, error }: any) => {
        this.welcomeScreens = data.welcomeScreen;
        this.error = error;
      });
  }

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: GET_WELCOME_SCREEN,
        variables: {
          language: 'ARABIC',
        },
      })
      .valueChanges.subscribe(({ data, error }: any) => {
        this.welcomeScreens = data.welcomeScreen;
        this.error = error;
      });
  }
}
