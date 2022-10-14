import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {UserInfo} from "../../../auth/models/userInfo";
import {Offer} from "../../models/offer";
import {OfferStateModel} from "../../../auth/models/auth.state";

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


  delete(id: number): Observable<Offer> {
    return this.httpClient.delete<Offer>(`"http://localhost:3000/prodOfferList"/${id}`);
  }
}
