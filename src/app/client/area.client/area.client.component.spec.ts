import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaClientComponent } from './area.client.component';

describe('AreaClientComponent', () => {
  let component: AreaClientComponent;
  let fixture: ComponentFixture<AreaClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreaClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreaClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
