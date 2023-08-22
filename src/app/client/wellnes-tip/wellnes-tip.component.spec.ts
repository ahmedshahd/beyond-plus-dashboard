import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WellnesTipComponent } from './wellnes-tip.component';

describe('WellnesTipComponent', () => {
  let component: WellnesTipComponent;
  let fixture: ComponentFixture<WellnesTipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WellnesTipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WellnesTipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
