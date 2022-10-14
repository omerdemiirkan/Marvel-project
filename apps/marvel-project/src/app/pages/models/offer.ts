import {ProdOfferChars} from "./prodOfferChars";


export interface Offer{
  id?:number
  prodOfferId?: number
  name?: string
  description?: string
  status?: string
  prodOfferType?: string
  prodOfferChars?:ProdOfferChars[]


}
