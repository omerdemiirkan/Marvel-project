import {Offer} from "../../pages/models/offer";
import {ProdOfferChars} from "../../pages/models/prodOfferChars";
import {OfferItem} from "../../pages/models/offerItem";

export interface AuthStateModel {
  token: string;
  email: string;
  name: string;
  userType: string;
  offerList:Offer[];

  selectedOfferList:OfferItem[]
}

export interface OfferStateModel {

  offerList:Offer[];
  selectedOfferList:OfferItem[]
}

export interface DeleteStateModel {
  prodOfferId?: number
  name?: string
  description?: string
  status?: string
  prodOfferType?: string
  prodOfferChars?:ProdOfferChars[]
}

