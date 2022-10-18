import {UserInfo} from "../../auth/models/userInfo";
import {Offer} from "./offer";
import {CharValueList} from "./charValueList";
import {OfferItem} from "./offerItem";
import {User} from "../../auth/models/user";
import {BillingAccount} from "./BillingAccount";
import {OrderCharList} from "./orderCharList";

export interface CustOrder{
  id:number
  userInfo:UserInfo[]
  prodOfferLists:OfferItem[]
  orderCharList:OrderCharList
  orderType: string,
  returnCode: string,
  returnMessage:string,

}
