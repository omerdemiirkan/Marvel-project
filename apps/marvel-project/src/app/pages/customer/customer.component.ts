import {Component, Input, OnInit, Output} from '@angular/core';
import {DashboardService} from "../services/dashboard/dashboard.service";
import {Offer} from "../models/offer";
import {addOfferToBasket, OfferList, RemoveOfferBasket, SelectedOfferList} from "../../auth/storage/action";
import {switchMap, tap} from "rxjs";
import {AuthState} from "../../auth/storage/state";
import {Store} from "@ngxs/store";
import {OfferItem} from "../models/offerItem";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../auth/services/auth.service";
import {UserInfo} from "../../auth/models/userInfo";

@Component({
  selector: 'omer-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {

  offerList!:Offer[]

  selectedCustomerId!:number
  selectedOffers: OfferItem[] = [];
  customer!:UserInfo


  constructor(private dashboardService:DashboardService,private store: Store,   private activatedRoute: ActivatedRoute,
              private authService:AuthService) {}

  ngOnInit(): void {
    this.getOfferList()
    this.getSelectedOfferList()
    this.getCustomerById()
  }

  getCustomerById() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) this.selectedCustomerId = params['id'];
    });
    if (this.selectedCustomerId == undefined) {
      //toast
    } else {
      this.authService
        .getCustomerById(this.selectedCustomerId)
        .subscribe((data) => {
          this.customer = data;
          console.log(this.customer,"cutsotmwee")
        });
    }
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
