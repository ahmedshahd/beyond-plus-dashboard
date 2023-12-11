import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LineOfBusinessService } from './line-of-business.service';

@Component({
  selector: 'app-line-of-business',
  templateUrl: './line-of-business.component.html',
  styleUrls: ['./line-of-business.component.scss'],
})
export class LineOfBusinessComponent implements OnInit {
  lineOfBusinesses: any[] = [];
  error: any;
  refetchLanguage: string = 'ARABIC';

  lineOfBusinessForm = new FormGroup({
    language: new FormControl('Select Language', Validators.required),
    description: new FormControl('', Validators.required),
    details: new FormControl('', Validators.required),
    image: new FormControl(null, Validators.required),
    name: new FormControl('', Validators.required),
  });
  constructor(private lineOfBusinessService: LineOfBusinessService) {}

  ngOnInit(): void {
    this.getLineOfBusiness();
  }

  onFileChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const { files } = target;
    if (files && files.length) {
      this.lineOfBusinessForm.get('image').setValue(files[0]);
    }
  }

  createLineOfBusiness() {
    const image = this.lineOfBusinessForm.value.image;
    const createLineOfBusinessInput = {
      name: this.lineOfBusinessForm.value.name,
      description: this.lineOfBusinessForm.value.description,
      imageUrl: this.lineOfBusinessForm.value.imageUrl,
      details: this.lineOfBusinessForm.value.details,
    };

    this.lineOfBusinessService
      .createLineOfBusiness(
        createLineOfBusinessInput,
        this.lineOfBusinessForm.value.language,
        this.lineOfBusinessForm.value.image
      )
      .subscribe(
        ({ data }: any) => {
          this.lineOfBusinessForm.reset();
        },
        (error) => {
          this.error = error;
        }
      );
  }

  removeLineOfBusiness(id: number) {
    this.lineOfBusinessService
      .removeLineOfBusiness(id, this.refetchLanguage)
      .subscribe(
        ({ data }: any) => {
          // Handle success if needed...
        },
        (error) => {
          this.error = error;
        }
      );
  }

  getLineOfBusiness(): void {
    this.lineOfBusinessService
      .getLineOfBusiness(this.refetchLanguage)
      .subscribe(
        ({ data }: any) => {
          this.lineOfBusinesses = data.lineOfBusiness;
        },
        (error) => {
          this.error = error;
        }
      );
  }
  get selectedLanguage() {
    return this.lineOfBusinessForm.get('language');
  }
  get description() {
    return this.lineOfBusinessForm.get('description');
  }
  get name() {
    return this.lineOfBusinessForm.get('name');
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
    this.refetchLanguage = 'ENGLISH';
    this.getLineOfBusiness();
  }
  getArabicLineOfBusiness() {
    this.refetchLanguage = 'ARABIC';
    this.getLineOfBusiness();
  }
}
