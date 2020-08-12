import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderVerify01Component } from './order-verify01.component';

describe('OrderVerify01Component', () => {
  let component: OrderVerify01Component;
  let fixture: ComponentFixture<OrderVerify01Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderVerify01Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderVerify01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
