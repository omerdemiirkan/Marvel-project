import {Offer} from "../../pages/models/offer";
import {OfferStateModel} from "../models/auth.state";
import {DeleteOffer} from "../../pages/models/removeOffer";


export class Signin {
  static readonly type = '[Auth] Signin';
  constructor(public email: string, public password: string) {}
}


export class Auth {
  static readonly type = '[Auth] Auth';
  constructor(public email: string, public password: string) {}
}

export class RemoveOffer {
  static readonly type = '[Offer] Remove Offer ';
  constructor(public offer:DeleteOffer) {}
}

export class SelectedOfferList {
  static readonly type = '[Offer] SelectedList';
  constructor(public offer?:Offer) {}
}
export class OfferList {
  static readonly type = '[Offer] OfferList';
  constructor(public offer?:Offer) {}
}


export class addOfferToBasket {
  static readonly type = '[Offer] Add Offer To Basket';
  constructor(public offer:Offer) {}
}

export class RemoveOfferBasket {
  static readonly type = '[Offer] Remove Offer Basket';
  constructor(public offer:DeleteOffer) {}
}


export class RemoveBasket {
  static readonly type = '[Offer] Remove Offer Basket';

}
