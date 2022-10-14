import { Component, OnInit } from '@angular/core';
import {OfferItem} from "../models/offerItem";
import {DashboardService} from "../services/dashboard/dashboard.service";
import {Store} from "@ngxs/store";
import {AuthState} from "../../auth/storage/state";

@Component({
  selector: 'omer-submit-order',
  templateUrl: './submit-order.component.html',
  styleUrls: ['./submit-order.component.css']
})
export class SubmitOrderComponent implements OnInit {

  selectedOffers!: OfferItem[] ;
  constructor(private dashboardService:DashboardService,private store: Store) {}

  ngOnInit(): void {
    this.getSelectedOfferList()
  }


  getSelectedOfferList(){
    this.store.select(AuthState.getSelectedOfferList).subscribe(data=>{
      console.log(data)
      if(data.selectedOfferList){
        this.selectedOffers=data.selectedOfferList
      }
    })
  }

  // submitOrder() {
  //   this.orderService
  //     .addOrder(this.order, this.customer, this.billingAccountId)
  //     ?.subscribe(() => {
  //       this.router.navigateByUrl('/dashboard/customers/customer-dashboard');
  //     });
  // }
}
