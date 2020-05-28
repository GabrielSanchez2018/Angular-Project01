import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarcodeInfoComponent } from './barcode-info.component';

describe('BarcodeInfoComponent', () => {
  let component: BarcodeInfoComponent;
  let fixture: ComponentFixture<BarcodeInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarcodeInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarcodeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
