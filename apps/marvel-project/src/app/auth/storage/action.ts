import { Offer } from '../../pages/models/offer';
import { DeleteOffer } from '../../pages/models/removeOffer';
import {OfferItem} from "../../pages/models/offerItem";

export class Signin {
  static readonly type = '[Auth] Signin';
  constructor(public email: string, public password: string) {}
}

export class Auth {
  static readonly type = '[Auth] Auth';
  constructor(public email: string, public password: string) {}
}



export class OfferList {
  static readonly type = '[Offer] OfferList';
  constructor(public offer?: Offer) {}
}

export class addOfferToBasket {
  static readonly type = '[Offer] Add Offer To Basket';
  constructor(public offer: Offer) {}
}

export class SelectedUpdateOfferList {
  static readonly type = '[Offer] Selected Update Offer List';
  constructor(public offer: Offer) {}
}

export class RemoveOfferBasket {
  static readonly type = '[Offer] Remove Offer Basket';
  constructor(public offer: DeleteOffer) {}
}

export class RemoveOfferList {
  static readonly type = '[Offer] Remove Offer List';
  constructor(public offer: DeleteOffer) {}
}
