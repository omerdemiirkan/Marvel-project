import { Component, OnInit } from '@angular/core';
import {DashboardService} from "../services/dashboard.service";
import {Offer} from "../models/offer";
import {OfferList} from "../../auth/storage/action";
import {switchMap} from "rxjs";
import {AuthState} from "../../auth/storage/state";
import {Store} from "@ngxs/store";

@Component({
  selector: 'omer-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {

  offerList!:Offer[]

  constructor(private dashboardService:DashboardService,private store: Store) {}

  ngOnInit(): void {
    this.getOfferList()
  }

  getOfferList(){
    this.store
      .dispatch(new OfferList() )
      .pipe(switchMap(() => this.store.selectOnce(AuthState.getOfferList)))
      .subscribe((data)=>{
        this.offerList =data.offerList
        console.log(data,"state offerlist")
      })
  }

}
