import { Component, OnInit } from '@angular/core';
import {Offer} from "../models/offer";
import {DashboardService} from "../services/dashboard.service";
import {Select, Store} from "@ngxs/store";
import {Observable, switchMap} from "rxjs";
import {AuthState} from "../../auth/storage/state";
import {OfferList, Remove, Signin} from "../../auth/storage/action";

@Component({
  selector: 'omer-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {


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

    // this.dashboardService.getOfferList().subscribe(data=>{
    //   this.offerList=data
    //   console.log(this.offerList)
    // })
  }
  // delete(id:number){
  // this.dashboardService.delete(id).subscribe(()=>{
  //   alert("silindi")
  // })
  //
  // }

  delete(prodOfferId?:number):void {
    console.log(typeof prodOfferId)
    console.log(prodOfferId)
    this.store
      .dispatch(new Remove(prodOfferId) )
      .pipe(switchMap(() => this.store.selectOnce(AuthState.offerRemove)))
      .subscribe((data) => {
        console.log(data)

      })}


}
