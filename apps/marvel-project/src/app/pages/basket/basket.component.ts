import { Component, OnInit } from '@angular/core';
import {Offer} from "../models/offer";
import {DashboardService} from "../services/dashboard.service";

@Component({
  selector: 'omer-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  offerList!:Offer[]

  constructor(private dashboardService:DashboardService) {}

  ngOnInit(): void {
    this.getOfferList()
  }
  getOfferList(){
    this.dashboardService.getOfferList().subscribe(data=>{
      this.offerList=data
      console.log(this.offerList)
    })
  }

}
