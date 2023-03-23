import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityClientComponent } from './city.client.component';

describe('CityClientComponent', () => {
  let component: CityClientComponent;
  let fixture: ComponentFixture<CityClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CityClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CityClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
