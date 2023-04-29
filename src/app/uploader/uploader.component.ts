import { InsuranceCompanyService } from './../medical-network/insurance-company/insurance-company.service';
import { TpaService } from './../medical-network/tpa/tpa.service';
import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { MessageService, SelectItem } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss'],
})
export class UploaderComponent implements OnInit {
  @ViewChild('fileInput') fileInput: FileUpload;
  languageOptions: SelectItem[] = [
    { label: 'English', value: 'ENGLISH' },
    { label: 'Arabic', value: 'ARABIC' },
  ];
  selectedLanguage: any = { label: 'English', value: 'ENGLISH' };
  tpaOptions: SelectItem[];
  selectedTpa: any;
  insuranceCompanyOptions: SelectItem[];
  selectedInsuranceCompany: any;
  fileToUpload: File = null;

  rsponse$: Observable<any>;
  success = false;
  error: string | undefined;

  fileName = '';

  isLoading: boolean = false;
  uploadUrl = `${environment.API_URI}/csv-uploader/upload`;

  constructor(
    private http: HttpClient,
    private tpaService: TpaService,
    private insuranceCompanyService: InsuranceCompanyService,
    private messageService: MessageService
  ) {}

  onLanguageChange() {
    return this.tpaService
      .getTpas(this.selectedLanguage)
      .subscribe(({ data, error }: any) => {
        if (data) {
          const tpa = data.listAllTpas.tpa;
          this.tpaOptions = tpa.map((tpa) => {
            return {
              tpaId: tpa.id,
              name: tpa.name,
            };
          });
        } else {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error loading TPA Options',
          });
        }
      });
  }

  onTpaChange() {
    if (this.selectedTpa.name) {
      return this.insuranceCompanyService
        .getInsuranceCompanies(this.selectedLanguage, this.selectedTpa.tpaId)
        .subscribe(({ data, error }: any) => {
          if (data) {
            const insuranceCompany =
              data.listAllInsuranceCompaniesByTpaId.insuranceCompany;
            this.insuranceCompanyOptions = insuranceCompany.map((company) => {
              return {
                insuranceCompanyId: company.id,
                name: company.name,
              };
            });
          } else {
            console.log(error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error loading Insurance Company Options',
              life: 1000,
            });
          }
        });
    }
    return null;
  }

  onFileSelect(event) {
    const file: File = event.files[0];
    this.fileName = file.name;
    if (file) {
      this.fileToUpload = file;
      console.log(this.fileToUpload);
    }
  }

  submitForm() {
    this.isLoading = true;
    this.error = null;
    this.success = false;
    const tpaName =
      typeof this.selectedTpa === 'object'
        ? this.selectedTpa.name
        : this.selectedTpa;
    const InsuranceCompanyName =
      typeof this.selectedInsuranceCompany === 'object'
        ? this.selectedInsuranceCompany.name
        : this.selectedInsuranceCompany;
    const formData = new FormData();

    formData.append('file', this.fileToUpload);

    const params = new HttpParams()
      .append('language', this.selectedLanguage)
      .append('tpaName', tpaName)
      .append('insuranceCompanyName', InsuranceCompanyName);

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

    this.rsponse$.subscribe(
      (res) => {
        this.isLoading = false;

        if (res) {
          this.success = true;
          this.isLoading = false;
        }
      },
      (error) => {
        console.error('Error uploading file:', error);
        this.error = 'There was an error uploading the file.';
        this.isLoading = false;
      }
    );
  }

  resetForm() {
    this.fileInput.clear(); // clears the file input field
    this.selectedInsuranceCompany = null;
    this.selectedTpa = null;
    this.fileToUpload = null;
    this.selectedLanguage = null;
    this.success = false;
    this.error = null;
  }
  removeFile() {
    this.fileInput.clear();
    this.fileToUpload = null;
    this.error = null;
  }

  ngOnInit(): void {
    this.tpaService
      .getTpas(this.selectedLanguage.value)
      .subscribe(({ data, error }: any) => {
        if (data) {
          const tpa = data.listAllTpas.tpa;
          this.tpaOptions = tpa.map((tpa) => {
            return {
              tpaId: tpa.id,
              name: tpa.name,
            };
          });
        } else {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error loading TPA Options',
          });
        }
      });
  }
}
