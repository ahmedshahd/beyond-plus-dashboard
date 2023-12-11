import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LearnIconService } from './learn-icon.service';

@Component({
  selector: 'app-learn-icon',
  templateUrl: './learn-icon.component.html',
  styleUrls: ['./learn-icon.component.scss'],
})
export class LearnIconComponent implements OnInit {
  learnIcons: any[] = [];
  error: any;
  refetchLanguage: string = 'ARABIC';

  learnIconForm = new FormGroup({
    name: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
    image: new FormControl(),
    language: new FormControl('Select Language', Validators.required),
  });

  constructor(private learnIconService: LearnIconService) {}

  ngOnInit(): void {
    this.getLearnIcons();
  }

  private getLearnIcons(): void {
    this.learnIconService
      .getLearnIcon(this.refetchLanguage)
      .subscribe(({ data, error }: any) => {
        this.learnIcons = data.learnIcon;
        this.error = error;
      });
  }

  onFileChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const { files } = target;
    if (files && files.length) {
      this.learnIconForm.get('image').setValue(files[0]);
    }

  }

  createLearnIcon(): void {
    const createLearnIconInput = {
      name: this.learnIconForm.value.name,
      content: this.learnIconForm.value.content,
    };

    this.learnIconService
      .createLearnIcon(
        createLearnIconInput,
        this.learnIconForm.value.language,
        this.learnIconForm.value.image
      )
      .subscribe(
        ({ data }: any) => {
          this.learnIconForm.reset();
        },
        (error) => {
          this.error = error;
        }
      );
  }

  removeLearnIcon(id: number): void {
    this.learnIconService.removeLearnIcon(id, this.refetchLanguage).subscribe(
      ({ data }: any) => {},
      (error) => {
        this.error = error;
      }
    );
  }

  get selectedLanguage() {
    return this.learnIconForm.get('language');
  }

  changeSelectedLanguage(e: any) {
    this.selectedLanguage?.setValue(e.target.value, {
      onlySelf: true,
    });
  }
  getEnglishLearnIcon() {
    this.refetchLanguage = 'ENGLISH';

    this.getLearnIcons();
  }
  getArabicLearnIcon() {
    this.refetchLanguage = 'ARABIC';
    this.getLearnIcons();
  }
}
