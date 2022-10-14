import { Component, OnInit } from '@angular/core';
import {Offer} from "../models/offer";
import {DashboardService} from "../services/dashboard/dashboard.service";
import {addOfferToBasket, OfferList, RemoveBasket, RemoveOfferBasket} from "../../auth/storage/action";
import {switchMap, tap} from "rxjs";
import {AuthState} from "../../auth/storage/state";
import {Store} from "@ngxs/store";
import {OfferItem} from "../models/offerItem";

@Component({
  selector: 'omer-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {


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

  remove(offer:OfferItem){
    this.store.dispatch(new RemoveOfferBasket(offer)).pipe(tap(m=>{
      console.log(m, "seeçtilk baba")
    }))
  }


  // removeBasket(){
  //   this.store.dispatch(new RemoveBasket())
  // }
  //
  // get amount(): number {
  //   let sumAmount!:number;
  //   if (this.selectedOffers === undefined) return sumAmount;
  //   this.selectedOffers.forEach((offer) => {
  //  offer.offer.id
  //   });
  //   console.log(sumAmount)
  //
  //
  //   return sumAmount;
  // }

}
