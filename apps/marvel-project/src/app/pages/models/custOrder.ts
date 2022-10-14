import {UserInfo} from "../../auth/models/userInfo";
import {Offer} from "./offer";
import {CharValueList} from "./charValueList";

export interface CustOrder{

  userInfo:UserInfo
  prodOfferLists:Offer[]
  orderCharList:CharValueList
  orderType: string,
  returnCode: string,
  returnMessage:string
  offers:Offer[]
}
