export interface INetwork {
  id: number;
  name: string;
  iso_code: string;
  fee: number;
  wallet_url: string;
  transaction_url: string;
  wallet_regex: string;
  transaction_regex: string;
}
