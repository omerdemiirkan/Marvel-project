import {Offer} from "../../pages/models/offer";


export class Signin {
  static readonly type = '[Auth] Signin';
  constructor(public email: string, public password: string) {}
}

export class Signout {
  static readonly type = '[Auth] Signout';
}

export class Auth {
  static readonly type = '[Auth] Auth';
  constructor(public email: string, public password: string) {}
}

export class Remove {
  static readonly type = '[Remove] Remove ';
  constructor(public payload?: number) {
    console.log(payload)
  }


}

export class OfferList {
  static readonly type = '[Offer] OfferList';
  constructor(public payload?:Offer) {}
}
