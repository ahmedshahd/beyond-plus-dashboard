import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { GET_FAQ, CREATE_FAQ, REMOVE_FAQ } from '../graphql/qraphql.queries';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqComponent implements OnInit {
  faqs: any[] = [];
  error: any;

  faqForm = new FormGroup({
    language: new FormControl('Select Language', Validators.required),
    question: new FormControl('', Validators.required),
    answers: new FormArray([new FormControl()]),
  });

  addAnswers() {
    (<FormArray>this.faqForm.get('answers')).push(new FormControl());
  }
  createFaq() {
    this.apollo
      .mutate({
        mutation: CREATE_FAQ,
        variables: {
          createFaqInput: {
            question: this.faqForm.value.question,
            answers: this.faqForm.value.answers,
          },
          language: this.faqForm.value.language,
        },
        refetchQueries: [
          {
            query: GET_FAQ,
            variables: {
              language: 'ARABIC',
            },
          },
        ],
      })
      .subscribe(
        ({ data }: any) => {
          this.faqs = data.faq;
          this.faqForm.reset();
        },
        (error) => {
          this.error = error;
        }
      );
  }

  removeFaq(id: number) {
    this.apollo
      .mutate({
        mutation: REMOVE_FAQ,
        variables: {
          removeFaqId: id,
        },
        refetchQueries: [
          {
            query: GET_FAQ,
            variables: {
              language: 'ARABIC',
            },
          },
        ],
      })
      .subscribe(
        ({ data }: any) => {
          this.faqs = data.removeFaq;
        },
        (error) => {
          this.error = error;
        }
      );
  }

  constructor(private apollo: Apollo) {}
  get selectedLanguage() {
    return this.faqForm.get('language');
  }
  get question() {
    return this.faqForm.get('question');
  }
  get answers() {
    return this.faqForm.get('answers') as FormArray;
  }

  changeSelectedLanguage(e: any) {
    this.selectedLanguage?.setValue(e.target.value, {
      onlySelf: true,
    });
  }
  getEnglishFaq() {
    this.apollo
      .watchQuery({
        query: GET_FAQ,
        variables: {
          language: 'ENGLISH',
        },
      })
      .valueChanges.subscribe(({ data, error }: any) => {
        this.faqs = data.faq;
        this.error = error;
      });
  }
  getArabicFaq() {
    this.apollo
      .watchQuery({
        query: GET_FAQ,
        variables: {
          language: 'ARABIC',
        },
      })
      .valueChanges.subscribe(({ data, error }: any) => {
        this.faqs = data.faq;
        this.error = error;
      });
  }

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: GET_FAQ,
        variables: {
          language: 'ARABIC',
        },
      })
      .valueChanges.subscribe(({ data, error }: any) => {
        this.faqs = data.faq;
        this.error = error;
      });
  }
}
