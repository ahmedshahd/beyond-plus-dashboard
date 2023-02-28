import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubSpecialityComponent } from './sub-speciality.component';

describe('SubSpecialityComponent', () => {
  let component: SubSpecialityComponent;
  let fixture: ComponentFixture<SubSpecialityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubSpecialityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubSpecialityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
