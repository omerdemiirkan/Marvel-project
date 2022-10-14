import {Component, Input, OnInit, Output} from '@angular/core';
import {DashboardService} from "../services/dashboard/dashboard.service";
import {Offer} from "../models/offer";
import {addOfferToBasket, OfferList, RemoveOfferBasket, SelectedOfferList} from "../../auth/storage/action";
import {switchMap, tap} from "rxjs";
import {AuthState} from "../../auth/storage/state";
import {Store} from "@ngxs/store";
import {OfferItem} from "../models/offerItem";

@Component({
  selector: 'omer-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {

  offerList!:Offer[]

  selectedOffers: OfferItem[] = [];

  constructor(private dashboardService:DashboardService,private store: Store) {}

  ngOnInit(): void {
    this.getOfferList()
    this.getSelectedOfferList()
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
  getSelectedOfferList(){


    this.store.select(AuthState.getSelectedOfferList).subscribe(data=>{
      console.log(data)
      if(data.selectedOfferList){
        this.selectedOffers=data.selectedOfferList
      }
    })
  }
  addToBasket(offer:Offer){
    this.saveBasket(offer)
  }

  saveBasket(offer:Offer){
    console.log("okeys")
    console.log(this.selectedOffers,"seçili olan")
    this.store
      .dispatch(new addOfferToBasket(offer) )
      .pipe(switchMap(() => this.store.selectOnce(AuthState.addOfferToBasket)))
      .subscribe((data)=>{
        console.log(data,"data saveBasket")
      })
  }



}
