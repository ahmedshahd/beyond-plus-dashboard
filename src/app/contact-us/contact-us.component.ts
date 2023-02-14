import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import {
  CREATE_CONTACT_US,
  GET_CONTACT_US,
  REMOVE_CONTACT_US,
} from '../graphql/qraphql.queries';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent implements OnInit {
  contactUs: any[] = [];
  error: any;

  contactUsForm = new FormGroup({
    email: new FormControl('', Validators.required),
    websiteUrl: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
  });

  createContactUs() {
    this.apollo
      .mutate({
        mutation: CREATE_CONTACT_US,
        variables: {
          createContactUsInput: {
            email: this.contactUsForm.value.email,
            websiteUrl: this.contactUsForm.value.websiteUrl,
            phoneNumber: this.contactUsForm.value.phoneNumber,
          },
        },
        refetchQueries: [
          {
            query: GET_CONTACT_US,
          },
        ],
      })
      .subscribe(
        ({ data }: any) => {
          this.contactUs = data.contactUs;
          this.contactUsForm.reset();
        },
        (error) => {
          this.error = error;
        }
      );
  }

  removeContactUs(id: number) {
    this.apollo
      .mutate({
        mutation: REMOVE_CONTACT_US,
        variables: {
          removeContactUslId: id,
        },
        refetchQueries: [
          {
            query: GET_CONTACT_US,
          },
        ],
      })
      .subscribe(
        ({ data }: any) => {
          this.contactUs = data.removeContactUs;
        },
        (error) => {
          this.error = error;
        }
      );
  }

  constructor(private apollo: Apollo) {}
  get email() {
    return this.contactUsForm.get('email');
  }
  get websiteUrl() {
    return this.contactUsForm.get('websiteUrl');
  }
  get phoneNumber() {
    return this.contactUsForm.get('phoneNumber');
  }

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: GET_CONTACT_US,
      })
      .valueChanges.subscribe(({ data, error }: any) => {
        this.contactUs = data.contactUs;
        this.error = error;
      });
  }
}
