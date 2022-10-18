import {ProdOfferChars} from "./prodOfferChars";

export interface DeleteOffer{
  id:number
  prodOfferId?: number
  name?: string
  description?: string
  status?: string
  prodOfferType?: string
  prodOfferChars?:ProdOfferChars[]
  amount?:number

}
