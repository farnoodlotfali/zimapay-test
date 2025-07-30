import { ICrypto } from "./crypto";
import { ICurrency } from "./currency";
import { IFee } from "./fee";
import { INetwork } from "./network";

export interface IRule {
  id: number;
  is_active: number;
  min_amount: number;
  max_amount: number;
  exchange_rate: number;
  exchange_price: number;
  networks: INetwork[];
  crypto: ICrypto;
  currency: ICurrency;
  fees: IFee[];
}
