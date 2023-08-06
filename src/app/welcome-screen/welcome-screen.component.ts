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
  refetchLanguage: string = 'ARABIC';

  welcomeScreenForm = new FormGroup({
    language: new FormControl('Select Language', Validators.required),
    title: new FormControl('', Validators.required),
    text: new FormControl('', Validators.required),
    images: new FormControl(null, Validators.required),
  });
  onFileChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const { files } = target;
    if (files && files.length) {
      // Convert the FileList to an array
      const fileList: File[] = Array.from(files);
      this.welcomeScreenForm.get('images').setValue(fileList);
    }
  }


  removeImage(index: number) {
    const images = this.welcomeScreenForm.get('images').value;
    images.splice(index, 1);
    this.welcomeScreenForm.get('images').setValue([...images]);
  }
  createWelcomeScreen() {
    const images = this.welcomeScreenForm.value.images;
    this.apollo
      .mutate({
        mutation: CREATE_WELCOME_SCREEN,
        variables: {
          createWelcomeScreenInput: {
            title: this.welcomeScreenForm.value.title,
            text: this.welcomeScreenForm.value.text,
          },
          images,
          language: this.welcomeScreenForm.value.language,
        },
        refetchQueries: [
          {
            query: GET_WELCOME_SCREEN,
            variables: {
              language: this.refetchLanguage,
            },
          },
        ],
      })
      .subscribe(
        ({ data }: any) => {
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
          removeWelcomeScreenId: id,
        },
        refetchQueries: [
          {
            query: GET_WELCOME_SCREEN,
            variables: {
              language: this.refetchLanguage,
            },
          },
        ],
      })
      .subscribe(
        ({ data }: any) => {
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


  changeSelectedLanguage(e: any) {
    this.selectedLanguage?.setValue(e.target.value, {
      onlySelf: true,
    });
  }
  getEnglishWelcomeScreen() {
    this.refetchLanguage = 'ENGLISH';

    this.apollo
      .watchQuery({
        query: GET_WELCOME_SCREEN,
        variables: {
          language: this.refetchLanguage,
        },
      })
      .valueChanges.subscribe(({ data, error }: any) => {
        this.welcomeScreens = data.welcomeScreen;
        this.error = error;
      });
  }
  getArabicWelcomeScreen() {
    this.refetchLanguage = 'ARABIC';

    this.apollo
      .watchQuery({
        query: GET_WELCOME_SCREEN,
        variables: {
          language: this.refetchLanguage,
        },
      })
      .valueChanges.subscribe(({ data, error }: any) => {
        this.error = error;
      });
  }

  getWelcomeScreen() {
    this
  }
  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: GET_WELCOME_SCREEN,
        variables: {
          language: this.refetchLanguage,
        },
      })
      .valueChanges.subscribe(({ data, error }: any) => {
        this.welcomeScreens = data.welcomeScreen;
        this.error = error;
      });
  }
}
