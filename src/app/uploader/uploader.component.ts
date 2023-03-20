import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss'],
})
export class UploaderComponent implements OnInit {
  rsponse$: Observable<any>;
  success = false;
  fileName = '';

  uploadUrl = 'https://plus.beyond-solution.com/csv-uploader/upload';
  // uploadUrl = 'https://beyond-plus.onrender.com/csv-uploader/upload';

  // uploadUrl = 'http://localhost:8000/csv-uploader/upload';

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

    const params = new HttpParams()
      .append('language', this.uploaderForm.get('language').value)
      .append('tpaName', this.uploaderForm.get('tpaName').value)
      .append(
        'insuranceCompanyName',
        this.uploaderForm.get('insuranceCompanyName').value
      );

    let headers = new HttpHeaders();
    headers.append('api-key', environment.API_KEY);

    this.rsponse$ = this.http.post(this.uploadUrl, formData, {
      params: params,
      headers: {
        'api-key': environment.API_KEY,
        accept: '*/*',
        // 'Content-Type': 'multipart/form-data',
      },
    });

    this.rsponse$.subscribe((res) => {
      if (res) {
        this.success = true;
        this.uploaderForm.reset();
      }
    });
  }

  ngOnInit(): void {}
}
