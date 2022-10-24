import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {UserInfo} from "../../../auth/models/userInfo";
import {Offer} from "../../models/offer";
import {OfferStateModel} from "../../../auth/models/auth.state";
import {OfferItem} from "../../models/offerItem";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private httpClient: HttpClient,
              private router: Router,) { }


  getOfferList():Observable<Offer[]>{

    return this.httpClient.get<Offer[]>("http://localhost:3000/prodOfferList")
  }

  getOfferById(id?:number):Observable<Offer>{

    return this.httpClient.get<Offer>("http://localhost:3000/prodOfferList/"+id)
  }
  addOffer(offer:Offer):Observable<Offer>{

    return this.httpClient.post<Offer>("http://localhost:3000/prodOfferList",offer)
  }
  updateOffer(offer:Offer):Observable<Offer>{
    const newOffer:Offer={
      ...offer
    }
    console.log(offer)
    return this.httpClient.put<Offer>("http://localhost:3000/prodOfferList/"+offer.id,newOffer)
  }


  delete(id: number): Observable<Offer> {
    return this.httpClient.delete<Offer>(`"http://localhost:3000/prodOfferList"/${id}`);
  }
}
