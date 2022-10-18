import {OfferItem} from "./offerItem";

export interface BillingAccount {
  id: number;
  accountNumber: string;
  accountName: string;
  description: string;
  status: string;

  orders: OfferItem[];
}
