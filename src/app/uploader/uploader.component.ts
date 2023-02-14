import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss'],
})
export class UploaderComponent implements OnInit {
  rsponse$: Observable<any>;
  success = false;
  fileName = '';
  uploadUrl = 'https://plus.beyond-solution.com/uploader/upload';

  uploaderForm: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.uploaderForm = this.fb.group({
      tpaName: ['', Validators.required],
      insuranceCompanyName: ['', Validators.required],
      language: ['', Validators.required],
      file: [null, Validators.required],
    });
  }

  get selectedLanguage() {
    return this.uploaderForm.get('language');
  }

  changeSelectedLanguage(e: any) {
    this.selectedLanguage?.setValue(e.target.value, {
      onlySelf: true,
    });
  }
  uploadFile(event) {
    const file: File = (event.target as HTMLInputElement).files[0];
    console.log('file', file);
    if (file) {
      this.uploaderForm.patchValue({
        file: file,
      });
      this.uploaderForm.get('file').updateValueAndValidity();
    }
  }

  submitForm() {
    const formData = new FormData();

    formData.append('file', this.uploaderForm.get('file').value);
    console.log('formData', formData);

    const params = new HttpParams()
      .set('language', this.uploaderForm.get('language').value)
      .set('tpaName', this.uploaderForm.get('tpaName').value)
      .set(
        'insuranceCompanyName',
        this.uploaderForm.get('insuranceCompanyName').value
      );
    let headers = new HttpHeaders();
    headers.append('api-key', '2ab9c3d4e5f91ab7c3d4e5f6');

    this.rsponse$ = this.http.post(this.uploadUrl, formData, {
      params: params,
      headers: {
        'api-key': '2ab9c3d4e5f91ab7c3d4e5f6',
        accept: '*/*',
      },
    });

    this.rsponse$.subscribe((res) => {
      console.log(res);
      if (res) {
        this.success = true;
        this.uploaderForm.reset();
      }
    });
  }

  ngOnInit(): void {}
}
