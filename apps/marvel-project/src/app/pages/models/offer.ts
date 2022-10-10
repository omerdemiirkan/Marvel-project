import {ProdOfferChars} from "./prodOfferChars";


export interface Offer{
  prodOfferId?: number
  name?: string
  description?: string
  status?: string
  prodOfferType?: string
  prodOfferChars?:ProdOfferChars[]

}
