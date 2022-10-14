import { Component, OnInit } from '@angular/core';
import {Offer} from "../models/offer";
import {DashboardService} from "../services/dashboard/dashboard.service";
import {Select, Store} from "@ngxs/store";
import {Observable, switchMap, tap} from "rxjs";
import {AuthState} from "../../auth/storage/state";
import {OfferList, RemoveOffer, RemoveOfferBasket, Signin} from "../../auth/storage/action";
import {OfferItem} from "../models/offerItem";

@Component({
  selector: 'omer-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {


  offerList!:Offer[]


  constructor(private dashboardService:DashboardService,private store: Store) {


  }

  ngOnInit(): void {
    this.getOfferList()
  }

  getOfferList(){

    this.store
      .dispatch(new OfferList() )
      .pipe(switchMap(() => this.store.selectOnce(AuthState.getOfferList)))
      .subscribe((data)=>{
        this.offerList=data.offerList
        console.log(data,"state offerlist")
      })

  }

  // delete(id:number){
  // this.dashboardService.delete(id).subscribe(()=>{
  //   alert("silindi")
  // })
  //
  // }

  remove(offer:Offer){
    this.store.dispatch(new RemoveOffer(offer)).pipe(tap(m=>{
      console.log(m,"mmmm")

    }))
  }
}
