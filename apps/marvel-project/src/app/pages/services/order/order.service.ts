import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {CustOrder} from "../../models/custOrder";
import {User} from "../../../auth/models/user";
import {Observable} from "rxjs";
import {Offer} from "../../models/offer";

@Injectable({
  providedIn: 'root'
})
export class OrderService {


  constructor(private httpClient: HttpClient,
              private router: Router,) { }

  //
  // addOrder(
  //   order: Offer,
  //   customer: CustOrder,
  //   billingAccountId: number
  //
  // ): Observable<CustOrder> | null {
  //   const newCustomer: CustOrder = {
  //     ...customer,
  //   };
  //   newCustomer.offers
  //     ?.find((account) => account.id == billingAccountId)
  //     ?. offers?.push({
  //     ...order,
  //     id: Math.floor(10000000 + Math.random() * 90000000),
  //   });
  //
  //   return this.httpClient.put<CustOrder>("http://localhost:3000/CustOrder/"+newCustomer)
  //
  //
  // }


}
