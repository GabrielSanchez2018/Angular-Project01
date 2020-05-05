import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCreateDeleteDialogComponent } from './service-create-delete-dialog.component';

describe('ServiceCreateDeleteDialogComponent', () => {
  let component: ServiceCreateDeleteDialogComponent;
  let fixture: ComponentFixture<ServiceCreateDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceCreateDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceCreateDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
