import { Component, OnInit } from '@angular/core';
import {OfferItem} from "../models/offerItem";
import {DashboardService} from "../services/dashboard/dashboard.service";
import {Store} from "@ngxs/store";
import {AuthState} from "../../auth/storage/state";
import {ActivatedRoute, Router} from "@angular/router";
import {OrderService} from "../services/order/order.service";
import {User} from "../../auth/models/user";
import {CustOrder} from "../models/custOrder";
import {AuthService} from "../../auth/services/auth.service";
import {UserInfo} from "../../auth/models/userInfo";
import {MessageService} from "primeng/api";

@Component({
  selector: 'omer-submit-order',
  templateUrl: './submit-order.component.html',
  styleUrls: ['./submit-order.component.css']
})
export class SubmitOrderComponent implements OnInit {

  selectedOffers!: OfferItem[];

  selectedCustomerId!: number;

 user!:CustOrder
  customer!:User

  constructor(private dashboardService: DashboardService, private store: Store, private router: Router,
              private orderService:OrderService,
              private activatedRoute: ActivatedRoute,
              private authService:AuthService,

              private messageService: MessageService,

              ) {
  }

  ngOnInit(): void {
    this.getSelectedOfferList()
    // this.getCustomerById()
  }

  // getCustomerById() {
  //
  //     this.authService
  //       .getCustomerById(1)
  //       .subscribe((data) => {
  //         this.customer = data;
  //         console.log(this.customer,"cutsotmwee")
  //       });
  //
  // }


  getSelectedOfferList() {
    this.store.select(AuthState.getSelectedOfferList).subscribe(data => {
      console.log(data)
      if (data.selectedOfferList) {
        this.selectedOffers = data.selectedOfferList

      }
    })
  }

  submitOrder() {

    const newCustomer: CustOrder = {

      id: Math.floor(10000000 + Math.random() * 90000000),
      userInfo: this.store.selectSnapshot(AuthState.userDetails).userInfo,
      prodOfferLists: this.store.selectSnapshot(AuthState.addOfferToBasket).selectedOfferList,
      orderCharList:{charId:Math.floor(100 + Math.random() * 900),charValId:Math.floor(100 + Math.random() * 900),name:"",shortCode:"",
      value:""},
      orderType: 'order 2',
      returnCode: '200',
      returnMessage: 'get list success',

    };
    this.orderService
      .addOrder(newCustomer)
      ?.subscribe(() => {
        console.log(newCustomer,"yeniiii")
        this.messageService.add({
          key: 'myKey1',
          severity: 'success',
          summary: 'Success',
          detail: 'Order Sent Successfully',
        });
        this.router.navigateByUrl('/dashboard');

      });
  }
}
