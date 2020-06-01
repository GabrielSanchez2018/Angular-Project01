import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInEmployeeeComponent } from './sign-in-employeee.component';

describe('SignInEmployeeeComponent', () => {
  let component: SignInEmployeeeComponent;
  let fixture: ComponentFixture<SignInEmployeeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignInEmployeeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInEmployeeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
