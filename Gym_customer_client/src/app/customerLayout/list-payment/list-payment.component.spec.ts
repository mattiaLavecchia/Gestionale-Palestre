import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPaymentComponent } from './list-payment.component';

describe('ListPaymentComponent', () => {
  let component: ListPaymentComponent;
  let fixture: ComponentFixture<ListPaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListPaymentComponent]
    });
    fixture = TestBed.createComponent(ListPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
