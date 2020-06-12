import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarcodeInfo01Component } from './barcode-info01.component';

describe('BarcodeInfo01Component', () => {
  let component: BarcodeInfo01Component;
  let fixture: ComponentFixture<BarcodeInfo01Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarcodeInfo01Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarcodeInfo01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
