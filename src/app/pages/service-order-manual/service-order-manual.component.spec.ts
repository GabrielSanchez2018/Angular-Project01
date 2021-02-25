import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceOrderManualComponent } from './service-order-manual.component';

describe('ServiceOrderManualComponent', () => {
  let component: ServiceOrderManualComponent;
  let fixture: ComponentFixture<ServiceOrderManualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceOrderManualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceOrderManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
