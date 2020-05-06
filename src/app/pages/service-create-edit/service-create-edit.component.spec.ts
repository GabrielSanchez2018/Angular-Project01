import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCreateEditComponent } from './service-create-edit.component';

describe('ServiceCreateEditComponent', () => {
  let component: ServiceCreateEditComponent;
  let fixture: ComponentFixture<ServiceCreateEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceCreateEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
