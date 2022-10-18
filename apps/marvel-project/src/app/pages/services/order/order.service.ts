import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CustOrder } from '../../models/custOrder';
import { User } from '../../../auth/models/user';
import {Observable, of} from 'rxjs';
import { Offer } from '../../models/offer';
import { OfferItem } from '../../models/offerItem';
import { UserInfo } from 'os';
import { CharValueList } from '../../models/charValueList';
import {Store} from "@ngxs/store";
import {AuthState} from "../../../auth/storage/state";

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private httpClient: HttpClient, private router: Router,
              private  store:Store) {}

  addOrder(

    customer: CustOrder,

  ): Observable<CustOrder> | null {

    return this.httpClient.post<CustOrder>(
      'http://localhost:3000/custOrder',
      customer
    );
  }
}

// id:number  returnCode:"200",returnMessage:"success",orderType:"order 2",id:2,prodOfferLists:[...offer],userInfo:user
// userInfo:UserInfo
// prodOfferLists:OfferItem[]
// orderCharList:CharValueList
// orderType: string,
//   returnCode: string,
//   returnMessage:string,
//
