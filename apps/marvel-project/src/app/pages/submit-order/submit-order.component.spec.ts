import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitOrderComponent } from './submit-order.component';
import {DashboardService} from "../services/dashboard/dashboard.service";
import {OrderService} from "../services/order/order.service";

describe('SubmitOrderComponent', () => {
  let component: SubmitOrderComponent;
  let fixture: ComponentFixture<SubmitOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmitOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should use the user name from the service', async () => {
  //   let fixture=TestBed.createComponent(SubmitOrderComponent);
  //   let app=fixture.debugElement.componentInstance;
  //   let orderService=fixture.debugElement.injector.get(OrderService);
  //   let spy=spyOn(OrderService,"addOrder").and
  //     .returnValue(Promise.resolve(""))
  //   expect(OrderService.addOrder).toEqual(app.addOrder)
  // });


});
