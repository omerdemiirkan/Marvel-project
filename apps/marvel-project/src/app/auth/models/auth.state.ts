import {Offer} from "../../pages/models/offer";
import {ProdOfferChars} from "../../pages/models/prodOfferChars";

export interface AuthStateModel {
  token?: string;
  email?: string;
  name?: string;
  userType?: string;
  offerList:any;
}

export interface OfferStateModel {
  token?: string;
  email?: string;
  name?: string;
  userType?: string;
  offerList:Offer[];
}

export interface DeleteStateModel {
  prodOfferId?: number
  name?: string
  description?: string
  status?: string
  prodOfferType?: string
  prodOfferChars?:ProdOfferChars[]
}

