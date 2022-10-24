import {Offer} from "../../pages/models/offer";
import {ProdOfferChars} from "../../pages/models/prodOfferChars";
import {OfferItem} from "../../pages/models/offerItem";
import {User} from "./user";
import {UserInfo} from "./userInfo";

export interface AuthStateModel {
  token: string;
  email: string;
  name: string;
  userType: string;
  offerList:Offer[];
  userInfo:UserInfo[]
  selectedOfferList:OfferItem[]
}

export interface OfferStateModel {

  offerList:Offer[];
  selectedOfferList:OfferItem[]
  selectedUpdateOfferList:OfferItem
}

export interface DeleteStateModel {
  prodOfferId?: number
  name?: string
  description?: string
  status?: string
  prodOfferType?: string
  prodOfferChars?:ProdOfferChars[]
}

